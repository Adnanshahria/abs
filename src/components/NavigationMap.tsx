import { useState } from 'react';
import { ChevronUp, ChevronDown, Map as MapIcon } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function NavigationMap() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { language } = useLanguage();
    const t = translations[language];

    const menuItems = [
        { label: t.nav.home, path: '/', external: false },
        { label: t.home.quickLinks.updates, path: '/election-updates', external: false },
        { label: t.home.quickLinks.center, path: 'https://ecs.gov.bd/page/election-result', external: true },
        { label: t.home.quickLinks.notice, path: 'https://www.ecs.gov.bd/', external: true },
        { label: t.home.quickLinks.candidateList, path: 'http://103.183.38.66/', external: true },
        { label: t.home.quickLinks.rumor, path: '/rumor-check', external: false },
        { label: t.home.quickLinks.tutorials, path: '/video-tutorials', external: false },
        { label: t.home.quickLinks.badge, path: '/civic-badge', external: false },
    ];
    // Hide on mobile when on chat page
    const isOnChatPage = location.pathname === '/chat';

    return (
        <>
            {/* Backdrop Blur Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <div className={`fixed bottom-8 right-8 z-50 flex flex-col items-end ${isOnChatPage ? 'hidden md:flex' : ''}`}>
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isOpen ? 'bg-red-500 hover:bg-red-600 rotate-180' : 'bg-green-500 hover:bg-green-600'
                        }`}
                >
                    {isOpen ? (
                        <ChevronDown className="w-8 h-8 text-white" />
                    ) : (
                        <ChevronUp className="w-8 h-8 text-white" />
                    )}
                </button>

                {/* Menu Popup */}
                {isOpen && (
                    <div className="absolute bottom-16 right-0 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-200 origin-bottom-right">

                        {/* Header */}
                        <div className="bg-green-50 px-5 py-4 flex items-center gap-3 border-b border-green-100">
                            <MapIcon className="w-6 h-6 text-green-600" />
                            <h3 className="text-xl font-bold text-green-700 font-serif">{t.nav.map}</h3>
                        </div>

                        {/* Scrollable List - Shows ~4 items */}
                        <div className="max-h-[200px] overflow-y-auto custom-scrollbar p-2">
                            {menuItems.map((item, index) => {
                                const isActive = location.pathname === item.path;
                                if (item.external) {
                                    return (
                                        <a
                                            key={index}
                                            href={item.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full text-left px-4 py-3 rounded-lg text-lg transition-colors text-slate-600 hover:bg-gray-50"
                                        >
                                            {item.label}
                                        </a>
                                    );
                                }
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            if (item.path !== '#') {
                                                navigate(item.path);
                                                setIsOpen(false);
                                            }
                                        }}
                                        className={`w-full text-left px-4 py-3 rounded-lg text-lg transition-colors ${isActive
                                            ? 'bg-green-500 text-white font-medium shadow-md'
                                            : 'text-slate-600 hover:bg-gray-50'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
