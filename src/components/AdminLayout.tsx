import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    Vote,
    MapPin,
    Calendar,
    ShieldAlert,
    Brain,
    LogOut,
    Menu,
    X,
    FileText,
    AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const navigation = [
        { name: 'Dashboard', href: '/adm', icon: LayoutDashboard },
        { name: 'Users', href: '/adm/users', icon: Users },
        { name: 'Candidates', href: '/adm/candidates', icon: Vote },
        { name: 'Vote Centers', href: '/adm/centers', icon: MapPin },
        { name: 'Updates', href: '/adm/updates', icon: Calendar },
        { name: 'Content', href: '/adm/content', icon: FileText },
        { name: 'Reports', href: '/adm/incidents', icon: AlertCircle },
        { name: 'Rumor Check', href: '/adm/rumors', icon: ShieldAlert },
        { name: 'Train AI', href: '/adm/train-ai', icon: Brain },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden lg:flex flex-col w-72 bg-white border-r border-gray-100 fixed h-full z-30">
                <div className="p-5 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-200 text-sm">
                            AB
                        </div>
                        <div>
                            <h1 className="font-bold text-lg text-gray-900 leading-none tracking-tight">Admin Panel</h1>
                            <p className="text-[11px] text-gray-400 mt-1 font-medium">Amar Ballot System</p>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 pb-3 space-y-0.5 overflow-y-auto">
                    <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">Menu</p>
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.href}
                            end={item.href === '/adm'}
                            className={({ isActive }) => `
                                    flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 group relative
                                    ${isActive
                                    ? 'bg-indigo-50 text-indigo-700 font-medium'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }
                                `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-gray-400 group-hover:text-gray-500'}`} />
                                    <span className="text-sm">{item.name}</span>
                                    {isActive && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-indigo-500" />}
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-3 mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 w-full text-left text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all text-sm group"
                    >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Mobile Header & Overlay */}
            <div className="lg:hidden fixed top-0 left-0 right-0 bg-white text-gray-900 z-40 p-4 flex items-center justify-between border-b border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md shadow-indigo-200">AB</div>
                    <span className="font-bold text-lg font-serif">Admin Panel</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-30 bg-white pt-20 px-4 overflow-y-auto">
                    <nav className="space-y-1">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={({ isActive }) => `
                                    flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all
                                    ${isActive
                                        ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                                        : 'text-gray-600 hover:bg-gray-50 font-medium'}
                                `}
                            >
                                <item.icon className={`w-5 h-5 ${item.href === location.pathname ? 'text-indigo-600' : 'text-gray-400'}`} />
                                <span className="text-base">{item.name}</span>
                            </NavLink>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-4 py-3.5 w-full text-left text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors mt-6 font-medium border-t border-gray-100 pt-6"
                        >
                            <LogOut className="w-5 h-5" />
                            <span>Sign Out</span>
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 min-h-screen">
                <div className="p-4 lg:p-8 pt-20 lg:pt-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
