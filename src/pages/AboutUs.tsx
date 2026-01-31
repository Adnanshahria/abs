
import { Info, Users, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function AboutUs() {
    const { language } = useLanguage();
    const t = translations[language].aboutUs;

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-12 relative flex flex-col items-center min-h-[80vh]">
            <div className="w-full max-w-5xl flex flex-col gap-12 relative z-10">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-5xl text-green-900 font-serif font-bold">{t.title}</h1>
                    <p className="text-xl text-green-800/80 max-w-2xl mx-auto">
                        {t.desc}
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                    {/* Mission */}
                    <div className="bg-white/80 p-8 rounded-2xl border border-green-100 shadow-sm backdrop-blur-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="bg-green-100 p-4 rounded-full mb-4">
                            <Info className="w-8 h-8 text-green-700" />
                        </div>
                        <h3 className="text-2xl font-serif text-green-900 mb-2">{t.features.mission.title}</h3>
                        <p className="text-gray-600">
                            {t.features.mission.desc}
                        </p>
                    </div>

                    {/* Vision */}
                    <div className="bg-white/80 p-8 rounded-2xl border border-green-100 shadow-sm backdrop-blur-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="bg-green-100 p-4 rounded-full mb-4">
                            <Users className="w-8 h-8 text-green-700" />
                        </div>
                        <h3 className="text-2xl font-serif text-green-900 mb-2">{t.features.vision.title}</h3>
                        <p className="text-gray-600">
                            {t.features.vision.desc}
                        </p>
                    </div>

                    {/* Trust */}
                    <div className="bg-white/80 p-8 rounded-2xl border border-green-100 shadow-sm backdrop-blur-sm flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                        <div className="bg-green-100 p-4 rounded-full mb-4">
                            <ShieldCheck className="w-8 h-8 text-green-700" />
                        </div>
                        <h3 className="text-2xl font-serif text-green-900 mb-2">{t.features.trust.title}</h3>
                        <p className="text-gray-600">
                            {t.features.trust.desc}
                        </p>
                    </div>
                </div>

                {/* Story Section */}
                <div className="bg-green-800 text-white rounded-3xl p-8 md:p-12 shadow-xl mt-8 flex flex-col md:flex-row items-center gap-8">
                    <div className="flex-1 space-y-4">
                        <h2 className="text-3xl font-serif font-bold">{t.story.title}</h2>
                        <p className="text-green-100 text-lg leading-relaxed">
                            {t.story.desc}
                        </p>
                    </div>
                    {/* Placeholder for team image or illustration */}
                    <div className="w-full md:w-1/3 aspect-video bg-green-700/50 rounded-xl flex items-center justify-center border-2 border-green-600/30">
                        <span className="text-green-200/50 font-serif italic">{t.story.alt}</span>
                    </div>
                </div>

            </div>

            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>

        </main>
    );
}
