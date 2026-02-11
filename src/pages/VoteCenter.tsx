import AssistantAvatar from '../components/AssistantAvatar';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { getVoteCenterAreas, getVoteCentersByArea } from '../lib/api';
import type { VoteCenter } from '../lib/types';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';

export default function VoteCenter() {
    const { language } = useLanguage();
    const [voteCenters, setVoteCenters] = useState<VoteCenter[]>([]);
    const [areas, setAreas] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedAreas = await getVoteCenterAreas();
            setAreas(fetchedAreas);
        };
        fetchData();
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const filteredAreas = areas.filter(area =>
        area.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSelectArea = (area: string) => {
        setSelectedArea(area);
        setSearchQuery('');
        setIsOpen(false);
    };

    const handleLookup = async () => {
        if (!selectedArea) return;
        setLoading(true);
        const centers = await getVoteCentersByArea(selectedArea);
        setVoteCenters(centers);
        setLoading(false);
    };

    const handleClear = () => {
        setSelectedArea('');
        setSearchQuery('');
        setVoteCenters([]);
    };

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-center min-h-[80vh]">
            <SEO
                title={language === 'bn' ? "আপনার ভোট কেন্দ্র" : "Your Vote Center"}
                description="Find your voting center by area."
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
                        <p className="text-center text-green-800/80 mb-2">
                            {language === 'bn'
                                ? "আপনার এলাকা বা মহল্লার নাম নির্বাচন করুন"
                                : "Select your Area or Location"}
                        </p>

                        {/* Custom Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                type="button"
                                onClick={() => setIsOpen(!isOpen)}
                                className="w-full bg-white border-2 border-green-400 rounded-lg px-4 py-3 text-left flex items-center justify-between hover:border-green-600 transition-colors focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-200"
                            >
                                <span className={`text-base md:text-lg truncate ${selectedArea ? 'text-green-900 font-medium' : 'text-green-700/50'}`}>
                                    {selectedArea || (language === 'bn' ? "এলাকা নির্বাচন করুন..." : "Select Area...")}
                                </span>
                                <div className="flex items-center gap-1">
                                    {selectedArea && (
                                        <span
                                            onClick={(e) => { e.stopPropagation(); handleClear(); }}
                                            className="p-1 hover:bg-green-100 rounded-full transition-colors cursor-pointer"
                                        >
                                            <X className="w-4 h-4 text-green-600" />
                                        </span>
                                    )}
                                    <ChevronDown className={`w-5 h-5 text-green-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </button>

                            {/* Dropdown Panel */}
                            {isOpen && (
                                <div className="absolute top-full left-0 right-0 mt-1 bg-white border-2 border-green-400 rounded-lg shadow-xl z-50 max-h-72 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                    {/* Search Input */}
                                    <div className="p-2 border-b border-green-100 sticky top-0 bg-white">
                                        <div className="relative">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={(e) => setSearchQuery(e.target.value)}
                                                placeholder={language === 'bn' ? "এলাকা খুঁজুন..." : "Search area..."}
                                                className="w-full pl-9 pr-3 py-2 text-sm border border-green-200 rounded-md focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 text-green-900 placeholder-green-400"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    {/* Options List */}
                                    <div className="overflow-y-auto flex-1">
                                        {filteredAreas.length === 0 ? (
                                            <div className="px-4 py-6 text-center text-green-600/60 text-sm">
                                                {language === 'bn' ? "কোনো এলাকা পাওয়া যায়নি" : "No area found"}
                                            </div>
                                        ) : (
                                            filteredAreas.map(area => (
                                                <button
                                                    key={area}
                                                    onClick={() => handleSelectArea(area)}
                                                    className={`w-full text-left px-4 py-2.5 text-sm md:text-base hover:bg-green-50 transition-colors cursor-pointer ${area === selectedArea ? 'bg-green-100 text-green-900 font-semibold' : 'text-green-800'
                                                        }`}
                                                >
                                                    {area}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* CTA Button */}
                        <button
                            onClick={handleLookup}
                            disabled={loading || !selectedArea}
                            className="w-full bg-green-800 hover:bg-green-900 text-white font-serif text-lg md:text-xl py-2 md:py-3 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-70 cursor-pointer disabled:cursor-not-allowed">
                            {loading ? (language === 'bn' ? "খোঁজা হচ্ছে..." : "Searching...") : (language === 'bn' ? "ভোট কেন্দ্র দেখুন" : "Show Vote Center")}
                        </button>

                        {/* External NID Search Link */}
                        <div className="text-center mt-4">
                            <span className="text-green-700/70 text-sm">
                                {language === 'bn' ? "অথবা, " : "Or, "}
                            </span>
                            <a
                                href="https://ecs.gov.bd/polling-station"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-green-600 hover:text-green-800 font-medium underline text-sm transition-colors"
                            >
                                {language === 'bn'
                                    ? "সরাসরি এনআইডি নম্বরের মাধ্যমে কেন্দ্র খুঁজুন"
                                    : "find location using your NID number"}
                            </a>
                        </div>
                    </div>

                    {/* Result Display - Multiple Centers */}
                    {voteCenters.length > 0 && (
                        <div className="w-full space-y-4">
                            <h2 className="text-center text-green-800 font-serif text-lg">
                                {language === 'bn'
                                    ? `"${selectedArea}" এলাকার জন্য ${voteCenters.length > 1 ? voteCenters.length + 'টি' : ''} ভোট কেন্দ্র`
                                    : `${voteCenters.length > 1 ? voteCenters.length + ' ' : ''}Vote Center${voteCenters.length > 1 ? 's' : ''} for "${selectedArea}"`}
                            </h2>
                            {voteCenters.map(center => (
                                <div key={center.id} className="bg-green-50 border border-green-200 rounded-lg p-4 text-center animate-in fade-in space-y-2">
                                    <h3 className="font-bold text-green-900 text-xl">{language === 'bn' ? center.name_bn || center.name : center.name}</h3>
                                    <p className="text-green-800">{language === 'bn' ? center.address_bn || center.address : center.address}</p>

                                    <div className="grid grid-cols-2 gap-4 mt-4 text-sm text-green-700">
                                        <div className="bg-white/50 p-2 rounded">
                                            <span className="block font-semibold">{language === 'bn' ? "ভোটার সংখ্যা" : "Voters"}</span>
                                            {center.total_voters || 'N/A'}
                                        </div>
                                        <div className="bg-white/50 p-2 rounded">
                                            <span className="block font-semibold">{language === 'bn' ? "ধরন" : "Type"}</span>
                                            {center.type === 'male' ? (language === 'bn' ? 'পুরুষ' : 'Male') :
                                                center.type === 'female' ? (language === 'bn' ? 'মহিলা' : 'Female') :
                                                    (language === 'bn' ? 'উভয়' : 'Combined')}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Bottom Section - Assistant Only */}
                    <div className="w-full flex justify-center mt-4">
                        <div className="transform scale-75">
                            <AssistantAvatar />
                        </div>
                    </div>

                </div>
            </div>

        </main>
    );
}
