import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import SEO from '../components/SEO';

export default function FAQ() {
    const { language } = useLanguage();
    const t = translations[language];
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <SEO
                title={t.faq.title}
                description="Frequently asked questions about the election."
            />
            <div className="w-full max-w-3xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">{t.faq.title}</h1>

                <div className="space-y-4">
                    {t.faq.questions.map((faq, index) => (
                        <div key={index} className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm border border-green-100 overflow-hidden">
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left px-6 py-4 flex justify-between items-center hover:bg-green-50 transition-colors"
                            >
                                <span className="font-semibold text-green-900 text-lg">{faq.q}</span>
                                {openIndex === index ? (
                                    <ChevronUp className="w-5 h-5 text-green-600" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-green-600" />
                                )}
                            </button>
                            {openIndex === index && (
                                <div className="px-6 py-4 text-gray-600 border-t border-green-100 bg-green-50/30">
                                    {faq.a}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
