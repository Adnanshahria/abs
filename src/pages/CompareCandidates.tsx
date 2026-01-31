import { useState, useEffect } from 'react';
import { getCandidates } from '../lib/api';
import { Search, ArrowRightLeft, X } from 'lucide-react';

export default function CompareCandidates() {
    const [candidates, setCandidates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Comparison State
    const [selectedCandidate1, setSelectedCandidate1] = useState<any>(null);
    const [selectedCandidate2, setSelectedCandidate2] = useState<any>(null);

    useEffect(() => {
        const load = async () => {
            const data = await getCandidates();
            setCandidates(data);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <div className="text-center py-20">Loading candidates...</div>;

    const ComparisonRow = ({ label, val1, val2 }: { label: string, val1: any, val2: any }) => (
        <div className="grid grid-cols-3 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors">
            <div className="text-sm font-medium text-gray-500 flex items-center">{label}</div>
            <div className="font-medium text-gray-900 px-2">{val1 || '-'}</div>
            <div className="font-medium text-gray-900 border-l border-gray-100 px-2">{val2 || '-'}</div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ArrowRightLeft className="w-8 h-8 text-purple-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Compare Candidates</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Select two candidates to see a side-by-side comparison of their profiles, manifestos, and qualifications.
                    </p>
                </div>

                {/* Selection Area */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                    {/* Candidate 1 Selector */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Select Candidate 1</h3>
                        {!selectedCandidate1 ? (
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <select
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 appearance-none"
                                    onChange={(e) => setSelectedCandidate1(candidates.find(c => c.id === parseInt(e.target.value)))}
                                >
                                    <option value="">Choose a candidate...</option>
                                    {candidates.map(c => <option key={c.id} value={c.id}>{c.name} ({c.party})</option>)}
                                </select>
                            </div>
                        ) : (
                            <div className="relative group">
                                <button
                                    onClick={() => setSelectedCandidate1(null)}
                                    className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <img src={selectedCandidate1.image_url} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{selectedCandidate1.name}</h4>
                                        <p className="text-sm text-gray-500">{selectedCandidate1.party}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Candidate 2 Selector */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Select Candidate 2</h3>
                        {!selectedCandidate2 ? (
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                                <select
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 appearance-none"
                                    onChange={(e) => setSelectedCandidate2(candidates.find(c => c.id === parseInt(e.target.value)))}
                                >
                                    <option value="">Choose a candidate...</option>
                                    {candidates.map(c => <option key={c.id} value={c.id}>{c.name} ({c.party})</option>)}
                                </select>
                            </div>
                        ) : (
                            <div className="relative group">
                                <button
                                    onClick={() => setSelectedCandidate2(null)}
                                    className="absolute -top-3 -right-3 bg-red-100 text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                                <div className="flex items-center gap-4">
                                    <img src={selectedCandidate2.image_url} className="w-16 h-16 rounded-full object-cover bg-gray-100" />
                                    <div>
                                        <h4 className="font-bold text-gray-900">{selectedCandidate2.name}</h4>
                                        <p className="text-sm text-gray-500">{selectedCandidate2.party}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Comparison Table */}
                {selectedCandidate1 && selectedCandidate2 && (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="p-6 bg-gray-50 border-b border-gray-100 grid grid-cols-3 gap-4">
                            <div className="font-bold text-gray-400 uppercase text-xs tracking-wider pt-2">Metric</div>
                            <div className="font-bold text-purple-900">{selectedCandidate1.name}</div>
                            <div className="font-bold text-purple-900 border-l border-gray-200 pl-4">{selectedCandidate2.name}</div>
                        </div>
                        <div className="p-6 space-y-2">
                            <ComparisonRow label="Party" val1={selectedCandidate1.party} val2={selectedCandidate2.party} />
                            <ComparisonRow label="Symbol" val1={selectedCandidate1.symbol} val2={selectedCandidate2.symbol} />
                            <ComparisonRow label="Age" val1={`${selectedCandidate1.age} years`} val2={`${selectedCandidate2.age} years`} />
                            <ComparisonRow label="Education" val1={selectedCandidate1.education} val2={selectedCandidate2.education} />
                            <ComparisonRow label="Constituency" val1={selectedCandidate1.area} val2={selectedCandidate2.area} />
                            <ComparisonRow
                                label="Experience"
                                val1={<p className="text-sm leading-relaxed">{selectedCandidate1.experience}</p>}
                                val2={<p className="text-sm leading-relaxed">{selectedCandidate2.experience}</p>}
                            />
                            <div className="pt-6 mt-6 border-t border-gray-100">
                                <h4 className="font-bold text-gray-900 mb-4">Manifesto Highlights</h4>
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 leading-relaxed italic">
                                        "{selectedCandidate1.manifesto}"
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded-xl text-sm text-gray-600 leading-relaxed italic border-l border-gray-200">
                                        "{selectedCandidate2.manifesto}"
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
