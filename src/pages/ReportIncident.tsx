import { useState } from 'react';
import { AlertTriangle, Send } from 'lucide-react';
import { submitIncidentReport } from '../lib/api';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function ReportIncident() {
    const { language } = useLanguage();
    const t = translations[language].reportIncident;
    const [formData, setFormData] = useState({
        type: '',
        location: '',
        description: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const result = await submitIncidentReport(formData);
        if (result.success) {
            setStatus('success');
            setFormData({ type: '', location: '', description: '' });
        } else {
            setStatus('error');
        }
    };
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-2xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">{t.title}</h1>

                <div className="bg-white/90 p-8 rounded-2xl shadow-xl border border-red-100">
                    <div className="flex items-center gap-4 mb-6 bg-red-50 p-4 rounded-xl border border-red-200">
                        <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                        <p className="text-red-800 text-sm">
                            {t.desc}
                        </p>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.type.label}</label>
                            <select
                                required
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                            >
                                <option value="">{t.form.type.placeholder}</option>
                                <option value="Violence / Harassment">{t.form.type.options[0]}</option>
                                <option value="Vote Buying / Bribery">{t.form.type.options[1]}</option>
                                <option value="Fake News / Misinformation">{t.form.type.options[2]}</option>
                                <option value="Polling Station Irregularity">{t.form.type.options[3]}</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.location.label}</label>
                            <input
                                type="text"
                                required
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none"
                                placeholder={t.form.location.placeholder}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.description.label}</label>
                            <textarea
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none h-32"
                                placeholder={t.form.description.placeholder}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">{t.form.evidence.label}</label>
                            <input type="file" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-red-500 outline-none text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100" />
                        </div>

                        {status === 'success' && (
                            <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                                {t.form.success}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="w-full bg-red-600 text-white font-bold py-3 rounded-lg hover:bg-red-700 transition-colors shadow-md mt-4 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {status === 'loading' ? t.form.submitting : (
                                <>
                                    <Send className="w-4 h-4" />
                                    {t.form.submit}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
