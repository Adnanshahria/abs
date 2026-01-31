import { Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-r from-green-600 to-green-700 text-white py-3">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                    <span className="font-bold text-lg">Emergency Contacts</span>

                    <div className="flex items-center gap-6 text-sm sm:text-base">
                        <a href="tel:999" className="flex items-center gap-2 hover:text-green-200 transition-colors">
                            <Phone className="h-4 w-4" />
                            <span className="font-semibold">999</span>
                        </a>
                        <span className="text-green-300">||</span>
                        <a href="#nearby-police" className="flex items-center gap-2 hover:text-green-200 transition-colors">
                            <MapPin className="h-4 w-4" />
                            <span className="font-medium">Nearby Police</span>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
