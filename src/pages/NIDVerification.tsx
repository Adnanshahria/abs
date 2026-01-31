import { Shield, CreditCard } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Modal from '../components/Modal';
import DatePicker from '../components/DatePicker';
import CustomSelect from '../components/CustomSelect';
import { SEAT_SYSTEM } from '../lib/seats';

export default function NIDVerification() {
    const { user, verify } = useAuth();
    const { language } = useLanguage();
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
                title: 'Authentication Required',
                message: 'You must be logged in to verify.',
                type: 'error'
            });
            return;
        }

        // Validation
        if ((!skipNID && !formData.nidNumber) || !formData.dateOfBirth || !selectedArea) {
            setModal({
                isOpen: true,
                title: 'Missing Information',
                message: 'Please fill in all details including your specific seat.',
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
                        title: 'Verification Successful!',
                        message: `Welcome voter of ${selectedArea}! You can now access full features.`,
                        type: 'success'
                    });
                    setTimeout(() => navigate('/dashboard'), 1500); // Redirect to dashboard after verification
                } else {
                    throw new Error(result.error || 'Verification failed');
                }
            } catch (error) {
                console.error('Verification failed:', error);
                setModal({
                    isOpen: true,
                    title: 'Verification Failed',
                    message: 'Could not verify your details. Please try again.',
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
                        {language === 'bn' ? 'পরিচয় যাচাইকরণ' : 'Verify Identity'}
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {language === 'bn'
                            ? 'ভোট দেওয়ার জন্য আপনার এনআইডি ও নিজ আসন নির্বাচন করুন'
                            : 'Enter NID and select your Native Seat to enable voting'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* NID Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NID Number</label>
                        <div className="relative">
                            <input
                                type="number"
                                inputMode="numeric"
                                name="nidNumber"
                                placeholder="e.g. 1993284732"
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
                                I don't want to share my NID Number
                            </label>
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <DatePicker
                        label="Date of Birth"
                        value={formData.dateOfBirth}
                        onChange={(date) => setFormData({ ...formData, dateOfBirth: date })}
                    />

                    {/* --- LOCATION HIERARCHY --- */}
                    <div className="space-y-4 bg-green-50 p-4 rounded-xl border border-green-100">
                        <h3 className="text-green-800 font-bold border-b border-green-200 pb-2 mb-2">
                            Select Your Native Seat (ভোটের এলাকা)
                        </h3>

                        {/* Division */}
                        <CustomSelect
                            label="Division"
                            value={selectedDivision}
                            onChange={(val) => {
                                setSelectedDivision(val);
                                setSelectedDistrict('');
                                setSelectedArea('');
                            }}
                            options={divisions}
                            placeholder="Select Division..."
                        />

                        {/* District */}
                        {selectedDivision && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <CustomSelect
                                    label="District"
                                    value={selectedDistrict}
                                    onChange={(val) => {
                                        setSelectedDistrict(val);
                                        setSelectedArea('');
                                    }}
                                    options={districts}
                                    placeholder="Select District..."
                                />
                            </div>
                        )}

                        {/* Area / Seat */}
                        {selectedDistrict && (
                            <div className="animate-in fade-in slide-in-from-top-2">
                                <CustomSelect
                                    label="Constituency (Seat)"
                                    value={selectedArea}
                                    onChange={(val) => setSelectedArea(val)}
                                    options={areas}
                                    placeholder="Select Seat..."
                                />
                                <p className="text-xs text-red-500 mt-1 ml-1">
                                    * This will be your PERMANENT voting seat.
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
                            <span className="animate-pulse">Verifying...</span>
                        ) : (
                            <>
                                {language === 'bn' ? 'যাচাই করুন ও জমা দিন' : 'Verify & Set Native Seat'}
                            </>
                        )}
                    </button>

                    <button type="button" onClick={() => navigate('/dashboard')} className="w-full text-center text-sm text-gray-500 hover:text-gray-700">
                        Back to Dashboard
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
