import { useState, useEffect } from 'react';
import { getRumors, addRumor, updateRumor, deleteRumor } from '../lib/api';
import { Plus, Trash2, ShieldCheck, ShieldAlert, Save, X, ExternalLink, Pencil, Search, ArrowUpDown, Image, Upload } from 'lucide-react';
import type { Rumor } from '../lib/types';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function AdminRumors() {
    const { language } = useLanguage();
    const t = translations[language].admin.rumors;
    const common = translations[language].common;

    const [rumors, setRumors] = useState<Rumor[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [expandedRumors, setExpandedRumors] = useState<Set<number>>(new Set());

    const toggleExpand = (id: number) => {
        const newExpanded = new Set(expandedRumors);
        if (newExpanded.has(id)) {
            newExpanded.delete(id);
        } else {
            newExpanded.add(id);
        }
        setExpandedRumors(newExpanded);
    };

    const [formData, setFormData] = useState<Omit<Rumor, 'id' | 'published_at'>>({
        title: '', description: '', status: 'debunked', source: '', image_url: ''
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchRumors();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchRumors = async () => {
        setLoading(true);
        // The API supports basic search. Sorting will be done locally for now as API handles "time DESC" by default.
        const data = await getRumors(searchTerm);

        let sortedData = [...data];
        if (sortOrder === 'oldest') {
            sortedData.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
        } else {
            sortedData.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
        }

        setRumors(sortedData);
        setLoading(false);
    };

    // Re-sort when sortOrder changes without re-fetching if data exists
    useEffect(() => {
        if (rumors.length > 0) {
            const sortedData = [...rumors];
            if (sortOrder === 'oldest') {
                sortedData.sort((a, b) => new Date(a.published_at).getTime() - new Date(b.published_at).getTime());
            } else {
                sortedData.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
            }
            setRumors(sortedData);
        }
    }, [sortOrder]);

    const handleDelete = async (id: number) => {
        if (confirm(t.alerts.deleteConfirm)) {
            await deleteRumor(id);
            fetchRumors();
        }
    };

    const handleEdit = (rumor: Rumor) => {
        setFormData({
            title: rumor.title,
            description: rumor.description,
            status: rumor.status,
            source: rumor.source,
            image_url: rumor.image_url
        });
        setEditingId(rumor.id);
        setIsAddModalOpen(true);
    };

    const handleOpenAdd = () => {
        setFormData({ title: '', description: '', status: 'debunked', source: '', image_url: '' });
        setEditingId(null);
        setIsAddModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        let result;

        if (editingId) {
            result = await updateRumor(editingId, formData);
        } else {
            result = await addRumor(formData);
        }

        if (result.success) {
            setIsAddModalOpen(false);
            setFormData({ title: '', description: '', status: 'debunked', source: '', image_url: '' });
            setEditingId(null);
            fetchRumors();
        } else {
            alert(t.alerts.fail);
        }
    };

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 mb-6">
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.title}</h1>
                        <p className="text-gray-600 text-sm">{t.subtitle}</p>
                    </div>
                    {/* Button + Filters - all in one row */}
                    <div className="flex items-center gap-1.5 flex-nowrap">
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-[100px] p-1.5 rounded-lg border border-gray-200 bg-white text-xs"
                        />
                        <div className="relative">
                            <ArrowUpDown className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 w-3 h-3" />
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                                className="pl-6 pr-2 py-1.5 rounded-lg border border-gray-200 bg-white text-xs appearance-none cursor-pointer"
                            >
                                <option value="newest">{t.filter.newest}</option>
                                <option value="oldest">{t.filter.oldest}</option>
                            </select>
                        </div>
                        <button
                            onClick={handleOpenAdd}
                            className="flex items-center gap-1 bg-purple-600 text-white px-2.5 py-1.5 rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-sm text-xs whitespace-nowrap"
                        >
                            <Plus className="w-3.5 h-3.5" />
                            {t.add}
                        </button>
                    </div>
                </div>

                {/* Search Bar - Full Width */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={t.search}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {loading ? (
                    <div className="text-center py-8 text-gray-500">{t.loading}</div>
                ) : rumors.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">{t.empty}</div>
                ) : (
                    rumors.map((rumor) => (
                        <div key={rumor.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow">
                            <div className="mt-1 shrink-0">
                                {rumor.status === 'verified' ? (
                                    <div className="bg-green-100 text-green-700 p-2 rounded-lg">
                                        <ShieldCheck className="w-6 h-6" />
                                    </div>
                                ) : (
                                    <div className="bg-red-100 text-red-700 p-2 rounded-lg">
                                        <ShieldAlert className="w-6 h-6" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="min-w-0">
                                        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded ${rumor.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                            }`}>
                                            {rumor.status === 'verified' ? t.table.verified : t.table.fake}
                                        </span>
                                        <h3 className="text-lg font-bold text-gray-900 mt-2 break-words">{rumor.title}</h3>
                                        <p className="text-gray-600 mt-1 whitespace-pre-wrap break-all">
                                            {expandedRumors.has(rumor.id) || rumor.description.length <= 150
                                                ? rumor.description
                                                : `${rumor.description.slice(0, 150)}...`}
                                        </p>
                                        {rumor.description.length > 150 && (
                                            <button
                                                onClick={() => toggleExpand(rumor.id)}
                                                className="text-purple-600 text-sm font-medium mt-1 hover:underline focus:outline-none"
                                            >
                                                {expandedRumors.has(rumor.id) ? t.toggle.less : t.toggle.more}
                                            </button>
                                        )}

                                        {rumor.image_url && (
                                            <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 w-full max-w-sm bg-gray-50">
                                                <img src={rumor.image_url} alt="Evidence" className="w-full h-48 object-contain" />
                                            </div>
                                        )}

                                        {rumor.source && (
                                            <a href={rumor.source.startsWith('http') ? rumor.source : `https://${rumor.source}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-blue-600 mt-2 hover:underline">
                                                <ExternalLink className="w-3 h-3" /> {t.table.source}
                                            </a>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <button onClick={() => handleEdit(rumor)} className="text-gray-400 hover:text-blue-600 transition-colors p-2 hover:bg-blue-50 rounded-full" title={common.edit}>
                                            <Pencil className="w-5 h-5" />
                                        </button>
                                        <button onClick={() => handleDelete(rumor.id)} className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full" title={common.delete}>
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Add Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg relative z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">

                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? t.form.editTitle : t.form.addTitle}</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors"><X className="w-5 h-5 text-gray-500" /></button>
                        </div>

                        {/* Modal Body - Scrollable */}
                        <div className="p-6 overflow-y-auto custom-scrollbar">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.title}</label>
                                    <input required className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.verdict}</label>
                                    <select className="w-full p-3 rounded-lg border border-gray-200 bg-white"
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as 'debunked' | 'verified' | 'pending' })}
                                    >
                                        <option value="debunked">{t.table.fake}</option>
                                        <option value="verified">{t.table.verified}</option>
                                        <option value="pending">{t.table.pending}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.explanation}</label>
                                    <textarea required rows={4} className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.sourceUrl}</label>
                                    <input className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.source} onChange={e => setFormData({ ...formData, source: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.image}</label>
                                    <div className="space-y-3">
                                        {/* Paste Zone */}
                                        <div
                                            className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all"
                                            onPaste={(e) => {
                                                const items = e.clipboardData?.items;
                                                if (items) {
                                                    for (const item of items) {
                                                        if (item.type.startsWith('image/')) {
                                                            const file = item.getAsFile();
                                                            if (file) {
                                                                if (file.size > 5000000) {
                                                                    alert("File is too large. Max 5MB.");
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
                                            <p className="text-sm text-gray-500">📋 {t.form.paste}</p>
                                            <p className="text-xs text-gray-400 mt-1">{t.form.upload}</p>
                                        </div>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    if (file.size > 5000000) { // 5MB limit
                                                        alert("File is too large. Max 5MB.");
                                                        return;
                                                    }
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setFormData({ ...formData, image_url: reader.result as string });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all border border-gray-200 rounded-lg p-1"
                                        />
                                        {formData.image_url && (
                                            <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 group">
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
                                <div className="flex justify-end pt-4 sticky bottom-0 bg-white border-t border-gray-50 mt-4">
                                    <button type="submit" className="bg-purple-600 text-white px-6 py-2.5 rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2">
                                        <Save className="w-4 h-4" /> {editId ? t.form.save : t.form.saveResponse}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
