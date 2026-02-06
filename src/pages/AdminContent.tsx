import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, Palette, FileText, Phone, Wrench, Award, ChevronRight } from 'lucide-react';
import { getAllPageContent, type PageContentItem } from '../lib/api';

interface ContentSection {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    color: string;
    bgColor: string;
    path: string;
    prefixes: string[];
}

const CONTENT_SECTIONS: ContentSection[] = [
    {
        id: 'branding',
        title: 'Branding',
        description: 'Logo and Favicon',
        icon: Palette,
        color: 'text-indigo-600',
        bgColor: 'bg-indigo-100',
        path: '/adm/content/branding',
        prefixes: ['branding_'],
    },
    {
        id: 'about',
        title: 'About Page',
        description: 'Mission, Vision, Story',
        icon: FileText,
        color: 'text-blue-600',
        bgColor: 'bg-blue-100',
        path: '/adm/content/about',
        prefixes: ['about_', 'mission_', 'vision_', 'trust_', 'story_'],
    },
    {
        id: 'contact',
        title: 'Contact Page',
        description: 'Emails, Phone, Address',
        icon: Phone,
        color: 'text-emerald-600',
        bgColor: 'bg-emerald-100',
        path: '/adm/content/contact',
        prefixes: ['contact_'],
    },
    {
        id: 'services',
        title: 'Services Page',
        description: '6 Service Items',
        icon: Wrench,
        color: 'text-orange-600',
        bgColor: 'bg-orange-100',
        path: '/adm/content/services',
        prefixes: ['services_', 'service_'],
    },
    {
        id: 'citizen',
        title: 'Good Citizen Message',
        description: 'Inspiring Message',
        icon: Award,
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        path: '/adm/content/citizen',
        prefixes: ['citizen_'],
    },
];

export default function AdminContent() {
    const [content, setContent] = useState<PageContentItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadContent();
    }, []);

    async function loadContent() {
        const data = await getAllPageContent();
        setContent(data);
        setLoading(false);
    }

    const getLastUpdated = (prefixes: string[]) => {
        const items = content.filter(c =>
            prefixes.some(p => c.id.startsWith(p))
        );
        if (items.length === 0) return null;

        const sorted = items
            .filter(i => i.updated_at)
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

        return sorted[0]?.updated_at;
    };

    const formatDate = (dateStr: string | null) => {
        if (!dateStr) return 'Never';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getItemCount = (prefixes: string[]) => {
        return content.filter(c =>
            prefixes.some(p => c.id.startsWith(p))
        ).length;
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
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Page Content</h1>
                <p className="text-gray-500 text-sm mt-1">
                    Manage website content across different pages
                </p>
            </div>

            {/* Content Sections Grid */}
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {CONTENT_SECTIONS.map((section) => {
                    const IconComponent = section.icon;
                    const lastUpdated = getLastUpdated(section.prefixes);
                    const itemCount = getItemCount(section.prefixes);

                    return (
                        <Link
                            key={section.id}
                            to={section.path}
                            className="group bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:border-gray-300 transition-all duration-200"
                        >
                            <div className="flex items-start justify-between">
                                <div className={`w-12 h-12 ${section.bgColor} rounded-xl flex items-center justify-center`}>
                                    <IconComponent className={`w-6 h-6 ${section.color}`} />
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
                            </div>

                            <div className="mt-4">
                                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {section.title}
                                </h3>
                                <p className="text-sm text-gray-500 mt-1">
                                    {section.description}
                                </p>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
                                <span className="text-gray-400">
                                    {itemCount} item{itemCount !== 1 ? 's' : ''}
                                </span>
                                <span className="text-gray-400">
                                    Updated: {formatDate(lastUpdated)}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 p-5">
                <h4 className="font-semibold text-indigo-800 mb-2">💡 Quick Tips</h4>
                <ul className="text-sm text-indigo-700 space-y-1">
                    <li>• Click any section to edit its content</li>
                    <li>• All changes are auto-saved as you type</li>
                    <li>• Content supports both English and Bengali</li>
                    <li>• Changes appear on the live site immediately</li>
                </ul>
            </div>
        </div>
    );
}
