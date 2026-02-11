import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, MapPin, Newspaper, Shield, Vote, UserCheck, CheckCircle, ArrowRight } from 'lucide-react';

import { checkUserVoteStatus } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { language } = useLanguage();
    const t = translations[language];
    const [hasVoted, setHasVoted] = useState(false);

    useEffect(() => {
        if (user) {
            checkUserVoteStatus(user.id).then(res => {
                if (res.success) setHasVoted(res.hasVoted);
            });
        }
    }, [user]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const userName = (user as any)?.name || 'Adnan Shahria';
    const currentTime = new Date();
    const hour = currentTime.getHours();

    let greeting = t.dashboard.greetings.morning;
    if (hour >= 12 && hour < 17) greeting = t.dashboard.greetings.afternoon;
    else if (hour >= 17) greeting = t.dashboard.greetings.evening;

    // Verify Redirect
    useEffect(() => {
        if (user && (user as any).verification_status !== 'verified') {
            navigate('/verify-nid');
        }
    }, [user, navigate]);

    // Countdown Logic
    const electionDate = new Date('2026-02-12T08:00:00');
    const timeLeft = electionDate.getTime() - currentTime.getTime();
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 py-6 mb-20 md:mb-0">
            <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6 animate-in fade-in duration-500">

                {/* Header Section */}
                <div className="flex flex-row justify-between items-center gap-4">
                    <div>
                        <p className="text-xs sm:text-sm text-green-600 font-medium mb-0.5">{greeting},</p>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-serif text-green-900 font-bold truncate max-w-[200px] sm:max-w-none">{userName}</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-red-500 hover:bg-red-50 border border-red-100 px-3 py-1.5 sm:px-3 sm:py-1.5 rounded-lg transition-all flex items-center gap-2 font-medium text-xs sm:text-sm"
                    >
                        <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        <span className="hidden sm:inline">{t.dashboard.logout}</span>
                        <span className="sm:hidden">{t.dashboard.logout}</span>
                    </button>
                </div>

                {/* Hero Section: Digital ID & Status */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">

                    {/* Left: Digital Voter ID */}
                    <div className="lg:col-span-2">
                        <div className="relative overflow-hidden bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-0.5 shadow-xl text-white h-full">
                            {/* Card Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>

                            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 sm:p-4 h-full border border-white/20 flex flex-col sm:flex-row gap-3 sm:gap-5 relative z-10">
                                {/* Photo Area */}
                                <div className="flex-shrink-0 flex flex-col items-center sm:items-start">
                                    <div className="w-16 h-16 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-gray-200 rounded-lg border-2 border-white/30 shadow-inner flex items-center justify-center overflow-hidden">
                                        <div className="text-center">
                                            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-300 rounded-full mx-auto mb-2 flex items-center justify-center">
                                                <span className="text-xl sm:text-3xl">👤</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 text-center w-full">
                                        <span className="inline-block px-2 py-0.5 bg-green-500/80 text-[10px] font-bold rounded-full uppercase tracking-wider border border-white/20">
                                            {t.dashboard.activeVoter}
                                        </span>
                                    </div>
                                </div>

                                {/* Details Area */}
                                <div className="flex-1 space-y-2 sm:space-y-3 text-center sm:text-left">
                                    <div className="flex justify-between items-start">
                                        <div className="w-full sm:w-auto">
                                            <h3 className="text-green-100 text-[9px] sm:text-[10px] uppercase tracking-widest mb-0.5">{t.dashboard.nidCard}</h3>
                                            <h2 className="text-lg sm:text-xl font-bold font-serif">{userName}</h2>
                                        </div>
                                        <img src="/logo.png" alt="BD" className="w-6 h-6 sm:w-7 sm:h-7 opacity-80 hidden sm:block" onError={(e) => e.currentTarget.style.display = 'none'} />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-3 text-sm bg-black/10 sm:bg-transparent rounded-lg p-2.5 sm:p-0">
                                        <div className="flex justify-between sm:block border-b sm:border-0 border-white/10 pb-1 sm:pb-0">
                                            <p className="text-green-200 text-[10px] sm:text-xs sm:mb-0.5">{t.dashboard.profile.nid}</p>
                                            <p className="font-mono text-sm sm:text-base font-medium tracking-wide">{(user as any)?.nid_number || '1993 2847 3290'}</p>
                                        </div>
                                        <div className="flex justify-between sm:block border-b sm:border-0 border-white/10 pb-1 sm:pb-0">
                                            <p className="text-green-200 text-[10px] sm:text-xs sm:mb-0.5">{t.dashboard.profile.dob}</p>
                                            <p className="font-medium text-sm sm:text-base">{(user as any)?.date_of_birth || '12 Oct 1995'}</p>
                                        </div>
                                        <div className="flex justify-between sm:block border-b sm:border-0 border-white/10 pb-1 sm:pb-0">
                                            <p className="text-green-200 text-[10px] sm:text-xs sm:mb-0.5">{t.dashboard.profile.district}</p>
                                            <p className="font-medium text-sm sm:text-base">{(user as any)?.district || 'Dhaka'}</p>
                                        </div>
                                        <div className="flex justify-between sm:block">
                                            <p className="text-green-200 text-[10px] sm:text-xs sm:mb-0.5">{t.dashboard.profile.area}</p>
                                            <p className="font-medium text-sm sm:text-base">{(user as any)?.voter_area || 'Dhanmondi'}</p>
                                        </div>
                                    </div>

                                    <div className="pt-2 sm:pt-3 border-t border-white/10 flex items-center justify-center sm:justify-start gap-1.5 text-[10px] sm:text-xs text-green-100">
                                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-300" />
                                        <span>{t.dashboard.biometricVerified}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Election Countdown & Status */}
                    <div className="space-y-3 sm:space-y-4">
                        {/* Countdown Card */}
                        <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-sm border border-green-100">
                            <h3 className="text-gray-500 text-[10px] sm:text-xs font-medium uppercase tracking-wider mb-2 sm:mb-3 text-center sm:text-left">{t.dashboard.nextElection}</h3>
                            <div className="flex justify-between text-center max-w-[240px] mx-auto sm:max-w-none">
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-green-700">{days}</div>
                                    <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase mt-0.5">{t.dashboard.timeUnits.days}</div>
                                </div>
                                <div className="text-lg sm:text-xl text-gray-300 font-light pt-0.5">:</div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-green-700">{hours}</div>
                                    <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase mt-0.5">{t.dashboard.timeUnits.hours}</div>
                                </div>
                                <div className="text-lg sm:text-xl text-gray-300 font-light pt-0.5">:</div>
                                <div>
                                    <div className="text-xl sm:text-2xl font-bold text-green-700">{minutes}</div>
                                    <div className="text-[9px] sm:text-[10px] text-gray-500 uppercase mt-0.5">{t.dashboard.timeUnits.mins}</div>
                                </div>
                            </div>
                            <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 text-center">
                                <p className="text-xs sm:text-sm font-medium text-gray-800">{t.dashboard.electionName}</p>
                                <p className="text-[9px] sm:text-[10px] text-gray-500">{t.dashboard.electionDate}</p>
                            </div>
                        </div>

                        {/* Status Mini Card */}
                        <div className="bg-green-50 rounded-2xl p-3 sm:p-4 border border-green-100 flex items-center gap-3 sm:gap-4">
                            <div className="bg-white p-2 sm:p-2.5 rounded-full shadow-sm">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                            </div>
                            <div>
                                <p className="text-[10px] sm:text-xs text-gray-600">{t.dashboard.eligibility}</p>
                                <p className="text-sm sm:text-base text-green-700 font-bold">{t.dashboard.passed}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Section: Vote Now or View Results */}
                {!hasVoted ? (
                    <div className="bg-gradient-to-r from-green-700 to-green-600 rounded-2xl p-4 md:p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01]" onClick={() => navigate('/cast-vote')}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-xl md:text-2xl font-bold font-serif mb-1 md:mb-2 flex items-center justify-center md:justify-start gap-2 md:gap-3">
                                    <Vote className="w-6 h-6 md:w-7 md:h-7 animate-pulse text-green-200" />
                                    {t.dashboard.voteNow.title}
                                </h2>
                                <p className="text-green-100 text-sm md:text-base max-w-xl">
                                    {t.dashboard.voteNow.desc}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="bg-white text-green-800 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-xl shadow-lg hover:bg-green-50 transition-colors flex items-center gap-2 text-sm sm:text-base">
                                    {t.dashboard.voteNow.btn}
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="bg-gradient-to-r from-blue-700 to-blue-600 rounded-2xl p-4 md:p-6 text-white shadow-lg relative overflow-hidden group cursor-pointer transition-all hover:shadow-xl hover:scale-[1.01]" onClick={() => navigate('/candidate-list')}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 pointer-events-none transition-transform group-hover:scale-110"></div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
                            <div className="text-center md:text-left">
                                <h2 className="text-xl md:text-2xl font-bold font-serif mb-1 md:mb-2 flex items-center justify-center md:justify-start gap-2 md:gap-3">
                                    <CheckCircle className="w-6 h-6 md:w-7 md:h-7 text-blue-200" />
                                    {t.dashboard.voted.title}
                                </h2>
                                <p className="text-blue-100 text-sm md:text-base max-w-xl">
                                    {t.dashboard.voted.desc}
                                </p>
                            </div>
                            <div className="flex-shrink-0">
                                <button className="bg-white text-blue-800 font-bold py-2 px-6 sm:py-3 sm:px-8 rounded-xl shadow-lg hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm sm:text-base">
                                    {t.dashboard.voted.btn}
                                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Actions Bento Grid */}
                <div>
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 sm:mb-3 font-serif">{t.dashboard.quickActions.title}</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">


                        <button onClick={() => navigate('/vote-center')} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-blue-50 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-transform">
                                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-gray-800">{t.dashboard.quickActions.voteCenter.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-0.5">{t.dashboard.quickActions.voteCenter.desc}</p>
                        </button>

                        <button onClick={() => navigate('/candidate-list')} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-purple-50 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-transform">
                                <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-gray-800">{t.dashboard.quickActions.candidates.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-0.5">{t.dashboard.quickActions.candidates.desc}</p>
                        </button>

                        <button onClick={() => navigate('/video-tutorials')} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-orange-50 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-transform">
                                <Vote className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600" />
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-gray-800">{t.dashboard.quickActions.howToVote.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-0.5">{t.dashboard.quickActions.howToVote.desc}</p>
                        </button>

                        <button onClick={() => navigate('/election-updates')} className="bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-green-50 hover:border-green-300 hover:shadow-md transition-all group text-left flex flex-col items-center sm:items-start text-center sm:text-left">
                            <div className="bg-red-50 w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center mb-2 sm:mb-2.5 group-hover:scale-110 transition-transform">
                                <Newspaper className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-gray-800">{t.dashboard.quickActions.news.title}</h4>
                            <p className="text-[10px] text-gray-500 mt-0.5">{t.dashboard.quickActions.news.desc}</p>
                        </button>

                    </div>
                </div>

                {/* Recent Activity */}
                {/* Recent Activity Removed */}{/* Space Saver */}

            </div>
        </main>
    );
}
