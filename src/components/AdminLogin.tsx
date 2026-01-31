import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Shield, Lock, AlertCircle, X, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const result = await login({ email, password });

        if (result.success) {
            // Check if user is actually admin
            if (result.user.role !== 'admin') {
                setError('Access Denied. Admin privileges required.');
                setLoading(false);
                return;
            }
            // Success - Route protection will handle the rest (re-render)
        } else {
            setError(result.message || 'Verification failed');
        }
        setLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Blurred Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-500" />

            {/* Modal Card */}
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden animate-in zoom-in-95 duration-300 border border-red-100">

                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                    <div className="relative z-10 flex flex-col items-center">
                        <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-3 backdrop-blur-sm border border-white/20">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white font-serif">Admin Verification</h2>
                        <p className="text-red-100 text-sm mt-1">Restricted Access Area</p>
                    </div>

                    {/* Close Button (Redirects to Home) */}
                    <button
                        onClick={() => navigate('/')}
                        className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-8">
                    {error && (
                        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm flex items-start gap-2 border border-red-100">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Admin Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium text-gray-900"
                                placeholder=""
                                autoFocus
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 ml-1">Secure Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/10 outline-none transition-all font-medium text-gray-900 pl-11 pr-12"
                                    placeholder=""
                                />
                                <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-red-600/20 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                'Verify Identity'
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400">
                            Unauthorized access attempts are logged.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
