import { BookOpen, Award, PlayCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Course() {
    const { language } = useLanguage();
    const t = translations[language].coursePage;

    return (
        <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t.desc}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {t.modules.map((module, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {module.duration}
                                </span>
                                <PlayCircle className="w-6 h-6 text-gray-300 group-hover:text-green-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{module.title}</h3>
                            <p className="text-gray-600 text-sm mb-6">{module.desc}</p>

                            <ul className="space-y-3">
                                {module.lessons.map((lesson, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
                                            {i + 1}
                                        </div>
                                        {lesson}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 bg-green-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <Award className="w-12 h-12 mx-auto mb-4 text-green-200" />
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">{t.cta.title}</h2>
                        <p className="text-green-100 mb-8 max-w-xl mx-auto">
                            {t.cta.desc}
                        </p>
                        <button className="bg-white text-green-700 px-8 py-3.5 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg active:scale-95 transform">
                            {t.cta.btn}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
