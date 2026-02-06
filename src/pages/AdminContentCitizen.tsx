import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowLeft, Check, AlertCircle, Award, Sparkles } from 'lucide-react';
import { getAllPageContent, updatePageContent, type PageContentItem } from '../lib/api';

type SaveStatus = 'idle' | 'saving' | 'saved' | 'error';

export default function AdminContentCitizen() {
    const [content, setContent] = useState<PageContentItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
    const [pendingSave, setPendingSave] = useState<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        loadContent();
        return () => {
            if (pendingSave) clearTimeout(pendingSave);
        };
    }, []);

    async function loadContent() {
        const data = await getAllPageContent();
        setContent(data);
        setLoading(false);
    }

    const getMessage = () => content.find(c => c.id === 'citizen_inspiring_message');

    const handleUpdate = useCallback((field: 'content' | 'content_bn', value: string) => {
        const id = 'citizen_inspiring_message';

        setContent(prev => prev.map(item =>
            item.id === id ? { ...item, [field]: value } : item
        ));

        if (pendingSave) {
            clearTimeout(pendingSave);
        }

        setSaveStatus('saving');

        const timeout = setTimeout(async () => {
            const item = content.find(c => c.id === id);
            if (item) {
                const newContent = field === 'content' ? value : item.content;
                const newContentBn = field === 'content_bn' ? value : item.content_bn;

                const result = await updatePageContent(id, newContent, newContentBn);
                if (result.success) {
                    setSaveStatus('saved');
                    setTimeout(() => setSaveStatus('idle'), 2000);
                } else {
                    setSaveStatus('error');
                    setTimeout(() => setSaveStatus('idle'), 3000);
                }
            }
        }, 800);

        setPendingSave(timeout);
    }, [content, pendingSave]);

    const getStatusDisplay = () => {
        if (saveStatus === 'saving') {
            return (
                <span className="flex items-center gap-2 text-sm text-gray-500">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                </span>
            );
        }
        if (saveStatus === 'saved') {
            return (
                <span className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="w-4 h-4" />
                    Saved!
                </span>
            );
        }
        if (saveStatus === 'error') {
            return (
                <span className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="w-4 h-4" />
                    Error saving
                </span>
            );
        }
        return null;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }

    const message = getMessage();

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/adm/content" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <ArrowLeft className="w-5 h-5 text-gray-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">🎖️ Good Citizen Message</h1>
                        <p className="text-gray-500 text-sm mt-1">Edit the inspiring message shown to responsible citizens</p>
                    </div>
                </div>
                {getStatusDisplay()}
            </div>

            {/* Message Preview */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <Award className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-green-800">Preview</h3>
                        <p className="text-sm text-green-600">This is how the message appears to users</p>
                    </div>
                </div>
                <div className="bg-white/60 backdrop-blur rounded-lg p-4 border border-green-100">
                    <div className="flex items-start gap-2">
                        <Sparkles className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-gray-700 leading-relaxed">
                            {message?.content || 'No message set'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Editor */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Edit Message</h3>

                <div className="space-y-4">
                    {/* English */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            English Message
                        </label>
                        <textarea
                            value={message?.content || ''}
                            onChange={(e) => handleUpdate('content', e.target.value)}
                            rows={4}
                            placeholder="Enter the inspiring message in English..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-shadow"
                        />
                    </div>

                    {/* Bengali */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            বাংলা বার্তা (Bengali Message)
                        </label>
                        <textarea
                            value={message?.content_bn || ''}
                            onChange={(e) => handleUpdate('content_bn', e.target.value)}
                            rows={4}
                            placeholder="বাংলায় অনুপ্রেরণামূলক বার্তা লিখুন..."
                            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-shadow"
                        />
                    </div>
                </div>
            </div>

            {/* Context Info */}
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                <h4 className="font-medium text-amber-800 mb-2">📍 When is this shown?</h4>
                <p className="text-sm text-amber-700">
                    This message appears when a user successfully completes all eligibility checks on the Civic Badge page,
                    confirming they are a responsible and informed citizen ready to participate in elections.
                </p>
            </div>

            {/* Auto-save Info */}
            <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                <p className="text-sm text-green-700">
                    ✨ <strong>Auto-save enabled:</strong> Your changes are automatically saved as you type.
                </p>
            </div>
        </div>
    );
}
