import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getRumors, toggleLike, getLikes, hasUserLiked, addComment, getComments } from '../lib/api';
import { ShieldCheck, ShieldAlert, Search, ExternalLink, Heart, MessageSquare, Send, Share2, Calendar, ChevronRight } from 'lucide-react';
import type { Rumor, Comment } from '../lib/types';
import { useAuth } from '../context/AuthContext';

const RumorCard = ({ rumor, onCardClick }: { rumor: Rumor; onCardClick: (rumor: Rumor) => void }) => {
    const { user } = useAuth();

    // Like/Comment states
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState('');
    const [showComments, setShowComments] = useState(false);

    useEffect(() => {
        loadInteractions();
    }, []);

    const loadInteractions = async () => {
        const likeCount = await getLikes('rumor', rumor.id);
        setLikes(likeCount);

        let userId = user?.id;
        if (!userId) {
            let deviceId = localStorage.getItem('device_id');
            if (!deviceId) {
                deviceId = 'anon_' + Math.random().toString(36).substr(2, 9);
                localStorage.setItem('device_id', deviceId);
            }
            userId = deviceId;
        }

        const liked = await hasUserLiked('rumor', rumor.id, userId);
        setIsLiked(liked);

        const commentsData = await getComments('rumor', rumor.id);
        setComments(commentsData);
    };

    const handleLike = async () => {
        let userId = user?.id;
        if (!userId) {
            userId = localStorage.getItem('device_id') || '';
        }

        const result = await toggleLike('rumor', rumor.id, userId);
        if (result.success) {
            setIsLiked(result.liked ?? false);
            setLikes(prev => result.liked ? prev + 1 : prev - 1);
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        let userId = user?.id;
        let userName = user?.name || 'Anonymous';
        if (!userId) {
            userId = localStorage.getItem('device_id') || '';
            userName = 'Anonymous';
        }

        const result = await addComment('rumor', rumor.id, userId, userName, newComment);
        if (result.success) {
            setNewComment('');
            const updatedComments = await getComments('rumor', rumor.id);
            setComments(updatedComments);
        }
    };

    const copyShareLink = () => {
        const url = `${window.location.origin}/rumor-check?id=${rumor.id}`;
        navigator.clipboard.writeText(url);
        alert('লিংক কপি হয়েছে!');
    };

    return (
        <div
            onClick={() => onCardClick(rumor)}
            className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1"
        >
            {/* Status Header */}
            <div className={`px-4 py-3 flex items-center justify-between ${rumor.status === 'verified' ? 'bg-green-50' : 'bg-red-50'
                }`}>
                <div className="flex items-center gap-2">
                    {rumor.status === 'verified' ? (
                        <>
                            <ShieldCheck className="w-5 h-5 text-green-600" />
                            <span className="font-bold text-sm text-green-700 uppercase">Verified</span>
                        </>
                    ) : (
                        <>
                            <ShieldAlert className="w-5 h-5 text-red-600" />
                            <span className="font-bold text-sm text-red-700 uppercase">Fake</span>
                        </>
                    )}
                </div>
                <span className="px-2 py-0.5 bg-white/50 text-gray-600 text-xs font-mono rounded">#{rumor.id}</span>
            </div>

            {/* Image with Share Button */}
            <div className="relative">
                {rumor.image_url && (
                    <div className="aspect-[16/9] bg-gray-100 overflow-hidden">
                        <img
                            src={rumor.image_url}
                            alt={rumor.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}
                {/* Share Button - Always visible */}
                <button
                    onClick={(e) => { e.stopPropagation(); copyShareLink(); }}
                    className={`${rumor.image_url ? 'absolute top-3 right-3' : 'absolute top-[-44px] right-3'} bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors z-10`}
                    title="শেয়ার করুন"
                >
                    <Share2 className="w-4 h-4 text-gray-700" />
                </button>
            </div>

            {/* Content */}
            <div className="p-4">
                <h2 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {rumor.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                    {rumor.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        {/* Like Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); handleLike(); }}
                            className={`flex items-center gap-1 text-sm ${isLiked ? 'text-pink-500' : 'text-gray-500 hover:text-pink-500'}`}
                        >
                            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                            <span>{likes}</span>
                        </button>
                        {/* Comment Count */}
                        <button
                            onClick={(e) => { e.stopPropagation(); setShowComments(!showComments); }}
                            className="flex items-center gap-1 text-sm text-gray-500 hover:text-blue-500"
                        >
                            <MessageSquare className="w-4 h-4" />
                            <span>{comments.length}</span>
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        {/* Source Link */}
                        {rumor.source && (
                            <a
                                href={rumor.source.startsWith('http') ? rumor.source : `https://${rumor.source}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                                title="সোর্স দেখুন"
                            >
                                <ExternalLink className="w-4 h-4 text-gray-500" />
                            </a>
                        )}
                        {/* Share Button */}
                        <button
                            onClick={(e) => { e.stopPropagation(); copyShareLink(); }}
                            className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                            title="শেয়ার করুন"
                        >
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Comment Section (Expandable) */}
            {showComments && (
                <div className="px-4 pb-4 border-t border-gray-100">
                    <div className="pt-4 space-y-3 max-h-48 overflow-y-auto">
                        {/* Comment Input */}
                        <form onSubmit={handleCommentSubmit} className="flex gap-2">
                            <input
                                type="text"
                                value={newComment}
                                onChange={e => setNewComment(e.target.value)}
                                placeholder="মন্তব্য করুন..."
                                className="flex-1 p-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                            />
                            <button
                                type="submit"
                                className="px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>
                        {/* Comments List */}
                        {comments.slice(0, 3).map((comment) => (
                            <div key={comment.id} className="flex gap-2 text-sm">
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-gray-600 text-xs font-bold">{comment.user_name.charAt(0)}</span>
                                </div>
                                <div>
                                    <span className="font-medium text-gray-900">{comment.user_name}</span>
                                    <span className="text-gray-600 ml-1">{comment.comment}</span>
                                </div>
                            </div>
                        ))}
                        {comments.length > 3 && (
                            <p className="text-xs text-gray-500 text-center">+{comments.length - 3} আরো মন্তব্য</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function RumorCheck() {
    const [rumors, setRumors] = useState<Rumor[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [selectedRumor, setSelectedRumor] = useState<Rumor | null>(null);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Debounce search to avoid too many DB calls
        const timer = setTimeout(() => {
            loadRumors();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, sortOrder]);

    const loadRumors = async () => {
        setLoading(true);
        const data = await getRumors(searchTerm);

        let filteredData = [...data];

        // Sort
        if (sortOrder === 'oldest') {
            filteredData.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        } else {
            filteredData.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        }

        setRumors(filteredData);
        setLoading(false);

        // Check if URL has ?id= parameter to auto-open that rumor
        const idParam = searchParams.get('id');
        if (idParam) {
            const rumorId = parseInt(idParam);
            const targetRumor = filteredData.find(r => r.id === rumorId);
            if (targetRumor) {
                setSelectedRumor(targetRumor);
            }
        }
    };

    const handleCloseModal = () => {
        setSelectedRumor(null);
        if (searchParams.has('id')) {
            setSearchParams({});
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-4 pb-12 px-4">
            <div className="max-w-[1400px] mx-auto">
                {/* Header - Compact */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-orange-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">গুজব যাচাই</h1>
                    </div>
                    {/* Search and Sort */}
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="অনুসন্ধান..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent w-48"
                            />
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        </div>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white text-sm font-medium focus:ring-2 focus:ring-orange-500 focus:border-transparent cursor-pointer"
                        >
                            <option value="newest">সর্বশেষ</option>
                            <option value="oldest">পুরাতন</option>
                        </select>
                    </div>
                </div>

                {/* Rumors Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin w-8 h-8 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-500">গুজব লোড হচ্ছে...</p>
                    </div>
                ) : rumors.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm text-gray-500">
                        কোনো গুজব পাওয়া যায়নি।
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {rumors.map((rumor) => (
                            <RumorCard key={rumor.id} rumor={rumor} onCardClick={setSelectedRumor} />
                        ))}
                    </div>
                )}
            </div>

            {/* Detail Modal */}
            {selectedRumor && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleCloseModal}
                    />
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-20">
                            <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${selectedRumor.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                {selectedRumor.status === 'verified' ? (
                                    <ShieldCheck className="w-4 h-4" />
                                ) : (
                                    <ShieldAlert className="w-4 h-4" />
                                )}
                                <span className="font-bold text-sm uppercase">{selectedRumor.status === 'verified' ? 'Verified' : 'Fake'}</span>
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
                            {selectedRumor.image_url && (
                                <div className="mb-6 rounded-xl overflow-hidden border border-gray-200">
                                    <img
                                        src={selectedRumor.image_url}
                                        alt={selectedRumor.title}
                                        className="w-full h-auto max-h-[400px] object-contain bg-gray-50"
                                    />
                                </div>
                            )}

                            <h1 className="text-2xl font-bold text-gray-900 mb-4">{selectedRumor.title}</h1>

                            <div className="flex items-center gap-4 mb-6 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(selectedRumor.published_at).toLocaleDateString('bn-BD')}</span>
                                </div>
                                <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-mono rounded">#{selectedRumor.id}</span>
                            </div>

                            <div className="prose prose-gray max-w-none mb-6">
                                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedRumor.description}</p>
                            </div>

                            {selectedRumor.source && (
                                <a
                                    href={selectedRumor.source.startsWith('http') ? selectedRumor.source : `https://${selectedRumor.source}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline bg-blue-50 px-4 py-2 rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-4 h-4" />
                                    সোর্স / ফ্যাক্ট চেক দেখুন
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

