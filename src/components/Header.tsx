import { Bell, Globe, LogIn, Menu, X, User, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { translations } from '../data/translations';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { getUpdates, getRumors, getUnreadNotificationCount, type ElectionUpdate, type Rumor } from '../lib/api';


export default function Header() {
    const { language, toggleLanguage } = useLanguage();
    const t = translations[language]; // Direct access to translations
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn } = useAuth(); // Use global auth state
    const location = useLocation();
    const navigate = useNavigate();

    // Notification state
    const [showNotifications, setShowNotifications] = useState(false);
    const [notifications, setNotifications] = useState<(ElectionUpdate | Rumor)[]>([]);
    const [loadingNotifications, setLoadingNotifications] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    // Fetch notifications when modal opens
    useEffect(() => {
        if (showNotifications) {
            fetchNotifications();
        }
    }, [showNotifications]);

    // Initial unread count (Optimized)
    useEffect(() => {
        const fetchUnreadCount = async () => {
            try {
                // Use optimized count query instead of fetching all data
                const count = await getUnreadNotificationCount(7);
                setUnreadCount(count);
            } catch (error) {
                console.error('Failed to fetch unread count:', error);
            }
        };
        fetchUnreadCount();
    }, []);

    const fetchNotifications = async () => {
        setLoadingNotifications(true);
        try {
            // Fetch only latest 10 items from each source
            const [updates, rumors] = await Promise.all([
                getUpdates(10),
                getRumors(undefined, 10)
            ]);

            // Combine and sort by date (newest first)
            const combined = [...updates.map(u => ({ ...u, _type: 'update' })), ...rumors.map(r => ({ ...r, _type: 'rumor' }))]
                .sort((a, b) => new Date(b.published_at || '').getTime() - new Date(a.published_at || '').getTime())
                .slice(0, 10); // Ensure we only keep top 10 total

            setNotifications(combined as (ElectionUpdate | Rumor)[]);
        } catch (error) {
            console.error('Failed to fetch notifications:', error);
        } finally {
            setLoadingNotifications(false);
        }
    };

    const formatDate = (dateStr: string | undefined) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('bn-BD', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // Define navigation items with translations
    const navItems = [
        { key: 'home', path: '/', label: t.nav.home, icon: '🏠' },
        { key: 'about', path: '/about', label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us' },
        { key: 'services', path: '/services', label: language === 'bn' ? 'সেবা সমূহ' : 'Services' },
        { key: 'contact', path: '/contact', label: language === 'bn' ? 'যোগাযোগ' : 'Contact Us' }
    ];

    const handleAccountClick = () => {
        if (isLoggedIn) {
            navigate('/dashboard');
        } else {
            navigate('/sign-up');
        }
    };

    return (
        <header className="sticky top-0 z-50 px-2 pt-1">
            {/* Header Container with boxy shape */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-sm rounded-lg border border-green-200">
                <div className="w-full px-2 sm:px-4 lg:px-6">
                    <div className="flex justify-between items-center h-10 md:h-11">
                        {/* Logo - Smaller */}
                        <Link to="/" className="flex items-center gap-1 bg-white px-2 py-1 rounded-md border border-gray-200 shadow-sm hover:scale-105 transition-transform">
                            <img src={logoImg} alt="Amar Ballot" className="h-5 md:h-6 w-auto" />
                            <span className="font-bold text-xs md:text-sm text-green-700 italic">Amar Ballot</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-1.5">
                            {navItems.map((item) => {
                                const isActive = location.pathname === item.path;
                                return (
                                    <Link
                                        key={item.key}
                                        to={item.path}
                                        className={`text-gray-700 hover:text-green-700 hover:bg-green-50 text-sm font-medium transition-all px-2.5 py-1 rounded-md flex items-center gap-1 bg-white border border-gray-200 ${isActive ? 'text-green-700 ring-1 ring-green-200' : ''}`}
                                    >
                                        {item.icon && <span className="text-xs">{item.icon}</span>}
                                        {item.label}
                                    </Link>
                                )
                            })}
                        </nav>

                        {/* Right Actions */}
                        <div className="hidden md:flex items-center gap-2">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-1 text-gray-600 hover:text-green-600 transition-colors bg-white px-2 py-1 rounded-md border border-gray-200 text-xs"
                            >
                                <Globe className="h-3 w-3" />
                                <span className="font-medium uppercase">{language}</span>
                            </button>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative text-gray-600 hover:text-green-600 transition-colors bg-white p-1.5 rounded-md border border-gray-200"
                            >
                                <Bell className="h-4 w-4" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[9px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Account Button */}
                            <button
                                onClick={handleAccountClick}
                                className="flex items-center gap-1.5 bg-green-600 text-white px-3 py-1.5 rounded-md hover:bg-green-700 transition-colors text-sm"
                            >
                                {isLoggedIn ? <User className="h-3.5 w-3.5" /> : <LogIn className="h-3.5 w-3.5" />}
                                <span className="font-medium">Account</span>
                            </button>
                        </div>

                        {/* Mobile Actions - Visible on mobile */}
                        <div className="flex md:hidden items-center gap-2">
                            <button
                                onClick={toggleLanguage}
                                className="flex items-center gap-1 text-gray-600 bg-white px-2 py-1 rounded-lg border border-gray-200 shadow-sm text-xs"
                            >
                                <Globe className="h-3 w-3" />
                                <span className="font-medium uppercase">{language}</span>
                            </button>
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative text-gray-600 bg-white p-1.5 rounded-lg border border-gray-200 shadow-sm"
                            >
                                <Bell className="h-4 w-4" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-green-600 text-white text-[10px] rounded-full h-3.5 w-3.5 flex items-center justify-center">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>
                            <button
                                className="text-gray-600 bg-white p-1.5 rounded-lg border border-gray-200"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden pb-3">
                            <nav className="flex flex-col gap-1.5">
                                {navItems.map((link) => (
                                    <Link
                                        key={link.key}
                                        to={link.path}
                                        className="text-gray-700 hover:text-green-600 font-medium py-2 px-3 rounded-lg hover:bg-green-100 transition-colors bg-white border border-gray-200 text-sm"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.label}
                                    </Link>
                                ))}

                                {/* Mobile Account Button */}
                                <button
                                    onClick={() => { handleAccountClick(); setIsMenuOpen(false); }}
                                    className="flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors mt-1 text-sm"
                                >
                                    {isLoggedIn ? <User className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
                                    <span className="font-medium">Account</span>
                                </button>
                            </nav>
                        </div>
                    )}
                </div>
            </div>

            {/* Notification Modal with Blur Backdrop */}
            {showNotifications && (
                <>
                    {/* Blur Backdrop */}
                    <div
                        className="fixed inset-0 z-40 backdrop-blur-sm bg-black/20"
                        onClick={() => setShowNotifications(false)}
                    />

                    {/* Modal */}
                    <div className="fixed top-14 right-4 md:right-20 z-50 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-green-50 to-white">
                            <h3 className="font-semibold text-gray-800">
                                {language === 'bn' ? 'বিজ্ঞপ্তি' : 'Notifications'}
                            </h3>
                            <button
                                onClick={() => setShowNotifications(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="max-h-80 overflow-y-auto scrollbar-thin">
                            {loadingNotifications ? (
                                <div className="flex flex-col items-center justify-center py-8">
                                    <Loader2 className="h-6 w-6 text-green-600 animate-spin" />
                                    <p className="text-gray-500 text-sm mt-2">
                                        {language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...'}
                                    </p>
                                </div>
                            ) : notifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                                    <Bell className="h-8 w-8 mb-2" />
                                    <p className="text-sm">
                                        {language === 'bn' ? 'কোনো বিজ্ঞপ্তি নেই' : 'No notifications'}
                                    </p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-50">
                                    {notifications.map((item, index) => {
                                        const isRumor = '_type' in item && (item as any)._type === 'rumor';
                                        return (
                                            <Link
                                                key={`notification-${index}`}
                                                to={isRumor ? '/rumor-check' : '/election-updates'}
                                                onClick={() => setShowNotifications(false)}
                                                className="flex items-start gap-3 px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer"
                                            >
                                                {/* Type Badge */}
                                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm ${isRumor
                                                    ? 'bg-orange-100 text-orange-600'
                                                    : 'bg-blue-100 text-blue-600'
                                                    }`}>
                                                    {isRumor ? '⚠️' : '📢'}
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${isRumor
                                                            ? 'bg-orange-100 text-orange-700'
                                                            : 'bg-blue-100 text-blue-700'
                                                            }`}>
                                                            {isRumor
                                                                ? (language === 'bn' ? 'গুজব' : 'Rumor')
                                                                : (language === 'bn' ? 'আপডেট' : 'Update')
                                                            }
                                                        </span>
                                                        <span className="text-[10px] text-gray-400">
                                                            {formatDate(item.published_at)}
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-800 font-medium truncate mt-0.5">
                                                        {item.title}
                                                    </p>
                                                    {'content' in item && (
                                                        <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">
                                                            {(item as ElectionUpdate).content?.substring(0, 60)}...
                                                        </p>
                                                    )}
                                                </div>
                                            </Link>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                            <Link
                                to="/election-updates"
                                onClick={() => setShowNotifications(false)}
                                className="block text-center text-sm text-green-600 hover:text-green-700 font-medium"
                            >
                                {language === 'bn' ? 'সব দেখুন →' : 'View All →'}
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </header>
    );
}
