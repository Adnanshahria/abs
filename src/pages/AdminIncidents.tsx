import { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { AlertTriangle, MapPin, Calendar, Clock } from 'lucide-react';

interface Incident {
    id: number;
    type: string;
    location: string;
    description: string;
    status: string;
    created_at: string;
}

export default function AdminIncidents() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                // Check if table exists first to avoid crash if not migrated
                try {
                    const result = await db.execute('SELECT * FROM incidents ORDER BY created_at DESC');
                    setIncidents(result.rows.map((row: any) => ({
                        id: row.id,
                        type: row.type,
                        location: row.location,
                        description: row.description,
                        status: row.status,
                        created_at: row.created_at
                    })));
                } catch (e) {
                    console.error("Table incidents likely missing", e);
                }
            } catch (error) {
                console.error("Error loading incidents:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchIncidents();
    }, []);

    if (loading) return <div className="p-8 text-center">Loading incidents...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-red-600" />
                Incident Reports
            </h1>

            {incidents.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                    No incidents reported yet.
                </div>
            ) : (
                <div className="grid gap-4">
                    {incidents.map((incident) => (
                        <div key={incident.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wide rounded-full mb-2">
                                        {incident.type}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {incident.location}
                                    </h3>
                                </div>
                                <div className="text-right text-xs text-gray-500 flex flex-col items-end">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(incident.created_at).toLocaleDateString()}
                                    </span>
                                    <span className="flex items-center gap-1 mt-1">
                                        <Clock className="w-3 h-3" />
                                        {new Date(incident.created_at).toLocaleTimeString()}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg text-sm">
                                {incident.description}
                            </p>
                            <div className="mt-4 flex gap-2">
                                <button className="text-xs text-blue-600 hover:underline">Mark as Resolved</button>
                                <span className="text-gray-300">|</span>
                                <button className="text-xs text-red-600 hover:underline">Delete Report</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
