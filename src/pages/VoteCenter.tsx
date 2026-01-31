import { MapPin } from 'lucide-react';
import AssistantAvatar from '../components/AssistantAvatar';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { getVoteCenters } from '../lib/api';
import type { VoteCenter } from '../lib/types';
import { useState } from 'react';

export default function VoteCenter() {
    const { language } = useLanguage();
    const [voteCenter, setVoteCenter] = useState<VoteCenter | null>(null);
    const [nid, setNid] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLookup = async () => {
        if (!nid) return;
        setLoading(true);
        // Simulate backend search:
        // In a real app, this would be: await api.getVoteCenterByNID(nid, dob);
        // Here we use a deterministic "hash" of the NID to pick a center.
        try {
            const centers = await getVoteCenters();
            if (centers.length > 0) {
                // Simple hash: Sum of digits % count
                // const index = nid.split('').reduce((a, b) => a + parseInt(b), 0) % centers.length;
                // Or just random for now if NID is non-numeric
                const index = Math.abs(nid.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % centers.length;
                setVoteCenter(centers[index]);
            }
        } catch (error) {
            console.error("Search failed", error);
        }
        setLoading(false);
    };

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-center min-h-[80vh]">
            <SEO
                title={language === 'bn' ? "আপনার ভোট কেন্দ্র" : "Your Vote Center"}
                description="Find your voting center and voter number."
            />

            {/* Main Card Container */}
            <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-sm border-2 border-green-600 rounded-lg p-4 md:p-8 shadow-xl overflow-hidden">

                {/* Background Image inside card - Faded */}
                <div className="absolute inset-0 z-0 opacity-10 bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>

                <div className="relative z-10 flex flex-col items-center gap-8">

                    {/* Title */}
                    <h1 className="text-4xl text-green-900 font-serif font-medium text-center">
                        {language === 'bn' ? "ভোট কেন্দ্র খুঁজুন" : "Find Your Vote Center"}
                    </h1>

                    {/* Form Section */}
                    <div className="w-full max-w-md space-y-4">
                        {/* Date Input */}
                        <div className="relative">
                            <input
                                type="text"
                                placeholder={language === 'bn' ? "দিন/মাস/বছর" : "DD/MM/YY"}
                                className="w-full bg-green-50/80 border-b-2 border-green-400 px-2 py-2 md:px-4 md:py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-base md:text-lg"
                            />
                        </div>

                        {/* NID Input */}
                        <div className="relative">
                            <input
                                type="text"
                                value={nid}
                                onChange={(e) => setNid(e.target.value)}
                                placeholder={language === 'bn' ? "এনআইডি নম্বর" : "NID Number"}
                                className="w-full bg-green-50/80 border-b-2 border-green-400 px-2 py-2 md:px-4 md:py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-base md:text-lg"
                            />
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={handleLookup}
                            disabled={loading}
                            className="w-full bg-green-800 hover:bg-green-900 text-white font-serif text-lg md:text-xl py-2 md:py-3 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-70">
                            {loading ? (language === 'bn' ? "খোঁজা হচ্ছে..." : "Searching...") : (language === 'bn' ? "সামনে এগিয়ে যান" : "Click to continue")}
                        </button>
                    </div>

                    {/* Result Display */}
                    {voteCenter && (
                        <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 mt-2 text-center animate-in fade-in">
                            <h3 className="font-bold text-green-900 text-xl">{language === 'bn' ? voteCenter.name_bn || voteCenter.name : voteCenter.name}</h3>
                            <p className="text-green-800">{language === 'bn' ? voteCenter.address_bn || voteCenter.address : voteCenter.address}</p>
                            <div className="mt-2 text-sm text-green-600">
                                Area: {voteCenter.area}
                            </div>
                        </div>
                    )}

                    {/* Bottom Section */}
                    <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6 items-center mt-8">

                        {/* Left: Assistant */}
                        <div className="flex justify-center md:justify-start">
                            <div className="transform scale-75 origin-left">
                                <AssistantAvatar />
                            </div>
                        </div>

                        {/* Center: Result Placeholders */}
                        <div className="flex flex-col gap-3 w-full">
                            <div className="h-10 w-full bg-white border-2 border-green-600 rounded-full shadow-inner"></div>
                            <div className="h-10 w-full bg-white border-2 border-green-600 rounded-full shadow-inner"></div>
                            <div className="h-12 w-full bg-green-700 rounded-md shadow-md mt-2"></div>
                        </div>

                        {/* Right: Map Link */}
                        <div className="flex items-center justify-center md:justify-end gap-2 text-green-800 font-bold cursor-pointer hover:underline">
                            <MapPin className="w-8 h-8 text-red-600" />
                            <div className="flex flex-col leading-tight">
                                <span className="text-lg">View on</span>
                                <span className="text-xl">Google Map</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            {/* Decorative Google Map bottom strip */}
            <div className="w-full max-w-4xl h-12 mt-4 bg-yellow-50 border border-gray-200 rounded overflow-hidden opacity-80">
                {/* Visual placeholder for map strip shown in design */}
                <div className="w-full h-full bg-[url('https://assets.gcore.pro/blog_containerizing_prod/uploads/2023/09/google-maps-platform-matrix-1-1.png')] bg-cover bg-center opacity-50"></div>
            </div>

        </main>
    );
}
