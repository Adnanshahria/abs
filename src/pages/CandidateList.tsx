import { BarChart3, MessageSquare, Download, Filter, RefreshCcw, Clock, ArrowUpDown } from 'lucide-react';
import CustomSelect from '../components/CustomSelect';
import { useState, useEffect, useRef } from 'react';
import { getVoteStats, getReviews } from '../lib/api';
import { SEAT_SYSTEM } from '../lib/seats';
import { toPng } from 'html-to-image';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

// Helper to get divisions from the seat system
const divisions = SEAT_SYSTEM.data.map(d => d.division);

export default function CandidateList() {
    // const { user } = useAuth();
    const { language } = useLanguage();
    const t = translations[language].candidateList;
    const resultRef = useRef<HTMLDivElement>(null);

    // --- FILTER STATE ---
    const [selectedDivision, setSelectedDivision] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedArea, setSelectedArea] = useState<string>('');

    // --- DATA STATE ---
    const [stats, setStats] = useState<Record<string, number>>({});
    const [totalVotes, setTotalVotes] = useState(0);
    const [reviews, setReviews] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    // --- SORT & FILTER STATE ---
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [partyFilter, setPartyFilter] = useState<string>('all');

    // --- DERIVED LISTS ---
    const districts = selectedDivision
        ? SEAT_SYSTEM.data.find(d => d.division === selectedDivision)?.districts.map(d => d.district_name) || []
        : [];

    const areas = selectedDistrict && selectedDivision
        ? SEAT_SYSTEM.data.find(d => d.division === selectedDivision)
            ?.districts.find(d => d.district_name === selectedDistrict)
            ?.constituencies || []
        : [];

    // --- HELPERS (Prioritize these for labels) ---
    const getAllianceLabel = (id: string) => {
        const labels: Record<string, string> = {
            'bnp': 'বিএনপি ও সমমনা দলসমূহ',
            'jamayat': 'জামায়াত+ (১০ দলীয় জোট)',
            'islamic_andolon': 'ইসলামী আন্দোলন বাংলাদেশ',
            'gonotontro': 'গণতন্ত্র মঞ্চ',
            'bam_jot': 'বাম জোট (বাম গণতান্ত্রিক জোট)',
            'jatiya_party': 'জাতীয় পার্টি (এরশাদ)',
            'independent': 'স্বতন্ত্র / অন্যান্য'
        };
        return labels[id] || id;
    };

    const getAllianceColor = (id: string) => {
        const colors: Record<string, string> = {
            'bnp': 'bg-green-600',
            'jamayat': 'bg-emerald-600',
            'islamic_andolon': 'bg-orange-500',
            'gonotontro': 'bg-yellow-500',
            'bam_jot': 'bg-red-600',
            'jatiya_party': 'bg-purple-600',
            'independent': 'bg-gray-500'
        };
        return colors[id] || 'bg-blue-500';
    };

    const ALL_ALLIANCES = ['jamayat', 'bnp', 'islamic_andolon', 'gonotontro', 'bam_jot', 'jatiya_party', 'independent'];

    // --- DATA FETCHING ---
    const loadStats = async () => {
        setLoading(true);
        // Build filters based on selection depth
        const filters: any = {};
        if (selectedArea) filters.seat_no = selectedArea;
        else if (selectedDistrict) filters.district = selectedDistrict;
        else if (selectedDivision) filters.division = selectedDivision;
        // else: no filters = National

        // 1. Get Stats
        const result = await getVoteStats(filters);
        if (result.success) {
            // Ensure all alliances are represented, even with 0 votes
            const mergedStats: Record<string, number> = {};
            ALL_ALLIANCES.forEach(id => {
                mergedStats[id] = result.stats[id] || 0;
            });

            setStats(mergedStats);
            const total = Object.values(mergedStats).reduce((a, b) => a + b, 0);
            setTotalVotes(total);
        }

        // 2. Get Reviews (Always fetch, applying filters if any)
        const reviewFilters: any = {};
        if (selectedArea) reviewFilters.seat_no = selectedArea;
        else if (selectedDistrict) reviewFilters.district = selectedDistrict;
        else if (selectedDivision) reviewFilters.division = selectedDivision;
        // else: no filters = National

        const reviewsResult = await getReviews(reviewFilters);
        if (reviewsResult.success) {
            setReviews(reviewsResult.reviews);
        } else {
            setReviews([]);
        }

        setLoading(false);
    };

    // Auto-load when filters change
    useEffect(() => {
        loadStats();
    }, [selectedDivision, selectedDistrict, selectedArea]);

    // --- PROCESSING REVIEWS ---
    const getProcessedReviews = () => {
        let processed = [...reviews];

        // 1. Filter by Party
        if (partyFilter !== 'all') {
            processed = processed.filter(r => r.alliance_id === partyFilter);
        }

        // 2. Sort
        processed.sort((a, b) => {
            const dateA = new Date(a.created_at).getTime();
            const dateB = new Date(b.created_at).getTime();
            return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
        });

        return processed;
    };

    // --- HANDLERS ---
    const handleReset = () => {
        setSelectedDivision('');
        setSelectedDistrict('');
        setSelectedArea('');
        setPartyFilter('all');
        setSortOrder('newest');
    };

    const handleSaveCard = async () => {
        if (!resultRef.current) return;
        try {
            const dataUrl = await toPng(resultRef.current, {
                cacheBust: true,
                backgroundColor: '#ffffff',
                pixelRatio: 2
            });
            const link = document.createElement('a');
            link.download = `amar-ballot-result-${selectedArea || selectedDistrict || selectedDivision || 'national'}.png`;
            link.href = dataUrl;
            link.click();
        } catch (error) {
            console.error('Failed to save card:', error);
            alert('Could not save image. Please try again.');
        }
    };

    const maskName = (name: string) => {
        if (!name || name === 'Anonymous') return 'Anonymous';
        return name.length <= 3 ? name : `${name[0]}***${name.slice(-2)}`;
    };

    const getCurrentScopeTitle = () => {
        if (selectedArea) return t.resultTitles.area.replace('{area}', selectedArea);
        if (selectedDistrict) return t.resultTitles.district.replace('{district}', selectedDistrict);
        if (selectedDivision) return t.resultTitles.division.replace('{division}', selectedDivision);
        return t.resultTitles.national;
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
            month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <main className="flex-1 w-full px-2 sm:px-6 lg:px-12 py-6 md:py-8 relative flex flex-col items-center justify-start min-h-[80vh]">

            <div className="w-full max-w-6xl flex flex-col gap-6 relative z-10">

                {/* --- HEADER & FILTERS --- */}
                <div className="relative z-30 bg-white/90 backdrop-blur rounded-2xl shadow-lg border border-green-100 p-4 md:p-6 flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl text-green-900 font-serif font-bold flex items-center gap-3">
                            <BarChart3 className="w-8 h-8 text-green-600" />
                            {t.title}
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">{t.subtitle}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 bg-green-50/50 p-2 rounded-xl border border-green-100">
                        <Filter className="w-5 h-5 text-green-600 ml-2" />

                        <div className="w-[200px]">
                            <CustomSelect
                                label={t.filters.division}
                                value={selectedDivision}
                                onChange={(val) => {
                                    setSelectedDivision(val);
                                    setSelectedDistrict('');
                                    setSelectedArea('');
                                }}
                                options={divisions}
                                placeholder={t.filters.division}
                            />
                        </div>

                        <div className="w-[200px]">
                            <CustomSelect
                                label={t.filters.district}
                                value={selectedDistrict}
                                onChange={(val) => {
                                    setSelectedDistrict(val);
                                    setSelectedArea('');
                                }}
                                options={districts}
                                placeholder={t.filters.district}
                            // disabled={!selectedDivision} // CustomSelect doesn't support disabled styling yet, but logic handles empty options
                            />
                        </div>

                        <div className="w-[200px]">
                            <CustomSelect
                                label={t.filters.area}
                                value={selectedArea}
                                onChange={(val) => setSelectedArea(val)}
                                options={areas}
                                placeholder={t.filters.area}
                            />
                        </div>

                        {(selectedDivision || selectedDistrict || selectedArea) && (
                            <button
                                onClick={handleReset}
                                className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                title="Reset Filters"
                            >
                                <RefreshCcw className="w-5 h-5" />
                            </button>
                        )}
                    </div>
                </div>

                {/* --- CHART SECTION --- */}
                <div ref={resultRef} className="bg-white/95 backdrop-blur rounded-2xl shadow-xl border-2 border-green-500 p-8 w-full animate-in fade-in slide-in-from-bottom-4">

                    <div className="text-center mb-8">
                        <h2 className="text-3xl text-green-900 font-serif font-bold">
                            {getCurrentScopeTitle()}
                        </h2>
                        <div className="flex justify-center items-center gap-2 mt-2">
                            <span className="text-gray-600 font-medium">{t.totalVotes}:</span>
                            {loading ? (
                                <span className="animate-pulse bg-gray-200 h-6 w-16 rounded block"></span>
                            ) : (
                                <span className="text-green-700 text-2xl font-bold">{totalVotes}</span>
                            )}
                        </div>
                    </div>

                    {/* CHART */}
                    <div className="space-y-6 max-w-4xl mx-auto">
                        {loading && (
                            <div className="space-y-4">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div key={i} className="w-full bg-gray-100 rounded-full h-12 animate-pulse"></div>
                                ))}
                            </div>
                        )}

                        {!loading && Object.entries(stats)
                            .sort(([, a], [, b]) => b - a)
                            .map(([allianceId, count]) => {
                                const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0;
                                return (
                                    <div key={allianceId} className="w-full">
                                        <div className="flex justify-between items-end mb-1">
                                            <span className="font-bold text-gray-800 text-lg">
                                                {getAllianceLabel(allianceId)}
                                            </span>
                                            <span className="font-bold text-green-700 text-lg">
                                                {count} ({percentage}%)
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-6 overflow-hidden shadow-inner">
                                            <div
                                                className={`h-full ${getAllianceColor(allianceId)} transition-all duration-1000 ease-out relative`}
                                                style={{ width: `${percentage}%` }}
                                            >
                                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/20 to-transparent"></div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        {!loading && Object.keys(stats).length === 0 && (
                            <div className="text-center py-12 text-gray-400">
                                <p>{t.reviews.noVotes}</p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-center mt-8 pt-6 border-t border-gray-100">
                        <button
                            onClick={handleSaveCard}
                            className="bg-green-700 hover:bg-green-800 text-white font-bold py-2.5 px-6 rounded-lg shadow-md flex items-center gap-2 transition-transform active:scale-95 group"
                        >
                            <Download className="w-5 h-5 group-hover:animate-bounce" />
                            {t.download}
                        </button>
                    </div>

                </div>

                {/* --- REVIEWS TABLE SECTION --- */}
                <div className="w-full bg-white/95 backdrop-blur rounded-2xl shadow-lg border border-green-100 p-4 md:p-6 animate-in fade-in slide-in-from-bottom-8">

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 border-b border-green-50 pb-4">
                        <h3 className="text-2xl text-green-800 font-serif font-bold flex items-center gap-2">
                            <MessageSquare className="w-6 h-6" />
                            {t.reviews.title} ({selectedArea || selectedDistrict || selectedDivision || 'National'})
                        </h3>

                        {/* SORT CONTROLS */}
                        <div className="flex items-center gap-2 bg-green-50 p-1.5 rounded-lg border border-green-100">
                            <span className="text-sm font-bold text-green-700 px-2 flex items-center gap-1">
                                <ArrowUpDown className="w-4 h-4" />
                                {t.reviews.sort}:
                            </span>

                            {/* Time Sort Dropdown */}
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                                className="bg-transparent font-medium text-gray-700 text-sm focus:outline-none cursor-pointer hover:bg-green-50 rounded p-1"
                            >
                                <option value="newest">{t.reviews.newest}</option>
                                <option value="oldest">{t.reviews.oldest}</option>
                            </select>

                            {/* Party Filter Dropdown */}
                            <select
                                value={partyFilter}
                                onChange={(e) => setPartyFilter(e.target.value)}
                                className="bg-transparent font-medium text-gray-700 text-sm focus:outline-none cursor-pointer hover:bg-green-50 rounded p-1 max-w-[150px]"
                            >
                                <option value="all">{t.reviews.allParties}</option>
                                {ALL_ALLIANCES.map(id => (
                                    <option key={id} value={id}>{getAllianceLabel(id)}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* TABLE */}
                    <div className="overflow-x-auto rounded-lg border border-green-100">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-green-50/80 text-green-900 border-b border-green-200">
                                    <th className="p-2 md:p-4 font-bold whitespace-nowrap">{t.reviews.headers.voter}</th>
                                    <th className="p-2 md:p-4 font-bold whitespace-nowrap">{t.reviews.headers.seat}</th>
                                    <th className="p-2 md:p-4 font-bold whitespace-nowrap">{t.reviews.headers.party}</th>
                                    <th className="p-2 md:p-4 font-bold w-1/2">{t.reviews.headers.review}</th>
                                    <th className="p-2 md:p-4 font-bold whitespace-nowrap text-right">{t.reviews.headers.time}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {getProcessedReviews().map((review, i) => (
                                    <tr key={i} className="hover:bg-green-50/30 transition-colors">
                                        <td className="p-2 md:p-4">
                                            <div className="font-bold text-sm md:text-base text-gray-800">{maskName(review.user_name)}</div>
                                        </td>
                                        <td className="p-2 md:p-4">
                                            <div className="text-xs md:text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded inline-block">
                                                {review.seat_no || selectedArea}
                                            </div>
                                        </td>
                                        <td className="p-2 md:p-4">
                                            <div className={`inline-flex items-center gap-2 px-2 py-1 md:px-3 md:py-1 rounded-full text-white text-[10px] md:text-xs font-bold ${getAllianceColor(review.alliance_id)}`}>
                                                {getAllianceLabel(review.alliance_id)}
                                            </div>
                                        </td>
                                        <td className="p-2 md:p-4">
                                            <p className="text-gray-700 italic text-sm md:text-base">"{review.review}"</p>
                                        </td>
                                        <td className="p-2 md:p-4 text-right text-xs md:text-sm text-gray-500 whitespace-nowrap">
                                            <div className="flex items-center justify-end gap-1">
                                                <Clock className="w-3 h-3" />
                                                {formatDate(review.created_at)}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {getProcessedReviews().length === 0 && (
                            <div className="p-8 text-center text-gray-400 italic">
                                {reviews.length > 0 ? t.reviews.empty : t.reviews.noVotes}
                            </div>
                        )}
                    </div>

                </div>

            </div>

            {/* Background */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
