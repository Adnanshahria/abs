import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import { Users, Vote, MapPin, Calendar, ShieldAlert, Database, RefreshCw, Brain } from 'lucide-react';
import { getDashboardStats } from '../lib/api';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];
    const [stats, setStats] = useState({ users: 0, candidates: 0, centers: 0 });

    useEffect(() => {
        const fetchStats = async () => {
            const result = await getDashboardStats();
            if (result?.success) {
                setStats(result.stats);
            }
        };
        fetchStats();
    }, []);

    return (
        <div>
            <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{t.admin.title}</h1>
                        <p className="text-gray-600 mt-1">{t.admin.welcome}, {user?.name}</p>
                    </div>
                    <button
                        onClick={async () => {
                            const { fixDatabaseSchema } = await import('../lib/api');
                            const result = await fixDatabaseSchema();
                            if (result.success) alert(result.message);
                            else alert("Update failed: " + JSON.stringify(result.error));
                        }}
                        className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded"
                    >
                        {t.admin.fixSchema}
                    </button>
                </div>

                {/* AI Cache Management */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                <Database className="w-5 h-5 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-800">AI Knowledge Cache</h3>
                                <p className="text-xs text-gray-500">Updates, Rumors, and Trained AI Data</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={async () => {
                                    const { forceRefreshCache } = await import('../services/aiService');
                                    await forceRefreshCache();
                                    alert('✅ Cache refreshed! New data loaded from database.');
                                }}
                                className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                            >
                                <RefreshCw className="w-4 h-4" />
                                Force Refresh
                            </button>
                            <button
                                onClick={async () => {
                                    const { forceRefreshCache } = await import('../services/aiService');
                                    await forceRefreshCache();
                                    alert('✅ Cache setup complete! AI is ready with latest data.');
                                }}
                                className="flex items-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                            >
                                <Database className="w-4 h-4" />
                                Setup Cache
                            </button>
                            <button
                                onClick={() => navigate('/adm/train-ai')}
                                className="flex items-center gap-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
                            >
                                <Brain className="w-4 h-4" />
                                Add Knowledge
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Users Card */}
                <div
                    onClick={() => navigate('/adm/users')}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-blue-600 transition-colors">{t.admin.cards.users}</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.users}</h3>
                    </div>
                    <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        <Users className="w-7 h-7 text-blue-600 group-hover:text-white" />
                    </div>
                </div>

                {/* Candidates Card */}
                <div
                    onClick={() => navigate('/adm/candidates')}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-green-600 transition-colors">{t.admin.cards.candidates}</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.candidates}</h3>
                    </div>
                    <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                        <Vote className="w-7 h-7 text-green-600 group-hover:text-white" />
                    </div>
                </div>

                {/* Centers Card */}
                <div
                    onClick={() => navigate('/adm/centers')}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-purple-600 transition-colors">{t.admin.cards.centers}</p>
                        <h3 className="text-3xl font-bold text-gray-900">{stats.centers}</h3>
                    </div>
                    <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                        <MapPin className="w-7 h-7 text-purple-600 group-hover:text-white" />
                    </div>
                </div>

                {/* Updates Card */}
                <div
                    onClick={() => navigate('/adm/updates')}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-amber-600 transition-colors">{t.admin.cards.updates}</p>
                        <h3 className="text-xl font-bold text-gray-900">{t.admin.cardSubtitles.manageNews}</h3>
                    </div>
                    <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all duration-300">
                        <Calendar className="w-7 h-7 text-amber-600 group-hover:text-white" />
                    </div>
                </div>

                {/* Rumors Card */}
                <div
                    onClick={() => navigate('/adm/rumors')}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-red-600 transition-colors">{t.admin.cards.rumors}</p>
                        <h3 className="text-xl font-bold text-gray-900">{t.admin.cardSubtitles.factChecks}</h3>
                    </div>
                    <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                        <ShieldAlert className="w-7 h-7 text-red-600 group-hover:text-white" />
                    </div>
                </div>

                {/* Incidents Card */}
                <div
                    onClick={() => navigate('/adm/incidents')}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer group"
                >
                    <div>
                        <p className="text-sm font-medium text-gray-500 mb-1 group-hover:text-orange-600 transition-colors">{t.admin.cards.incidents}</p>
                        <h3 className="text-xl font-bold text-gray-900">{t.admin.cardSubtitles.safety}</h3>
                    </div>
                    <div className="w-14 h-14 bg-orange-50 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                        <ShieldAlert className="w-7 h-7 text-orange-600 group-hover:text-white" />
                    </div>
                </div>
            </div>
        </div>
    );
}
