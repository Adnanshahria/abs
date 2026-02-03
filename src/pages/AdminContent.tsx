import { useState, useEffect, useRef } from 'react';
import { Save, ChevronDown, ChevronUp, Loader2, Upload, Image } from 'lucide-react';
import { getAllPageContent, updatePageContent, type PageContentItem } from '../lib/api';

interface ContentSection {
    title: string;
    prefix: string;
    items: PageContentItem[];
}

export default function AdminContent() {
    const [content, setContent] = useState<PageContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState<string | null>(null);
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
        branding: true,
        about: false,
        contact: false,
        service: false
    });
    const logoInputRef = useRef<HTMLInputElement>(null);
    const faviconInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadContent();
    }, []);

    async function loadContent() {
        const data = await getAllPageContent();
        setContent(data);
        setLoading(false);
    }

    const sections: ContentSection[] = [
        {
            title: 'About Page',
            prefix: 'about',
            items: content.filter(c => c.id.startsWith('about') || c.id.startsWith('mission') || c.id.startsWith('vision') || c.id.startsWith('trust') || c.id.startsWith('story'))
        },
        {
            title: 'Contact Page',
            prefix: 'contact',
            items: content.filter(c => c.id.startsWith('contact'))
        },
        {
            title: 'Services Page',
            prefix: 'service',
            items: content.filter(c => c.id.startsWith('service'))
        }
    ];

    const handleUpdate = (id: string, field: 'content' | 'content_bn', value: string) => {
        setContent(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));
    };

    const handleSave = async (id: string) => {
        setSaving(id);
        const item = content.find(c => c.id === id);
        if (item) {
            await updatePageContent(id, item.content, item.content_bn);
        }
        setSaving(null);
    };

    const handleFileUpload = async (type: 'logo' | 'favicon', file: File) => {
        setSaving(type);
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            await updatePageContent(`branding_${type}`, base64, base64);
            // Update local state
            setContent(prev => {
                const existing = prev.find(c => c.id === `branding_${type}`);
                if (existing) {
                    return prev.map(c => c.id === `branding_${type}` ? { ...c, content: base64, content_bn: base64 } : c);
                }
                return [...prev, { id: `branding_${type}`, content: base64, content_bn: base64, updated_at: new Date().toISOString() }];
            });
            setSaving(null);

            // Update favicon in real-time if it's a favicon upload
            if (type === 'favicon') {
                const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
                link.type = 'image/x-icon';
                link.rel = 'shortcut icon';
                link.href = base64;
                document.head.appendChild(link);
            }
        };
        reader.readAsDataURL(file);
    };

    const toggleSection = (prefix: string) => {
        setExpandedSections(prev => ({ ...prev, [prefix]: !prev[prefix] }));
    };

    const getLogo = () => content.find(c => c.id === 'branding_logo')?.content || '';
    const getFavicon = () => content.find(c => c.id === 'branding_favicon')?.content || '';

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
                    <p className="text-gray-500 text-sm mt-1">Edit branding, About, Contact, and Services pages</p>
                </div>
            </div>

            <div className="space-y-4">
                {/* Branding Section */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                    <button
                        onClick={() => toggleSection('branding')}
                        className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 transition-colors"
                    >
                        <h2 className="text-lg font-semibold text-indigo-800">🎨 Branding (Logo & Favicon)</h2>
                        {expandedSections['branding'] ? (
                            <ChevronUp className="w-5 h-5 text-indigo-500" />
                        ) : (
                            <ChevronDown className="w-5 h-5 text-indigo-500" />
                        )}
                    </button>

                    {expandedSections['branding'] && (
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Logo Upload */}
                                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Image className="w-5 h-5 text-indigo-600" />
                                        <h3 className="font-semibold text-gray-800">Site Logo</h3>
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-32 h-32 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                            {getLogo() ? (
                                                <img src={getLogo()} alt="Logo" className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <span className="text-gray-400 text-sm text-center px-2">No logo uploaded</span>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={logoInputRef}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                                        />
                                        <button
                                            onClick={() => logoInputRef.current?.click()}
                                            disabled={saving === 'logo'}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                        >
                                            {saving === 'logo' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                            Upload Logo
                                        </button>
                                        <p className="text-xs text-gray-500">PNG, JPG, SVG (recommended: 200x200px)</p>
                                    </div>
                                </div>

                                {/* Favicon Upload */}
                                <div className="border border-gray-200 rounded-xl p-5 bg-gray-50/50">
                                    <div className="flex items-center gap-2 mb-4">
                                        <Image className="w-5 h-5 text-purple-600" />
                                        <h3 className="font-semibold text-gray-800">Favicon</h3>
                                    </div>
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-16 h-16 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                                            {getFavicon() ? (
                                                <img src={getFavicon()} alt="Favicon" className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <span className="text-gray-400 text-xs">None</span>
                                            )}
                                        </div>
                                        <input
                                            type="file"
                                            ref={faviconInputRef}
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => e.target.files?.[0] && handleFileUpload('favicon', e.target.files[0])}
                                        />
                                        <button
                                            onClick={() => faviconInputRef.current?.click()}
                                            disabled={saving === 'favicon'}
                                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors"
                                        >
                                            {saving === 'favicon' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                            Upload Favicon
                                        </button>
                                        <p className="text-xs text-gray-500">ICO, PNG (recommended: 32x32px)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Sections */}
                {sections.map(section => (
                    <div key={section.prefix} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <button
                            onClick={() => toggleSection(section.prefix)}
                            className="w-full flex items-center justify-between px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
                        >
                            <h2 className="text-lg font-semibold text-gray-800">{section.title}</h2>
                            {expandedSections[section.prefix] ? (
                                <ChevronUp className="w-5 h-5 text-gray-500" />
                            ) : (
                                <ChevronDown className="w-5 h-5 text-gray-500" />
                            )}
                        </button>

                        {expandedSections[section.prefix] && (
                            <div className="p-6 space-y-6">
                                {section.items.map(item => (
                                    <div key={item.id} className="border border-gray-100 rounded-lg p-4 bg-gray-50/50">
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                                                {item.id.replace(/_/g, ' ')}
                                            </label>
                                            <button
                                                onClick={() => handleSave(item.id)}
                                                disabled={saving === item.id}
                                                className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white text-xs font-medium rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                                            >
                                                {saving === item.id ? (
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                ) : (
                                                    <Save className="w-3 h-3" />
                                                )}
                                                Save
                                            </button>
                                        </div>
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">English</label>
                                                <textarea
                                                    value={item.content}
                                                    onChange={(e) => handleUpdate(item.id, 'content', e.target.value)}
                                                    rows={item.content.length > 100 ? 4 : 2}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-xs text-gray-500 mb-1">বাংলা (Bengali)</label>
                                                <textarea
                                                    value={item.content_bn}
                                                    onChange={(e) => handleUpdate(item.id, 'content_bn', e.target.value)}
                                                    rows={item.content_bn.length > 100 ? 4 : 2}
                                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

