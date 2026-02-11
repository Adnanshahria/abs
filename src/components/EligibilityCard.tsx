import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, ChevronRight, MapPin, FileText, Video, Shield, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { getPageContent } from '../lib/api';

export default function EligibilityCard() {
    const { language } = useLanguage();
    const t = translations[language];
    const navigate = useNavigate();
    const [checked, setChecked] = useState<Record<string, boolean>>({});
    const [showModal, setShowModal] = useState(false);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [inspiringMessage, setInspiringMessage] = useState<{ en: string; bn: string }>({
        en: 'A responsible citizen is the backbone of a strong democracy. Your vote is your voice!',
        bn: 'একজন দায়িত্বশীল নাগরিক একটি শক্তিশালী গণতন্ত্রের মেরুদণ্ড। আপনার ভোট আপনার কণ্ঠস্বর!'
    });

    // Fetch inspiring message from admin settings
    useEffect(() => {
        getPageContent('citizen').then(content => {
            if (content.citizen_inspiring_message?.en) {
                setInspiringMessage({
                    en: content.citizen_inspiring_message.en,
                    bn: content.citizen_inspiring_message.bn || content.citizen_inspiring_message.en
                });
            }
        });
    }, []);

    const eligibilityItems = [
        { id: 'nid', label: t.eligibility.checklist.nid },
        { id: 'polling', label: t.eligibility.checklist.polling },
        { id: 'steps', label: t.eligibility.checklist.steps },
        { id: 'rights', label: t.eligibility.checklist.rights },
        { id: 'rules', label: t.eligibility.checklist.rules },
    ];

    const toggleItem = (id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleCheck = () => {
        const missing = eligibilityItems.filter(item => !checked[item.id]);

        if (missing.length === 0) {
            // All checked - Success! Show only good citizen message
            setSuggestions([{
                status: 'success'
            }]);
            setShowModal(true);
        } else {
            // Suggest actions based on missing items
            const newSuggestions = missing.map(item => {
                switch (item.id) {
                    case 'nid':
                        return {
                            id: 'nid',
                            title: language === 'bn' ? 'এনআইডি কার্ড নেই?' : 'No NID Card?',
                            desc: language === 'bn' ? 'নতুন এনআইডি আবেদনের জন্য নির্বাচন কমিশনের ওয়েবসাইটে যান।' : 'Apply for NID at Election Commission website.',
                            action: language === 'bn' ? 'আবেদন করুন' : 'Apply Now',
                            path: 'https://services.nidw.gov.bd/',
                            external: true,
                            icon: FileText,
                            color: 'text-orange-600',
                            bgColor: 'bg-orange-50'
                        };
                    case 'polling':
                        return {
                            id: 'polling',
                            title: language === 'bn' ? 'ভোট কেন্দ্র জানেন না?' : 'Don\'t know Vote Center?',
                            desc: language === 'bn' ? 'আপনার নিকটস্থ ভোট কেন্দ্র খুঁজে বের করুন।' : 'Find your nearest polling center.',
                            action: language === 'bn' ? 'কেন্দ্র খুঁজুন' : 'Find Center',
                            path: '/vote-center',
                            icon: MapPin,
                            color: 'text-blue-600',
                            bgColor: 'bg-blue-50'
                        };
                    case 'steps':
                        return {
                            id: 'steps',
                            title: language === 'bn' ? 'ভোট প্রদানের নিয়ম জানেন না?' : 'Unsure how to vote?',
                            desc: language === 'bn' ? 'আমাদের ভিডিও টিউটোরিয়াল দেখে জেনে নিন।' : 'Watch our video tutorials to learn.',
                            action: language === 'bn' ? 'ভিডিও দেখুন' : 'Watch Videos',
                            path: '/video-tutorials',
                            icon: Video,
                            color: 'text-purple-600',
                            bgColor: 'bg-purple-50'
                        };
                    case 'rights':
                    case 'rules':
                        return {
                            id: 'civic',
                            title: language === 'bn' ? 'নাগরিক দায়িত্ব সম্পর্কে জানুন' : 'Learn Civic Duties',
                            desc: language === 'bn' ? 'নাগরিক ব্যাজ সেকশনে আপনার অধিকার ও দায়িত্ব জানুন।' : 'Check Civic Badge section for rights & rules.',
                            action: language === 'bn' ? 'দায়িত্ব জানুন' : 'Learn More',
                            path: '/civic-badge?tab=responsibilities',
                            icon: Shield,
                            color: 'text-indigo-600',
                            bgColor: 'bg-indigo-50'
                        };
                    default:
                        return null;
                }
            }).filter(Boolean);

            // Deduplicate suggestions (e.g. rights & rules both map to civic badge)
            const uniqueSuggestions = Array.from(new Map(newSuggestions.map(item => [item?.path, item])).values());
            setSuggestions(uniqueSuggestions);
            setShowModal(true);
        }
    };

    return (
        <div>
            {/* Title Section */}
            <div className="mb-4 xl:mb-8">
                <h1 className="text-4xl xl:text-5xl font-croissant text-[#1a2e4a]">{t.eligibility.headerMain}</h1>
                <div className="water-fill-container">
                    <p className="water-fill-text text-green-700 font-bold text-xl xl:text-2xl italic">{t.eligibility.headerSub}</p>
                </div>
            </div>

            <h2 className="text-2xl xl:text-3xl font-bold text-gray-800 mb-3 xl:mb-6">
                {t.eligibility.question} <span className="text-green-600">{t.eligibility.voter}</span>?
            </h2>

            {/* Eligibility Checklist */}
            <div className="border-2 border-green-500 rounded-lg p-3 mb-3 xl:p-8 xl:mb-8 bg-white transition-all">
                <h3 className="font-bold text-gray-800 mb-2 xl:mb-4 text-sm xl:text-lg">{t.eligibility.title}</h3>
                <div className="space-y-0.5">
                    {eligibilityItems.map((item) => (
                        <label
                            key={item.id}
                            className="flex items-center gap-2 xl:gap-4 cursor-pointer py-0.5 xl:py-2"
                        >
                            <input
                                type="checkbox"
                                checked={checked[item.id] || false}
                                onChange={() => toggleItem(item.id)}
                                className="w-3.5 h-3.5 xl:w-6 xl:h-6 text-green-600 border-gray-300 rounded focus:ring-green-500"
                            />
                            <span className="text-xs xl:text-xl text-gray-700 font-medium">
                                {item.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <button
                onClick={handleCheck}
                className="w-full py-2 xl:py-4 xl:text-2xl rounded-lg font-semibold bg-green-400 text-green-900 hover:bg-green-500 transition-all font-serif"
            >
                {t.eligibility.resultBtn}
            </button>

            {/* Suggestions Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 relative">
                        {/* Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                                {suggestions[0]?.status === 'success' ? (
                                    <>🎉 {language === 'bn' ? 'অভিনন্দন' : 'Congratulations'}</>
                                ) : (
                                    <>💡 {language === 'bn' ? 'পরামর্শ' : 'Suggestions'}</>
                                )}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-200 rounded-full transition-colors">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Content - Only show if there are actual suggestions (not success-only) */}
                        {suggestions[0]?.title && (
                            <div className="p-4 space-y-3 max-h-[60vh] overflow-y-auto">
                                {suggestions.map((item, idx) => (
                                    <div key={idx} className={`p-4 rounded-xl border ${item.bgColor} border-transparent hover:border-gray-200 transition-all`}>
                                        <div className="flex items-start gap-4">
                                            <div className={`p-2 rounded-full bg-white shadow-sm ${item.color}`}>
                                                <item.icon className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className={`font-bold text-lg mb-1 text-gray-900`}>{item.title}</h4>
                                                <p className="text-sm text-gray-600 mb-3 leading-relaxed">{item.desc}</p>

                                                {item.external ? (
                                                    <a
                                                        href={item.path}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-green-600 hover:gap-2 transition-all group"
                                                    >
                                                        {item.action} <ChevronRight className="w-4 h-4 group-hover:text-green-500" />
                                                    </a>
                                                ) : (
                                                    <button
                                                        onClick={() => {
                                                            navigate(item.path);
                                                            setShowModal(false);
                                                        }}
                                                        className="inline-flex items-center gap-1.5 text-sm font-bold text-gray-700 hover:text-green-600 hover:gap-2 transition-all group"
                                                    >
                                                        {item.action} <ChevronRight className="w-4 h-4 group-hover:text-green-500" />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Footer - Good Citizen Message */}
                        {suggestions[0]?.status === 'success' && (
                            <div className="p-5 bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 border-t border-green-200 text-center">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                                    <p className="text-green-800 font-bold text-base">
                                        {language === 'bn' ? '🎖️ আপনি এখন দায়িত্বশীল নাগরিক!' : '🎖️ You are now a responsible citizen!'}
                                    </p>
                                    <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                                </div>
                                <p className="text-green-700 text-sm italic leading-relaxed">
                                    "{language === 'bn' ? inspiringMessage.bn : inspiringMessage.en}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
