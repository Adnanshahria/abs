import { ArrowRight, FileText, UserPlus, Fingerprint, Vote } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';

export default function VoterGuide() {
    const { language } = useLanguage();
    const t = translations[language];

    const icons = [
        <UserPlus className="w-8 h-8 text-green-600" />,
        <Fingerprint className="w-8 h-8 text-green-600" />,
        <FileText className="w-8 h-8 text-green-600" />,
        <Vote className="w-8 h-8 text-green-600" />
    ];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <SEO
                title={t.voterGuide.title}
                description="Step by step guide on how to vote."
            />
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">{t.voterGuide.title}</h1>

                <div className="space-y-6">
                    {t.voterGuide.steps.map((step, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-green-100 flex items-start gap-6 hover:shadow-md transition-shadow animate-in slide-in-from-bottom-2 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                            <div className="bg-green-100 p-4 rounded-full flex-shrink-0">
                                {icons[index] || icons[0]}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-green-800 mb-2 flex items-center gap-2">
                                    <span className="bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">{index + 1}</span>
                                    {step.title}
                                </h3>
                                <p className="text-gray-600">{step.desc}</p>
                            </div>
                            <div className="hidden md:block self-center">
                                <ArrowRight className="w-6 h-6 text-green-300" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-green-600 text-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-2xl font-serif font-bold mb-2">{t.voterGuide.readyTitle}</h3>
                        <p className="text-green-50">{t.voterGuide.readyDesc}</p>
                    </div>
                    <Link to="/vote-center" className="bg-white text-green-800 px-8 py-3 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-md">
                        {t.voterGuide.findBtn}
                    </Link>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
