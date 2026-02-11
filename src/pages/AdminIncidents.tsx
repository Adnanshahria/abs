import { useEffect, useState } from 'react';
import { db } from '../lib/db';
import { AlertTriangle, MapPin, Calendar, Clock, CheckCircle, Trash2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

interface Incident {
    id: number;
    type: string;
    location: string;
    description: string;
    status: string;
    created_at: string;
}

export default function AdminIncidents() {
    const { language } = useLanguage();
    const t = translations[language].admin.incidents;
    const common = translations[language].common;

    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchIncidents();
    }, []);

    const fetchIncidents = async () => {
        setLoading(true);
        try {
            // Check if table exists first to avoid crash if not migrated
            try {
                // Ensure db is ready before querying (basic check logic if needed, but here just try-catch)
                const result = await db.execute('SELECT * FROM incidents ORDER BY created_at DESC');
                setIncidents(result.map((row: any) => ({
                    id: row.id,
                    type: row.type,
                    location: row.location,
                    description: row.description,
                    status: row.status,
                    created_at: row.created_at
                })));
            } catch (e) {
                console.error("Table incidents likely missing or query failed", e);
            }
        } catch (error) {
            console.error("Error loading incidents:", error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            });
        } catch {
            return 'Date N/A';
        }
    };

    const formatTime = (dateString: string) => {
        try {
            return new Date(dateString).toLocaleTimeString(language === 'bn' ? 'bn-BD' : 'en-US', {
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'Time N/A';
        }
    };

    if (loading) return <div className="p-8 text-center">{t.loading}</div>;

    return (
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <AlertTriangle className="text-red-600" />
                {t.title}
            </h1>

            {incidents.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center text-gray-500">
                    {t.empty}
                </div>
            ) : (
                <div className="grid gap-4">
                    {incidents.map((incident) => (
                        <div key={incident.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-l-red-500 hover:shadow-md transition-shadow">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wide rounded-full mb-2">
                                        {incident.type}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-gray-400" />
                                        {incident.location}
                                    </h3>
                                </div>
                                <div className="text-right text-xs text-gray-500 flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {formatDate(incident.created_at)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatTime(incident.created_at)}
                                    </span>
                                </div>
                            </div>
                            <p className="text-gray-700 bg-gray-50 p-4 rounded-lg text-sm mb-4">
                                {incident.description}
                            </p>
                            <div className="flex gap-4 border-t border-gray-100 pt-3">
                                <button className="text-xs font-medium text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors">
                                    <CheckCircle className="w-3.5 h-3.5" />
                                    {t.actions.resolve}
                                </button>
                                <button className="text-xs font-medium text-red-600 hover:text-red-800 flex items-center gap-1 transition-colors">
                                    <Trash2 className="w-3.5 h-3.5" />
                                    {t.actions.delete}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
