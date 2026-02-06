import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Check, AlertCircle, MapPin, Search, BookOpen, ShieldCheck, Vote, Bot } from 'lucide-react';
import { getAllPageContent, updatePageContent, type PageContentItem } from '../lib/api';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

const SERVICES_CONTENT = [
    { id: 'services_title', label: 'Page Title', icon: null },
    { id: 'services_subtitle', label: 'Page Subtitle', icon: null, isLarge: true },
    { id: 'service_1_title', label: 'Service 1 - Title', icon: MapPin },
    { id: 'service_1_desc', label: 'Service 1 - Description', icon: null },
    { id: 'service_2_title', label: 'Service 2 - Title', icon: Search },
    { id: 'service_2_desc', label: 'Service 2 - Description', icon: null },
    { id: 'service_3_title', label: 'Service 3 - Title', icon: BookOpen },
    { id: 'service_3_desc', label: 'Service 3 - Description', icon: null },
    { id: 'service_4_title', label: 'Service 4 - Title', icon: ShieldCheck },
    { id: 'service_4_desc', label: 'Service 4 - Description', icon: null },
    { id: 'service_5_title', label: 'Service 5 - Title', icon: Vote },
    { id: 'service_5_desc', label: 'Service 5 - Description', icon: null },
    { id: 'service_6_title', label: 'Service 6 - Title', icon: Bot },
    { id: 'service_6_desc', label: 'Service 6 - Description', icon: null },
];

export default function AdminContentServices() {
    const [content, setContent] = useState<PageContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<Record<string, SaveStatus>>({});
    const [pendingSaves, setPendingSaves] = useState<Record<string, ReturnType<typeof setTimeout>>>({});

    useEffect(() => {
        loadContent();
        return () => {
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
        // Update local state immediately and save with the updated values
        setContent(prev => {
            const updated = prev.map(item =>
                item.id === id ? { ...item, [field]: value } : item
            );

            if (pendingSaves[`${id}_${field}`]) {
                clearTimeout(pendingSaves[`${id}_${field}`]);
            }

            setSaveStatus(prev => ({ ...prev, [id]: 'saving' }));

            const timeout = setTimeout(async () => {
                // Get current item from the updated state
                const item = updated.find(c => c.id === id);
                if (item) {
                    const result = await updatePageContent(id, item.content, item.content_bn);
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
            return updated;
        });
    }, [pendingSaves]);

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

    // Group services for better organization
    const headerContent = SERVICES_CONTENT.filter(s => s.id.startsWith('services_'));
    const serviceItems = [];
    for (let i = 1; i <= 6; i++) {
        serviceItems.push({
            title: SERVICES_CONTENT.find(s => s.id === `service_${i}_title`),
            desc: SERVICES_CONTENT.find(s => s.id === `service_${i}_desc`),
        });
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Link to="/adm/content" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">🛠️ Services Page</h1>
                    <p className="text-gray-500 text-sm mt-1">Edit Services page content • Auto-saves as you type</p>
                </div>
            </div>

            {/* Header Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-800 mb-4">Page Header</h3>
                <div className="space-y-4">
                    {headerContent.map(({ id, label, isLarge }) => {
                        const item = getContentItem(id);
                        if (!item) return null;

                        return (
                            <div key={id}>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-medium text-gray-700">{label}</label>
                                    {getStatusIcon(id)}
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">English</label>
                                        {isLarge ? (
                                            <textarea
                                                value={item.content}
                                                onChange={(e) => handleUpdate(id, 'content', e.target.value)}
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={item.content}
                                                onChange={(e) => handleUpdate(id, 'content', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs text-gray-500 mb-1">বাংলা (Bengali)</label>
                                        {isLarge ? (
                                            <textarea
                                                value={item.content_bn}
                                                onChange={(e) => handleUpdate(id, 'content_bn', e.target.value)}
                                                rows={2}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={item.content_bn}
                                                onChange={(e) => handleUpdate(id, 'content_bn', e.target.value)}
                                                className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {serviceItems.map((service, idx) => {
                    if (!service.title || !service.desc) return null;
                    const titleItem = getContentItem(service.title.id);
                    const descItem = getContentItem(service.desc.id);
                    if (!titleItem || !descItem) return null;

                    const IconComponent = service.title.icon;

                    return (
                        <div key={idx} className="bg-white rounded-xl border border-gray-200 p-5">
                            <div className="flex items-center gap-3 mb-4">
                                {IconComponent && (
                                    <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center">
                                        <IconComponent className="w-5 h-5 text-indigo-600" />
                                    </div>
                                )}
                                <h3 className="font-semibold text-gray-800">Service {idx + 1}</h3>
                            </div>

                            {/* Title */}
                            <div className="mb-4">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-medium text-gray-600">Title</label>
                                    {getStatusIcon(service.title.id)}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <input
                                        type="text"
                                        value={titleItem.content}
                                        onChange={(e) => handleUpdate(service.title!.id, 'content', e.target.value)}
                                        placeholder="English"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        value={titleItem.content_bn}
                                        onChange={(e) => handleUpdate(service.title!.id, 'content_bn', e.target.value)}
                                        placeholder="বাংলা"
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    />
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-xs font-medium text-gray-600">Description</label>
                                    {getStatusIcon(service.desc.id)}
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    <textarea
                                        value={descItem.content}
                                        onChange={(e) => handleUpdate(service.desc!.id, 'content', e.target.value)}
                                        placeholder="English"
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                    />
                                    <textarea
                                        value={descItem.content_bn}
                                        onChange={(e) => handleUpdate(service.desc!.id, 'content_bn', e.target.value)}
                                        placeholder="বাংলা"
                                        rows={2}
                                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                    />
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
                </p>
            </div>
        </div>
    );
}
