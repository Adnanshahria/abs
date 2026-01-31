import { useState, useEffect } from 'react';
import { getUpdates, addUpdate, deleteUpdate, updateUpdate } from '../lib/api';
import { Plus, Trash2, Calendar, Save, X, Eye, Clock, Tag, User, Pencil, Link } from 'lucide-react';
import type { ElectionUpdate } from '../lib/types';

export default function AdminUpdates() {
    const [updates, setUpdates] = useState<ElectionUpdate[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        image_url: '',
        author_name: '',
        tags: '',
        read_time: 2,
        source_url: ''
    });
    const [editId, setEditId] = useState<number | null>(null);

    useEffect(() => {
        fetchUpdates();
    }, []);

    const fetchUpdates = async () => {
        setLoading(true);
        const data = await getUpdates();
        setUpdates(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Delete this update?')) {
            await deleteUpdate(id);
            fetchUpdates();
        }
    };

    const handleEdit = (update: ElectionUpdate) => {
        setEditId(update.id);
        setFormData({
            title: update.title,
            content: update.content,
            image_url: update.image_url || '',
            author_name: update.author_name || '',
            tags: update.tags ? update.tags.join(', ') : '',
            read_time: update.read_time || 2,
            source_url: update.source_url || ''
        });
        setIsAddModalOpen(true);
    };

    const closeModal = () => {
        setIsAddModalOpen(false);
        setEditId(null);
        setFormData({ title: '', content: '', image_url: '', author_name: '', tags: '', read_time: 2, source_url: '' });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const updateData = {
            title: formData.title,
            content: formData.content,
            image_url: formData.image_url || undefined,
            author_name: formData.author_name || 'Admin',
            tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
            read_time: formData.read_time || 2,
            source_url: formData.source_url || undefined
        };

        const result = editId
            ? await updateUpdate(editId, updateData)
            : await addUpdate(updateData);

        if (result.success) {
            closeModal();
            fetchUpdates();
        } else {
            alert(editId ? 'Failed to update' : 'Failed to add update');
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString('bn-BD', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return 'Date N/A';
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">নির্বাচনী আপডেট</h1>
                    <p className="text-gray-600">সংবাদ ও ঘোষণা পোস্ট করুন</p>
                </div>
                <button
                    onClick={() => setIsAddModalOpen(true)}
                    className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors font-medium shadow-sm"
                >
                    <Plus className="w-5 h-5" />
                    আপডেট পোস্ট করুন
                </button>
            </div>

            {/* Updates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full p-8 text-center text-gray-500">
                        আপডেট লোড হচ্ছে...
                    </div>
                ) : updates.length === 0 ? (
                    <div className="col-span-full p-8 text-center text-gray-500 bg-white rounded-2xl border border-gray-100">
                        কোনো আপডেট পোস্ট করা হয়নি।
                    </div>
                ) : (
                    updates.map((update) => (
                        <div key={update.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-shadow">
                            {/* Image Preview */}
                            {update.image_url && (
                                <div className="aspect-video bg-gray-100 overflow-hidden">
                                    <img src={update.image_url} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            )}

                            <div className="p-5">
                                {/* Tags */}
                                {update.tags && update.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mb-3">
                                        {update.tags.slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{update.title}</h3>

                                {/* Content Preview */}
                                <p className="text-gray-600 text-sm line-clamp-2 mb-4">{update.content}</p>

                                {/* Meta Info */}
                                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <User className="w-3.5 h-3.5" />
                                            {update.author_name || 'Admin'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Calendar className="w-3.5 h-3.5" />
                                            {formatDate(update.published_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1">
                                            <Eye className="w-3.5 h-3.5" />
                                            {update.view_count || 0}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {update.read_time || 2}m
                                        </span>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                                    <button
                                        onClick={() => handleEdit(update)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors text-sm"
                                    >
                                        <Pencil className="w-4 h-4" />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(update.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors text-sm"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={closeModal} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl relative z-10 animate-in zoom-in-95 duration-200 p-6 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editId ? 'আপডেট পরিবর্তন করুন' : 'নতুন আপডেট পোস্ট করুন'}
                            </h2>
                            <button onClick={closeModal}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">শিরোনাম *</label>
                                <input
                                    required
                                    placeholder="আপডেটের শিরোনাম লিখুন"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                />
                            </div>

                            {/* Author Name */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                                    <User className="w-4 h-4" />
                                    লেখকের নাম
                                </label>
                                <input
                                    placeholder="যেমন: জনাব আহমেদ সাহেব"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={formData.author_name}
                                    onChange={e => setFormData({ ...formData, author_name: e.target.value })}
                                />
                            </div>

                            {/* Tags */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                                    <Tag className="w-4 h-4" />
                                    ট্যাগ (কমা দিয়ে আলাদা করুন)
                                </label>
                                <input
                                    placeholder="যেমন: নির্বাচন, পোস্টালভোট, ঘোষণা"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={formData.tags}
                                    onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                />
                                {formData.tags && (
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {formData.tags.split(',').map((tag, idx) => tag.trim() && (
                                            <span key={idx} className="px-2.5 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium">
                                                {tag.trim()}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Read Time */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                                    <Clock className="w-4 h-4" />
                                    পড়ার সময় (মিনিট)
                                </label>
                                <input
                                    type="number"
                                    min="1"
                                    max="60"
                                    placeholder="2"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={formData.read_time}
                                    onChange={e => setFormData({ ...formData, read_time: parseInt(e.target.value) || 2 })}
                                />
                            </div>

                            {/* Source URL */}
                            <div>
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                                    <Link className="w-4 h-4" />
                                    সোর্স লিংক (Source URL)
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/source"
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    value={formData.source_url}
                                    onChange={e => setFormData({ ...formData, source_url: e.target.value })}
                                />
                            </div>

                            {/* Image Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">ছবি সংযুক্ত করুন</label>
                                <div className="space-y-3">
                                    {/* Paste Zone */}
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-50/50 transition-all"
                                        onPaste={(e) => {
                                            const items = e.clipboardData?.items;
                                            if (items) {
                                                for (const item of items) {
                                                    if (item.type.startsWith('image/')) {
                                                        const file = item.getAsFile();
                                                        if (file) {
                                                            if (file.size > 5000000) {
                                                                alert("ফাইল সাইজ বড়। সর্বোচ্চ ৫MB।");
                                                                return;
                                                            }
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                setFormData({ ...formData, image_url: reader.result as string });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                        tabIndex={0}
                                    >
                                        <p className="text-sm text-gray-500">📋 Ctrl+V দিয়ে ছবি পেস্ট করুন</p>
                                        <p className="text-xs text-gray-400 mt-1">অথবা নিচে ফাইল সিলেক্ট করুন</p>
                                    </div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                if (file.size > 5000000) {
                                                    alert("ফাইল সাইজ বড়। সর্বোচ্চ ৫MB।");
                                                    return;
                                                }
                                                const reader = new FileReader();
                                                reader.onloadend = () => {
                                                    setFormData({ ...formData, image_url: reader.result as string });
                                                };
                                                reader.readAsDataURL(file);
                                            }
                                        }}
                                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 transition-all border border-gray-200 rounded-xl p-1.5"
                                    />
                                    {formData.image_url && (
                                        <div className="relative w-full h-48 bg-gray-100 rounded-xl overflow-hidden border border-gray-200 group">
                                            <img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, image_url: '' })}
                                                className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1.5">বিস্তারিত *</label>
                                <textarea
                                    required
                                    rows={5}
                                    placeholder="আপডেটের বিস্তারিত লিখুন..."
                                    className="w-full p-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                    value={formData.content}
                                    onChange={e => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="flex justify-end pt-4 border-t border-gray-100">
                                <button
                                    type="submit"
                                    className="bg-purple-600 text-white px-6 py-2.5 rounded-xl hover:bg-purple-700 font-medium flex items-center gap-2 transition-colors"
                                >
                                    <Save className="w-4 h-4" />
                                    {editId ? 'পরিবর্তনগুলো সেভ করুন' : 'পোস্ট করুন'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
