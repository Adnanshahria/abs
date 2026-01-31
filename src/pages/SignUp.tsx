import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Modal from '../components/Modal';

export default function SignUp() {
    const navigate = useNavigate();
    const { login, register } = useAuth();
    const [isLogin, setIsLogin] = useState(false); // Toggle between Login and Signup

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    // Modal State
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info' as 'success' | 'error' | 'info'
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!formData.email || !formData.password) {
            setModal({
                isOpen: true,
                title: 'Missing Information',
                message: 'Please fill in all required fields.',
                type: 'error'
            });
            return;
        }

        if (isLogin) {
            const result = await login({ email: formData.email, password: formData.password });
            if (result.success) {
                navigate('/dashboard');
            } else {
                setModal({
                    isOpen: true,
                    title: 'Login Failed',
                    message: result.message || "Please check your credentials.",
                    type: 'error'
                });
            }
        } else {
            if (formData.password !== formData.confirmPassword) {
                setModal({
                    isOpen: true,
                    title: 'Password Mismatch',
                    message: 'Passwords do not match!',
                    type: 'error'
                });
                return;
            }
            if (!formData.name) {
                setModal({
                    isOpen: true,
                    title: 'Name Required',
                    message: 'Please enter your full name.',
                    type: 'error'
                });
                return;
            }

            const result = await register({
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone
            });

            if (result.success) {
                setModal({
                    isOpen: true,
                    title: 'Registration Successful',
                    message: 'Welcome properly! Please login to continue.',
                    type: 'success'
                });
                setIsLogin(true); // Switch to login mode
                setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
            } else {
                setModal({
                    isOpen: true,
                    title: 'Registration Failed',
                    message: 'Something went wrong. Please try again.',
                    type: 'error'
                });
            }
        }
    };

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-center min-h-[80vh]">

            <div className="w-full max-w-md flex flex-col items-center gap-6 relative z-10 animate-in fade-in zoom-in duration-500">

                {/* Title */}
                <h1 className="text-4xl text-green-900 font-serif font-medium text-center mb-2">
                    {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-green-700 text-center mb-4">
                    {isLogin ? 'Login to access your voting dashboard' : 'Sign up to become a responsible voter'}
                </p>

                {/* Toggle Switch - Pill Design */}
                <div className="flex bg-green-100/80 p-1.5 rounded-full w-full max-w-xs mb-6 relative shadow-inner">
                    <div
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-[#00a642] rounded-full transition-all duration-300 shadow-md ${isLogin ? 'left-1.5' : 'left-[calc(50%+3px)]'}`}
                    ></div>
                    <button
                        onClick={() => setIsLogin(true)}
                        className={`flex-1 text-center py-2 relative z-10 font-bold text-lg transition-colors font-serif ${isLogin ? 'text-white' : 'text-green-800'}`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setIsLogin(false)}
                        className={`flex-1 text-center py-2 relative z-10 font-bold text-lg transition-colors font-serif ${!isLogin ? 'text-white' : 'text-green-800'}`}
                    >
                        Sign Up
                    </button>
                </div>

                {/* Form Fields - Restored 'Previous' Style */}
                <div className="w-full space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg rounded-t-md"
                        />
                    )}

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg ${isLogin ? 'rounded-t-md' : ''}`}
                    />

                    {!isLogin && (
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number (Optional)"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg"
                        />
                    )}

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`w-full bg-green-50/80 border-b-2 border-green-400 px-12 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg ${isLogin ? 'rounded-b-md' : ''}`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700/50 hover:text-green-800"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    {!isLogin && (
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full bg-green-50/80 border-b-2 border-green-400 px-4 py-3 text-center text-green-800 placeholder-green-700/50 focus:outline-none focus:border-green-600 focus:bg-white transition-colors text-lg rounded-b-md"
                        />
                    )}
                </div>

                {/* Additional Links */}
                {isLogin && (
                    <div className="w-full text-right">
                        <button className="text-sm text-green-700 hover:text-green-900 font-medium hover:underline">
                            Forgot Password?
                        </button>
                    </div>
                )}

                {/* CTA Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-green-800 hover:bg-green-900 text-white font-serif text-xl py-3 rounded-full shadow-lg transition-transform active:scale-95 mt-4 border border-green-700 flex items-center justify-center gap-2"
                >
                    {isLogin ? 'Login' : 'Create Account'}
                </button>
            </div>

            <Modal
                isOpen={modal.isOpen}
                onClose={() => setModal({ ...modal, isOpen: false })}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
        </main>
    );
}
