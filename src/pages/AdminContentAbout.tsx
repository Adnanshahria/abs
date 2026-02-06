import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { getAllPageContent, updatePageContent, type PageContentItem } from '../lib/api';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const ABOUT_CONTENT_IDS = [
    { id: 'about_title', label: 'Page Title' },
    { id: 'about_desc', label: 'Page Description' },
    { id: 'mission_title', label: 'Mission Title' },
    { id: 'mission_desc', label: 'Mission Description' },
    { id: 'vision_title', label: 'Vision Title' },
    { id: 'vision_desc', label: 'Vision Description' },
    { id: 'trust_title', label: 'Trust & Transparency Title' },
    { id: 'trust_desc', label: 'Trust & Transparency Description' },
    { id: 'story_title', label: 'Our Story Title' },
    { id: 'story_desc', label: 'Our Story Description' },
];

export default function AdminContentAbout() {
    const [content, setContent] = useState<PageContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<Record<string, SaveStatus>>({});
    const [pendingSaves, setPendingSaves] = useState<Record<string, ReturnType<typeof setTimeout>>>({});

    useEffect(() => {
        loadContent();
        return () => {
            // Clear all pending timeouts on unmount
            Object.values(pendingSaves).forEach(timeout => clearTimeout(timeout));
        };
    }, []);

    async function loadContent() {
        const data = await getAllPageContent();
        setContent(data);
        setLoading(false);
    }

    const getContentItem = (id: string) => content.find(c => c.id === id);

    const handleUpdate = useCallback((id: string, field: 'content' | 'content_bn', value: string) => {
        // Update local state immediately (optimistic update)
        setContent(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));

        // Clear existing timeout for this field
        if (pendingSaves[`${id}_${field}`]) {
            clearTimeout(pendingSaves[`${id}_${field}`]);
        }

        // Set saving status
        setSaveStatus(prev => ({ ...prev, [id]: 'saving' }));

        // Debounce the save
        const timeout = setTimeout(async () => {
            const item = content.find(c => c.id === id);
            if (item) {
                const newContent = field === 'content' ? value : item.content;
                const newContentBn = field === 'content_bn' ? value : item.content_bn;

                const result = await updatePageContent(id, newContent, newContentBn);
                if (result.success) {
                    setSaveStatus(prev => ({ ...prev, [id]: 'saved' }));
                    setTimeout(() => setSaveStatus(prev => ({ ...prev, [id]: 'idle' })), 2000);
                } else {
                    setSaveStatus(prev => ({ ...prev, [id]: 'error' }));
                    setTimeout(() => setSaveStatus(prev => ({ ...prev, [id]: 'idle' })), 3000);
                }
            }
        }, 800);

        setPendingSaves(prev => ({ ...prev, [`${id}_${field}`]: timeout }));
    }, [content, pendingSaves]);

    const getStatusIcon = (id: string) => {
        const status = saveStatus[id];
        if (status === 'saving') return <Loader2 className="w-4 h-4 animate-spin text-gray-400" />;
        if (status === 'saved') return <Check className="w-4 h-4 text-green-500" />;
        if (status === 'error') return <AlertCircle className="w-4 h-4 text-red-500" />;
        return null;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/adm/content" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">📄 About Page</h1>
                    <p className="text-gray-500 text-sm mt-1">Edit About page content • Auto-saves as you type</p>
                </div>
            </div>

            {/* Content Grid */}
            <div className="space-y-4">
                {ABOUT_CONTENT_IDS.map(({ id, label }) => {
                    const item = getContentItem(id);
                    if (!item) return null;

                    const isLargeField = id.includes('desc');

                    return (
                        <div key={id} className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center justify-between mb-3">
                                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                                    {label}
                                </label>
                                {getStatusIcon(id)}
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">English</label>
                                    {isLargeField ? (
                                        <textarea
                                            value={item.content}
                                            onChange={(e) => handleUpdate(id, 'content', e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-shadow"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={item.content}
                                            onChange={(e) => handleUpdate(id, 'content', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                                        />
                                    )}
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-500 mb-1">বাংলা (Bengali)</label>
                                    {isLargeField ? (
                                        <textarea
                                            value={item.content_bn}
                                            onChange={(e) => handleUpdate(id, 'content_bn', e.target.value)}
                                            rows={4}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-shadow"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={item.content_bn}
                                            onChange={(e) => handleUpdate(id, 'content_bn', e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-shadow"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Info Banner */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-green-700">
                    ✨ <strong>Auto-save enabled:</strong> Your changes are automatically saved as you type.
                    Look for the green checkmark to confirm saves.
                </p>
            </div>
        </div>
    );
}
