import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import SEO from '../components/SEO';
import { submitContactMessage, getPageContent } from '../lib/api';

export default function ContactUs() {
    const { language } = useLanguage();
    const t = translations[language];
    const [content, setContent] = useState<Record<string, { en: string; bn: string }>>({});

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        getPageContent('contact').then(setContent);
    }, []);

    const getContent = (key: string) => {
        if (content[key]) {
            return language === 'bn' ? content[key].bn : content[key].en;
        }
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const result = await submitContactMessage(formData);
        if (result.success) {
            setStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } else {
            setStatus('error');
        }
    };

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-12 relative flex flex-col items-center min-h-[80vh]">
            <SEO
                title={t.contact.title}
                description={t.contact.subtitle}
            />
            <div className="w-full max-w-6xl flex flex-col items-center gap-12 relative z-10">

                {/* Header */}
                <div className="text-center">
                    <h1 className="text-5xl text-green-900 font-serif font-bold mb-4">{t.contact.title}</h1>
                    <p className="text-xl text-green-800/80 max-w-2xl mx-auto">
                        {t.contact.subtitle}
                    </p>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100">
                        <h2 className="text-2xl font-serif font-bold text-green-900 mb-6">{t.contact.form.title}</h2>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.name}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                                    placeholder={t.contact.form.placeholderName}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.email}</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                                    placeholder={t.contact.form.placeholderEmail}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.subject}</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.subject}
                                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                    className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                                    placeholder={t.contact.form.placeholderSubject}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{t.contact.form.message}</label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-green-50 border border-green-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                                    placeholder={t.contact.form.placeholderMessage}
                                ></textarea>
                            </div>

                            {status === 'success' && (
                                <div className="p-3 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                                    {language === 'bn' ? 'বার্তা সফলভাবে পাঠানো হয়েছে!' : 'Message sent successfully! We will get back to you soon.'}
                                </div>
                            )}

                            {status === 'error' && (
                                <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                                    {language === 'bn' ? 'বার্তা পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।' : 'Failed to send message. Please try again.'}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-2 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...') : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        {t.contact.form.send}
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-8 pt-4">
                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Mail className="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{t.contact.info.emailTitle}</h3>
                                <p className="text-gray-600">{getContent('contact_email_1') || 'support@amarballot.bd'}</p>
                                <p className="text-gray-600">{getContent('contact_email_2') || 'info@amarballot.bd'}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full">
                                <Phone className="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{t.contact.info.callTitle}</h3>
                                <p className="text-gray-600">{getContent('contact_phone') || '+880 1711 000000'}</p>
                                <p className="text-gray-600 leading-relaxed text-sm mt-1 text-gray-500">
                                    {language === 'bn' ? 'সোম-শুক্র সকাল ৯টা থেকে বিকাল ৫টা' : 'Mon-Fri from 9am to 5pm.'}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-green-50 transition-colors">
                            <div className="bg-green-100 p-3 rounded-full">
                                <MapPin className="w-6 h-6 text-green-700" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-800 mb-1">{t.contact.info.visitTitle}</h3>
                                <p className="text-gray-600 whitespace-pre-line">
                                    {getContent('contact_address') || t.contact.info.address}
                                </p>
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
