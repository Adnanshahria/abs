import { useState } from 'react';
import { Heart, Users, CalendarCheck } from 'lucide-react';
import { submitVolunteerSignup } from '../lib/api';

export default function Volunteer() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        role: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const result = await submitVolunteerSignup(formData);
        if (result.success) {
            setStatus('success');
            setFormData({ name: '', email: '', phone: '', role: '' });
        } else {
            setStatus('error');
        }
    };
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Join the Movement</h1>

                <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-green-100">
                    <div className="text-center mb-8">
                        <Heart className="w-16 h-16 text-red-500 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-gray-800">Become a Volunteer</h2>
                        <p className="text-gray-600 mt-2">Help us ensure a fair and transparent election process.</p>
                    </div>

                    <form className="space-y-4 max-w-lg mx-auto" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="Enter your name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                            <input
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="+880..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email (Optional)</label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Area of Interest</label>
                            <select
                                required
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-500 outline-none"
                            >
                                <option value="">Select Role...</option>
                                <option>Polling Station Support</option>
                                <option>Voter Education</option>
                                <option>Social Media Campaign</option>
                            </select>
                        </div>

                        {status === 'success' && (
                            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                                Signup successful! We will contact you soon.
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md mt-4 disabled:opacity-50"
                        >
                            {status === 'loading' ? 'Signing Up...' : 'Sign Up to Volunteer'}
                        </button>
                    </form>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-gray-100">
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                            <Users className="w-8 h-8 text-green-600" />
                            <div>
                                <div className="font-bold text-green-900">500+</div>
                                <div className="text-sm text-green-700">Active Volunteers</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                            <CalendarCheck className="w-8 h-8 text-green-600" />
                            <div>
                                <div className="font-bold text-green-900">20+</div>
                                <div className="text-sm text-green-700">Training Sessions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
