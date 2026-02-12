import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';


export default function QuickLinks() {
    const { language } = useLanguage();
    const t = translations[language];


    const quickLinks = [
        { label: t.home.quickLinks.updates, path: '/election-updates', external: false, action: null as (() => void) | null },
        { label: t.home.quickLinks.center, path: 'https://ecs.gov.bd/page/election-result', external: true, action: null as (() => void) | null },
        // { label: t.home.quickLinks.notice, path: 'https://www.ecs.gov.bd/', external: true, action: null as (() => void) | null }, // Removed as per request
        { label: t.home.quickLinks.candidateList, path: 'http://103.183.38.66/', external: true, action: null as (() => void) | null },
        { label: t.home.quickLinks.rumor, path: '/rumor-check', external: false, action: null as (() => void) | null },
        { label: t.home.quickLinks.tutorials, path: '/video-tutorials', external: false, action: null as (() => void) | null },
        { label: t.home.quickLinks.badge, path: '/civic-badge', external: false, action: null as (() => void) | null },
    ];

    return (
        <div className="h-full flex flex-col justify-center gap-2 p-4">
            {/* Ready to Vote Header - styled as a pill */}
            <div className="w-full py-3 px-6 rounded-full bg-white shadow-sm text-center mb-1">
                <h2 className="text-green-600 font-bold font-serif text-2xl italic">
                    {t.home.readyToVote}
                </h2>
            </div>

            <div className="space-y-1">
                {quickLinks.map((link, index) => {
                    // Handle action-based buttons (like Vote Center -> Google Maps)
                    if (link.action) {
                        return (
                            <button
                                key={index}
                                onClick={link.action}
                                className="block w-full py-3 xl:py-5 px-6 rounded-full bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-center group disabled:opacity-70"
                            >
                                <span className="font-bold text-gray-600 text-lg xl:text-xl group-hover:text-green-700 font-serif">
                                    {link.label}
                                </span>
                            </button>
                        );
                    }
                    // Handle external links
                    if (link.external) {
                        return (
                            <a
                                key={index}
                                href={link.path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 xl:py-5 px-6 rounded-full bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-center group"
                            >
                                <span className="font-bold text-gray-600 text-lg xl:text-xl group-hover:text-green-700 font-serif">
                                    {link.label}
                                </span>
                            </a>
                        );
                    }
                    // Handle internal links
                    return (
                        <Link
                            key={index}
                            to={link.path}
                            className="block w-full py-3 xl:py-5 px-6 rounded-full bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all text-center group"
                        >
                            <span className="font-bold text-gray-600 text-lg xl:text-xl group-hover:text-green-700 font-serif">
                                {link.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
