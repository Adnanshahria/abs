import EligibilityCard from '../components/EligibilityCard';
import SmartAvatar from '../components/SmartAvatar';
import QuickLinks from '../components/QuickLinks';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';


import { translations } from '../data/translations';

export default function Home() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 relative min-h-[115vh] flex flex-col justify-start pt-12 xl:pt-16 xl:text-lg">
            <SEO
                title={t.home.seo.title}
                description={t.home.seo.desc}
            />
            {/* Hero Grid - Centered */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 xl:gap-8 items-center">
                {/* Left Column - Eligibility Card */}
                <div className="lg:col-span-1 space-y-4">
                    <EligibilityCard />
                </div>

                {/* Center Column - Assistant Avatar */}
                <div className="lg:col-span-1 flex justify-center">
                    <SmartAvatar />
                </div>

                {/* Right Column - Quick Links */}
                <div className="lg:col-span-1">
                    <QuickLinks />
                </div>
            </div>
        </main>
    );
}
