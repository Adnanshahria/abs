import { useState, useEffect } from 'react';
import { Calendar, Trophy } from 'lucide-react';
import { getPastElections, type PastElection } from '../lib/api';

export default function PastResults() {
    const [elections, setElections] = useState<PastElection[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const data = await getPastElections();
            setElections(data);
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <main className="flex-1 w-full flex items-center justify-center min-h-[80vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </main>
        );
    }

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-6xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Election Archive</h1>

                <div className="space-y-12">
                    {elections.map((election) => (
                        <div key={election.id} className="bg-white/95 p-6 md:p-8 rounded-2xl shadow-sm border border-green-100">
                            {/* Election Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4 border-b border-gray-100 pb-4">
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h2 className="text-3xl font-bold text-green-800">{election.year}</h2>
                                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                                            {election.turnout_percentage ? `Turnout: ${election.turnout_percentage}%` : 'Turnout: N/A'}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 font-medium">{election.description}</p>
                                    <p className="text-gray-400 text-sm flex items-center gap-2 mt-1">
                                        <Calendar className="w-4 h-4" /> {election.date}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex items-center gap-2 text-green-700 font-semibold bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                                        <Trophy className="w-5 h-5" />
                                        <span>Winner: {election.winner_party}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Seat Distribution Bar */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wider">Seat Distribution</h3>
                                <div className="h-8 w-full bg-gray-100 rounded-full flex overflow-hidden border border-gray-200 shadow-inner">
                                    {election.results.map((result) => (
                                        <div
                                            key={result.party_name}
                                            style={{
                                                width: `${(result.seats_won / election.total_seats) * 100}%`,
                                                backgroundColor: result.color
                                            }}
                                            className="h-full relative group transition-all duration-300 hover:brightness-110"
                                            title={`${result.party_name}: ${result.seats_won} seats`}
                                        >
                                            {/* Tooltip on Hover */}
                                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap z-20">
                                                {result.party_name}: {result.seats_won}
                                            </div>
                                        </div>
                                    ))}
                                    {/* Remaining fill for total seats usually happens, but we sum to 300 usually */}
                                </div>
                            </div>

                            {/* Detailed List */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {election.results.map((result) => (
                                    <div key={result.party_name} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm transition-all">
                                        <div
                                            className="w-3 h-3 rounded-full shrink-0"
                                            style={{ backgroundColor: result.color }}
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-gray-800 truncate">{result.party_name}</p>
                                            <p className="text-xs text-gray-500">{result.seats_won} Seats</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
