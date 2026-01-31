import { useState } from 'react';
import { Phone, MapPin, Loader2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function EmergencyContacts() {
    const { language } = useLanguage();
    const t = translations[language];
    const [isLocating, setIsLocating] = useState(false);

    const handleNearestPolice = () => {
        setIsLocating(true);

        if (!navigator.geolocation) {
            // Fallback: Browser doesn't support geolocation
            window.open('https://www.google.com/maps/search/police+station', '_blank');
            setIsLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                // Open Google Maps with police station search centered on user's location
                const url = `https://www.google.com/maps/search/police+station/@${latitude},${longitude},15z`;
                window.open(url, '_blank');
                setIsLocating(false);
            },
            (error) => {
                console.error('Geolocation error:', error);
                // Fallback: Open general search if location denied
                window.open('https://www.google.com/maps/search/police+station', '_blank');
                setIsLocating(false);
            },
            { enableHighAccuracy: true, timeout: 10000 }
        );
    };

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            {/* Emergency Contacts & 999 Box */}
            <div className="flex items-center gap-3 bg-white/80 px-4 py-2 rounded-xl border border-gray-200 text-green-700">
                <span className="font-bold">{t.emergency.title}</span>
                <a href="tel:999" className="flex items-center gap-1.5 hover:text-green-500 transition-colors">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">999</span>
                </a>
            </div>

            {/* Nearby Police Box */}
            <button
                onClick={handleNearestPolice}
                disabled={isLocating}
                className="flex items-center gap-2 bg-white/80 px-4 py-2 rounded-xl border border-gray-200 text-green-700 hover:bg-green-50 hover:text-green-600 transition-colors disabled:opacity-70"
            >
                {isLocating ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <MapPin className="h-4 w-4" />
                )}
                <span className="font-medium">{t.emergency.Police}</span>
            </button>
        </div>
    );
}
