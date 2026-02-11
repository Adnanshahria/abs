import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getUpdates, incrementViewCount, toggleLike, getLikes, hasUserLiked, addComment, getComments } from '../lib/api';
import { Calendar, Bell, Eye, Clock, User, ChevronRight, Heart, MessageSquare, Send, Link, ArrowUpDown, Share2 } from 'lucide-react';
import type { ElectionUpdate, Comment } from '../lib/types';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function ElectionUpdates() {
    const { language } = useLanguage();
    const t = translations[language].electionUpdates;
    const [updates, setUpdates] = useState<ElectionUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedUpdate, setSelectedUpdate] = useState<ElectionUpdate | null>(null);
    const { user } = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    // Interaction states
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [loadingComments, setLoadingComments] = useState(false);
    const [likeCountsMap, setLikeCountsMap] = useState<Record<number, number>>({});
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    useEffect(() => {
        const loadUpdates = async () => {
            const data = await getUpdates();
            setUpdates(data);
            setLoading(false);

            // Load like counts for all updates
            const likeCounts: Record<number, number> = {};
            await Promise.all(data.map(async (update) => {
                likeCounts[update.id] = await getLikes('update', update.id);
            }));
            setLikeCountsMap(likeCounts);

            // Check if URL has ?id= parameter to auto-open that update
            const idParam = searchParams.get('id');
            if (idParam) {
                const updateId = parseInt(idParam);
                const targetUpdate = data.find(u => u.id === updateId);
                if (targetUpdate) {
                    // Increment view count and open modal
                    await incrementViewCount(targetUpdate.id);
                    setSelectedUpdate(targetUpdate);
                }
            }
        };
        loadUpdates();
    }, []);

    // Load interactions when modal opens
    useEffect(() => {
        if (selectedUpdate) {
            loadInteractions(selectedUpdate.id);
        }
    }, [selectedUpdate]);

    const loadInteractions = async (id: number) => {
        // Likes
        const likeCount = await getLikes('update', id);
        setLikes(likeCount);

        // Check user like status
        let userId = user?.id; // Logged in user ID
        if (!userId) {
            // Use/Create device ID for unlogged users
            let deviceId = localStorage.getItem('device_id');
            if (!deviceId) {
                deviceId = 'anon_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('device_id', deviceId);
            }
            userId = deviceId;
        }

        const liked = await hasUserLiked('update', id, userId);
        setIsLiked(liked);

        // Comments
        setLoadingComments(true);
        const commentsData = await getComments('update', id);
        setComments(commentsData);
        setLoadingComments(false);
    };

    const handleCardClick = async (update: ElectionUpdate) => {
        await incrementViewCount(update.id);
        // Update view count in local state to reflect immediately
        setUpdates(prev => prev.map(u => u.id === update.id ? { ...u, view_count: (u.view_count || 0) + 1 } : u));
        setSelectedUpdate({ ...update, view_count: (update.view_count || 0) + 1 });
    };

    const handleLike = async () => {
        if (!selectedUpdate) return;

        let userId = user?.id;
        if (!userId) {
            userId = localStorage.getItem('device_id') || '';
        }

        const result = await toggleLike('update', selectedUpdate.id, userId);
        if (result.success) {
            setIsLiked(result.liked ?? false);
            setLikes(prev => result.liked ? prev + 1 : prev - 1);
            // Update grid like counts map
            setLikeCountsMap(prev => ({
                ...prev,
                [selectedUpdate.id]: result.liked
                    ? (prev[selectedUpdate.id] || 0) + 1
                    : Math.max((prev[selectedUpdate.id] || 0) - 1, 0)
            }));
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedUpdate || !newComment.trim()) return;

        // Allow anonymous users with device ID
        let userId = user?.id;
        let userName = user?.name || 'Anonymous';
        if (!userId) {
            userId = localStorage.getItem('device_id') || '';
            userName = 'Anonymous';
        }

        const result = await addComment('update', selectedUpdate.id, userId, userName, newComment);
        if (result.success) {
            setNewComment('');
            const updatedComments = await getComments('update', selectedUpdate.id);
            setComments(updatedComments);
        }
    };

    const copyShareLink = (updateId: number) => {
        const url = `${window.location.origin}/election-updates?id=${updateId}`;
        navigator.clipboard.writeText(url);
        alert(t.linkCopied);
    };

    const handleCloseModal = () => {
        setSelectedUpdate(null);
        // Clear URL param when closing modal
        if (searchParams.has('id')) {
            setSearchParams({});
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const tagColors = [
        'bg-blue-100 text-blue-700',
        'bg-purple-100 text-purple-700',
        'bg-green-100 text-green-700',
        'bg-orange-100 text-orange-700',
        'bg-pink-100 text-pink-700',
        'bg-teal-100 text-teal-700',
    ];

    // Apply sorting
    const sortedUpdates = [...updates].sort((a, b) => {
        const dateA = new Date(a.published_at).getTime();
        const dateB = new Date(b.published_at).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return (
        <div className="min-h-screen bg-gray-50 pt-4 pb-12 px-4">
            <div className="max-w-[1400px] mx-auto">
                {/* Header - Compact */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <Bell className="w-5 h-5 text-blue-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">{t.title}</h1>
                    </div>
                    {/* Sort Control */}
                    <div className="flex items-center gap-2">
                        <ArrowUpDown className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{t.sort.label}:</span>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                        >
                            <option value="newest">{t.sort.newest}</option>
                            <option value="oldest">{t.sort.oldest}</option>
                        </select>
                    </div>
                </div>

                {/* Updates Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-500">{t.loading}</p>
                    </div>
                ) : sortedUpdates.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm text-gray-500">
                        {t.empty}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {sortedUpdates.map((update) => (
                            <div
                                key={update.id}
                                onClick={() => handleCardClick(update)}
                                className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
                            >
                                {/* Image Section */}
                                <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                                    {update.image_url ? (
                                        <img
                                            src={update.image_url}
                                            alt={update.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Bell className="w-16 h-16 text-gray-300" />
                                        </div>
                                    )}

                                    {/* View Count Badge */}
                                    <div className="absolute top-3 right-3 flex items-center gap-2">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                const url = `${window.location.origin}/election-updates?id=${update.id}`;
                                                navigator.clipboard.writeText(url);
                                                alert(t.linkCopied);
                                            }}
                                            className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors"
                                            title={t.share}
                                        >
                                            <Share2 className="w-4 h-4 text-gray-700" />
                                        </button>
                                        <div className="bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full flex items-center gap-1 text-sm text-gray-700 shadow-sm">
                                            <Eye className="w-4 h-4" />
                                            <span>{update.view_count || 0}</span>
                                        </div>
                                    </div>

                                    {/* Decorative Wave Border */}
                                    <div className="absolute bottom-0 left-0 right-0">
                                        <svg viewBox="0 0 400 20" className="w-full h-5 fill-white" preserveAspectRatio="none">
                                            <path d="M0,10 Q25,0 50,10 T100,10 T150,10 T200,10 T250,10 T300,10 T350,10 T400,10 L400,20 L0,20 Z" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-5">
                                    {/* Tags */}
                                    {update.tags && update.tags.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {update.tags.slice(0, 3).map((tag, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${tagColors[idx % tagColors.length]}`}
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {update.tags.length > 3 && (
                                                <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                                                    +{update.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    )}

                                    {/* Title */}
                                    <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                        {update.title}
                                    </h2>

                                    {/* Content Preview */}
                                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                        {update.content}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            {/* ID Badge */}
                                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-mono rounded">
                                                #{update.id}
                                            </span>
                                            <div className="flex items-center gap-1 text-gray-500 text-xs">
                                                <Calendar className="w-3 h-3" />
                                                <span>{formatDate(update.published_at)}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* Like Count */}
                                            <div className="flex items-center gap-1 text-xs text-pink-500">
                                                <Heart className="w-3.5 h-3.5" />
                                                <span>{likeCountsMap[update.id] || 0}</span>
                                            </div>
                                            {/* Read Time */}
                                            <div className="flex items-center gap-1 text-xs text-gray-500">
                                                <Clock className="w-3.5 h-3.5" />
                                                <span>{update.read_time || 2} {t.readMin}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedUpdate && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    />
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-20">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="w-4 h-4" />
                                {formatDate(selectedUpdate.published_at)}
                            </div>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 text-gray-500 rotate-45" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6">
                            {/* Tags */}
                            {selectedUpdate.tags && selectedUpdate.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {selectedUpdate.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${tagColors[idx % tagColors.length]}`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex items-start justify-between gap-3 mb-4">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                                    {selectedUpdate.title}
                                </h1>
                                <button
                                    onClick={() => copyShareLink(selectedUpdate.id)}
                                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                                    title={t.share}
                                >
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                </button>
                            </div>

                            {/* Author Info */}
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-white" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-medium text-gray-900">{selectedUpdate.author_name || 'Admin'}</p>
                                    <div className="flex items-center gap-3 text-sm text-gray-500">
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-4 h-4" />
                                            {selectedUpdate.read_time || 2} {t.readMin}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-4 h-4" />
                                            {(selectedUpdate.view_count || 0)} {t.views}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Image */}
                            {selectedUpdate.image_url && (
                                <div className="mb-6 rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                                    <img
                                        src={selectedUpdate.image_url}
                                        alt={selectedUpdate.title}
                                        className="w-full h-auto max-h-[500px] object-contain"
                                    />
                                </div>
                            )}

                            {/* Content */}
                            <div className="prose prose-blue max-w-none text-gray-700 mb-6">
                                <p className="whitespace-pre-wrap leading-relaxed text-lg">
                                    {selectedUpdate.content}
                                </p>
                            </div>

                            {/* Source Link - Prominent Position */}
                            {selectedUpdate.source_url && (
                                <div className="mb-8">
                                    <a
                                        href={selectedUpdate.source_url.startsWith('http') ? selectedUpdate.source_url : `https://${selectedUpdate.source_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-50 text-green-700 hover:bg-green-100 border border-green-200 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        <Link className="w-4 h-4" />
                                        {t.source}
                                    </a>
                                </div>
                            )}

                            {/* Actions & Comments */}
                            <div className="border-t border-gray-100 pt-6">
                                {/* Like Logic */}
                                <div className="flex items-center gap-6 mb-8">
                                    <button
                                        onClick={handleLike}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${isLiked
                                            ? 'bg-pink-50 text-pink-600 border border-pink-200'
                                            : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                                            }`}
                                    >
                                        <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                                        <span className="font-semibold">{likes}</span>
                                    </button>
                                </div>

                                {/* Comments Section */}
                                <div className="space-y-6">
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5" />
                                        {t.comments.title} ({comments.length})
                                    </h3>

                                    {/* Comment Input - Available for everyone */}
                                    <form onSubmit={handleCommentSubmit} className="flex gap-3">
                                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                                            <span className="text-purple-700 font-bold">{user?.name?.charAt(0) || 'A'}</span>
                                        </div>
                                        <div className="flex-1 relative">
                                            <textarea
                                                value={newComment}
                                                onChange={e => setNewComment(e.target.value)}
                                                placeholder={t.comments.placeholder}
                                                className="w-full p-3 pr-12 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-20"
                                            />
                                            <button
                                                type="submit"
                                                disabled={!newComment.trim()}
                                                className="absolute bottom-3 right-3 p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                            >
                                                <Send className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </form>

                                    {/* Comment List */}
                                    <div className="space-y-4">
                                        {loadingComments ? (
                                            <p className="text-center text-gray-500 text-sm">{t.comments.loading}</p>
                                        ) : comments.length > 0 ? (
                                            comments.map(comment => (
                                                <div key={comment.id} className="flex gap-3">
                                                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                                        <span className="text-gray-600 text-xs font-bold">{comment.user_name.charAt(0)}</span>
                                                    </div>
                                                    <div className="bg-gray-50 rounded-2xl rounded-tl-none p-3 border border-gray-100 flex-1">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="font-semibold text-sm text-gray-900">{comment.user_name}</span>
                                                            <span className="text-xs text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                                                        </div>
                                                        <p className="text-gray-700 text-sm">{comment.comment}</p>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500 text-sm italic">{t.comments.empty}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
