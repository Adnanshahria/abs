import EligibilityCard from '../components/EligibilityCard';
import AssistantAvatar from '../components/AssistantAvatar';
import QuickLinks from '../components/QuickLinks';
import EmergencyContacts from '../components/EmergencyContacts';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';


export default function Home() {
    const { language } = useLanguage();

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative">
            <SEO
                title={language === 'bn' ? "হোম" : "Home"}
                description={language === 'bn' ? "আপনার ভোট, আপনার অধিকার।" : "Your vote, your right."}
            />
            {/* Hero Grid - Stretched */}
            <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-start">
                {/* Left Column - Eligibility Card + Emergency Contacts */}
                <div className="lg:col-span-1 space-y-4">
                    <EligibilityCard />
                    <EmergencyContacts />
                </div>

                {/* Center Column - Assistant Avatar */}
                <div className="lg:col-span-1 flex justify-center">
                    <AssistantAvatar />
                </div>

                {/* Right Column - Quick Links */}
                <div className="lg:col-span-1">
                    <QuickLinks />
                </div>
            </div>
        </main>
    );
}
