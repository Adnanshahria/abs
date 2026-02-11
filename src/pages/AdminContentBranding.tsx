import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Upload, Image, ArrowLeft, Check, AlertCircle } from 'lucide-react';
import { getAllPageContent, updatePageContent, type PageContentItem } from '../lib/api';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function AdminContentBranding() {
    const [content, setContent] = useState<PageContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
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

    const getLogo = () => content.find(c => c.id === 'branding_logo')?.content || '';
    const getFavicon = () => content.find(c => c.id === 'branding_favicon')?.content || '';

    const handleFileUpload = async (type: 'logo' | 'favicon', file: File) => {
        setSaveStatus('saving');
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64 = reader.result as string;
            const result = await updatePageContent(`branding_${type}`, base64, base64);

            if (result.success) {
                // Update local state
                setContent(prev => {
                    const existing = prev.find(c => c.id === `branding_${type}`);
                    if (existing) {
                        return prev.map(c => c.id === `branding_${type}` ? { ...c, content: base64, content_bn: base64 } : c);
                    }
                    return [...prev, { id: `branding_${type}`, content: base64, content_bn: base64, updated_at: new Date().toISOString() }];
                });

                // Update favicon in real-time if it's a favicon upload
                if (type === 'favicon') {
                    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement || document.createElement('link');
                    link.type = 'image/x-icon';
                    link.rel = 'shortcut icon';
                    link.href = base64;
                    document.head.appendChild(link);
                }

                setSaveStatus('saved');
                setTimeout(() => setSaveStatus('idle'), 2000);
            } else {
                setSaveStatus('error');
                setTimeout(() => setSaveStatus('idle'), 3000);
            }
        };
        reader.readAsDataURL(file);
    };

    const clearImage = async (type: 'logo' | 'favicon') => {
        setSaveStatus('saving');
        const result = await updatePageContent(`branding_${type}`, '', '');
        if (result.success) {
            setContent(prev => prev.map(c =>
                c.id === `branding_${type}` ? { ...c, content: '', content_bn: '' } : c
            ));
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } else {
            setSaveStatus('error');
            setTimeout(() => setSaveStatus('idle'), 3000);
        }
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Link to="/adm/content" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🎨 Branding</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage site logo and favicon</p>
                    </div>
                </div>

                {/* Save Status Indicator */}
                <div className="flex items-center gap-2">
                    {saveStatus === 'saving' && (
                        <span className="flex items-center gap-2 text-sm text-gray-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                        </span>
                    )}
                    {saveStatus === 'saved' && (
                        <span className="flex items-center gap-2 text-sm text-green-600">
                            <Check className="w-4 h-4" />
                            Saved!
                        </span>
                    )}
                    {saveStatus === 'error' && (
                        <span className="flex items-center gap-2 text-sm text-red-600">
                            <AlertCircle className="w-4 h-4" />
                            Error saving
                        </span>
                    )}
                </div>
            </div>

            {/* Content */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Logo Upload */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-indigo-50/50 to-purple-50/50">
                        <div className="flex items-center gap-2 mb-6">
                            <Image className="w-5 h-5 text-indigo-600" />
                            <h3 className="font-semibold text-gray-800">Site Logo</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-40 h-40 bg-white rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
                                {getLogo() ? (
                                    <img src={getLogo()} alt="Logo" className="max-w-full max-h-full object-contain" />
                                ) : (
                                    <span className="text-gray-400 text-sm text-center px-4">No logo uploaded</span>
                                )}
                            </div>
                            <input
                                type="file"
                                ref={logoInputRef}
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => e.target.files?.[0] && handleFileUpload('logo', e.target.files[0])}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={() => logoInputRef.current?.click()}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors shadow-sm"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload Logo
                                </button>
                                {getLogo() && (
                                    <button
                                        onClick={() => clearImage('logo')}
                                        className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, SVG (recommended: 200×200px)</p>
                        </div>
                    </div>

                    {/* Favicon Upload */}
                    <div className="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                        <div className="flex items-center gap-2 mb-6">
                            <Image className="w-5 h-5 text-purple-600" />
                            <h3 className="font-semibold text-gray-800">Favicon</h3>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-24 h-24 bg-white rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden shadow-inner">
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
                            <div className="flex gap-2">
                                <button
                                    onClick={() => faviconInputRef.current?.click()}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
                                >
                                    <Upload className="w-4 h-4" />
                                    Upload Favicon
                                </button>
                                {getFavicon() && (
                                    <button
                                        onClick={() => clearImage('favicon')}
                                        className="px-4 py-2.5 border border-gray-200 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            <p className="text-xs text-gray-500">ICO, PNG (recommended: 32×32px)</p>
                        </div>
                    </div>
                </div>

                {/* Tips */}
                <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <h4 className="font-medium text-blue-800 mb-2">💡 Tips</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                        <li>• The logo appears in the site header and footer</li>
                        <li>• The favicon is the small icon shown in browser tabs</li>
                        <li>• Use transparent PNG for best results</li>
                        <li>• Changes appear immediately after upload</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
