import { Shield, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';
import { SEAT_SYSTEM } from '../lib/seats';
import { translations } from '../data/translations';

export default function NIDVerification() {
    const { user, verify } = useAuth();
    const { language } = useLanguage();
    const t = translations[language];
    const navigate = useNavigate();

    // Redirect if not logged in
    useEffect(() => {
        if (!user) {
            navigate('/'); // Redirect to home/login if session lost
        }
    }, [user, navigate]);

    const [formData, setFormData] = useState({
        nidNumber: '',
        dateOfBirth: ''
    });
    const [skipNID, setSkipNID] = useState(false);

    // 3-Step Location Hierarchy
    const [selectedDivision, setSelectedDivision] = useState<string>('');
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [selectedArea, setSelectedArea] = useState<string>('');

    const [isVerifying, setIsVerifying] = useState(false);
    const [modal, setModal] = useState({
        isOpen: false,
        title: '',
        message: '',
        type: 'info' as 'success' | 'error' | 'info'
    });

    // Derived Lists
    const divisions = SEAT_SYSTEM.data.map(d => d.division);
    const districts = selectedDivision
        ? SEAT_SYSTEM.data.find(d => d.division === selectedDivision)?.districts.map(d => d.district_name) || []
        : [];
    const areas = selectedDistrict && selectedDivision
        ? SEAT_SYSTEM.data.find(d => d.division === selectedDivision)
            ?.districts.find(d => d.district_name === selectedDistrict)
            ?.constituencies || []
        : [];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!user) {
            setModal({
                isOpen: true,
                title: t.nidVerification.messages.authReq.title,
                message: t.nidVerification.messages.authReq.msg,
                type: 'error'
            });
            return;
        }

        // Validation
        if ((!skipNID && !formData.nidNumber) || !formData.dateOfBirth || !selectedArea) {
            setModal({
                isOpen: true,
                title: t.nidVerification.messages.missing.title,
                message: t.nidVerification.messages.missing.msg,
                type: 'error'
            });
            return;
        }

        setIsVerifying(true);
        // Simulate delay for UX
        setTimeout(async () => {
            try {
                const nidToUse = skipNID ? 'Not Provided' : formData.nidNumber;

                // Use verify from context which handles state update
                const result = await verify(user.id, {
                    nidNumber: nidToUse,
                    dateOfBirth: formData.dateOfBirth,
                    voterArea: selectedArea, // UI displays native seat
                    division: selectedDivision,
                    district: selectedDistrict,
                    seatNo: selectedArea
                });

                if (result.success) {
                    setModal({
                        isOpen: true,
                        title: t.nidVerification.messages.success.title,
                        message: t.nidVerification.messages.success.msg.replace('{area}', selectedArea),
                        type: 'success'
                    });
                    setTimeout(() => navigate('/dashboard'), 1500); // Redirect to dashboard after verification
                } else {
                    throw new Error(result.error || t.nidVerification.messages.fail.msg);
                }
            } catch (error) {
                console.error('Verification failed:', error);
                setModal({
                    isOpen: true,
                    title: t.nidVerification.messages.fail.title,
                    message: t.nidVerification.messages.fail.msg,
                    type: 'error'
                });
            } finally {
                setIsVerifying(false);
            }
        }, 1500);
    };

    return (
        <main className="flex-1 w-full px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-green-100 p-5 md:p-8 animate-in fade-in zoom-in duration-500">
                <div className="text-center mb-8">
                    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-serif text-green-900 font-bold">
                        {t.nidVerification.title}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {t.nidVerification.subtitle}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* NID Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">{t.nidVerification.form.nidLabel}</label>
                        <div className="relative">
                            <input
                                type="number"
                                inputMode="numeric"
                                name="nidNumber"
                                placeholder={t.nidVerification.form.nidPlaceholder}
                                value={formData.nidNumber}
                                onChange={handleChange}
                                disabled={skipNID}
                                className={`w-full px-4 py-3 pl-10 rounded-xl border border-gray-300 outline-none transition-all ${skipNID ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'focus:border-green-500 focus:ring-2 focus:ring-green-200'}`}
                            />
                            <CreditCard className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                        </div>

                        <div className="flex items-center mt-2 gap-2">
                            <input
                                type="checkbox"
                                id="skipNID"
                                checked={skipNID}
                                onChange={(e) => setSkipNID(e.target.checked)}
                                className="w-4 h-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                            />
                            <label htmlFor="skipNID" className="text-sm text-gray-600 select-none cursor-pointer">
                                {t.nidVerification.form.skipNid}
                            </label>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <DatePicker
                        label={t.nidVerification.form.dobLabel}
                        value={formData.dateOfBirth}
                        onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                    />

                    {/* --- LOCATION HIERARCHY --- */}
                    <div className="space-y-4 bg-green-50 p-4 rounded-xl border border-green-100">
                        <h3 className="text-green-800 font-bold border-b border-green-200 pb-2 mb-2">
                            {t.nidVerification.form.seatHeader}
                        </h3>

                        {/* Division */}
                        <CustomSelect
                            label={t.nidVerification.form.division}
                            value={selectedDivision}
                            onChange={(val) => {
                                setSelectedDivision(val);
                                setSelectedDistrict('');
                                setSelectedArea('');
                            }}
                            options={divisions}
                            placeholder={t.nidVerification.form.selectDivision}
                        />

                        {/* District */}
                        {selectedDivision && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <CustomSelect
                                    label={t.nidVerification.form.district}
                                    value={selectedDistrict}
                                    onChange={(val) => {
                                        setSelectedDistrict(val);
                                        setSelectedArea('');
                                    }}
                                    options={districts}
                                    placeholder={t.nidVerification.form.selectDistrict}
                                />
                            </div>
                        )}

                        {/* Area / Seat */}
                        {selectedDistrict && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <CustomSelect
                                    label={t.nidVerification.form.area}
                                    value={selectedArea}
                                    onChange={(val) => setSelectedArea(val)}
                                    options={areas}
                                    placeholder={t.nidVerification.form.selectArea}
                                />
                                <p className="text-xs text-red-500 mt-1 ml-1">
                                    {t.nidVerification.form.permanentWarning}
                                </p>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isVerifying}
                        className="w-full bg-green-700 hover:bg-green-800 text-white font-bold py-3.5 rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        {isVerifying ? (
                            <span className="animate-pulse">{t.nidVerification.form.verifying}</span>
                        ) : (
                            <>
                                {t.nidVerification.form.verifyBtn}
                            </>
                        )}
                    </button>

                    <button type="button" onClick={() => navigate('/dashboard')} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
                        {t.nidVerification.form.back}
                    </button>
                </form>
            </div>

            <Modal
                isOpen={modal.isOpen}
                onClose={() => {
                    setModal({ ...modal, isOpen: false });
                    // Do not navigate on close if success, handled by timeout
                }}
                title={modal.title}
                message={modal.message}
                type={modal.type}
            />
        </main>
    );
}
