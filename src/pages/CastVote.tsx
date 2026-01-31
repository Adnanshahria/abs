import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { submitVote, checkUserVoteStatus } from '../lib/api';
import { CheckCircle, Send, ArrowLeft } from 'lucide-react';
// import { ALL_ALLIANCES } from './CandidateList';

export default function CastVote() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [selectedParty, setSelectedParty] = useState<string | null>(null);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [checking, setChecking] = useState(true);

    // Hardcoded for now to match exactly the image/logic, or reuse from CandidateList if exported
    // Ideally we should import, but for speed and avoiding exports editing loops, I'll define local map matching the requirement.
    const PARTIES = [
        { id: 'bnp', label: 'বাংলাদেশ জাতীয়তাবাদী দল (BNP) ও সমমনা জোট' },
        { id: 'jamayat', label: 'বাংলাদেশ জামায়াতে ইসলামী ও ১০ দলীয় জোট' },
        { id: 'islamic_andolon', label: 'ইসলামী আন্দোলন বাংলাদেশ (হাতপাখা)' },
        { id: 'gonotontro', label: 'গণতন্ত্র মঞ্চ' },
        { id: 'bam_jot', label: 'বাম গণতান্ত্রিক জোট' },
        { id: 'jatiya_party', label: 'জাতীয় পার্টি (Jatiya Party)' },
        { id: 'independent', label: 'স্বতন্ত্র প্রার্থী (Independent)' },
        { id: 'awami_league', label: 'বাংলাদেশ আওয়ামী লীগ (Awami League)' } // Included just in case, though usually hidden in some views
    ].filter(p => p.id !== 'awami_league'); // Filter if needed based on previous logic

    useEffect(() => {
        if (!user) {
            navigate('/sign-up');
            return;
        }

        // Double check if already voted
        checkUserVoteStatus(user.id).then(res => {
            if (res.success && res.hasVoted) {
                navigate('/candidate-list'); // Already voted
            }
            setChecking(false);
        });
    }, [user, navigate]);

    const handleSubmit = async () => {
        if (!selectedParty || !user) return;

        setSubmitting(true);
        const voteData = {
            division: user.division,
            district: user.district,
            seat_no: user.seat_no,
            alliance_id: selectedParty,
            user_review: comment,
            user_name: user.name,
            user_id: user.id
        };

        const result = await submitVote(voteData);

        if (result.success) {
            navigate('/candidate-list');
        } else {
            alert('ভোট গ্রহণে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।');
            setSubmitting(false);
        }
    };

    if (checking) return <div className="min-h-screen flex items-center justify-center text-green-600">যাচাই করা হচ্ছে...</div>;

    const seatName = (user as any)?.seat_no || 'আপনার নির্বাচনী এলাকা';

    return (
        <main className="flex-1 w-full px-4 py-8 min-h-screen bg-gray-50 flex flex-col items-center">

            {/* Back Button */}
            <div className="w-full max-w-3xl mb-4">
                <button onClick={() => navigate('/dashboard')} className="flex items-center text-gray-600 hover:text-green-700 transition-colors">
                    <ArrowLeft className="w-5 h-5 mr-1" />
                    ফিরে যান
                </button>
            </div>

            <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg border border-green-100 overflow-hidden">
                {/* Header */}
                <div className="bg-green-50 p-6 text-center border-b border-green-100">
                    <h1 className="text-2xl md:text-3xl font-bold text-green-800 mb-2">
                        {seatName}-এর জন্য আপনার মতামত দিন
                    </h1>
                    <p className="text-green-700 font-medium">
                        আপনার পছন্দের জোট বা দল নির্বাচন করুন
                    </p>
                </div>

                <div className="p-4 md:p-8 space-y-8">
                    {/* Party Selection Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {PARTIES.map((party) => {
                            const isSelected = selectedParty === party.id;
                            return (
                                <div
                                    key={party.id}
                                    onClick={() => setSelectedParty(party.id)}
                                    className={`
                                        relative rounded-xl p-4 border-2 cursor-pointer transition-all flex items-center gap-3
                                        ${isSelected
                                            ? 'border-green-500 bg-green-50 shadow-md'
                                            : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'}
                                    `}
                                >
                                    <div className={`
                                        w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                        ${isSelected ? 'border-green-600 bg-green-600' : 'border-gray-300'}
                                    `}>
                                        {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                                    </div>

                                    <span className={`font-medium ${isSelected ? 'text-green-900' : 'text-gray-700'}`}>
                                        {party.label}
                                    </span>

                                    {isSelected && (
                                        <div className="absolute top-2 right-2 text-green-600">
                                            <CheckCircle className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {/* Comment Section */}
                    <div>
                        <label className="block text-green-800 font-bold mb-3">
                            আপনার মতামত জানান (ঐচ্ছিক):
                        </label>
                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="কেন আপনি এই জোটকে সমর্থন করছেন? (ছোট করে লিখুন)"
                            className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-50/50 outline-none transition-all resize-none h-32 text-gray-700"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        disabled={!selectedParty || submitting}
                        className={`
                            w-full py-4 rounded-xl font-bold text-lg md:text-xl flex items-center justify-center gap-3 transition-all shadow-lg
                            ${!selectedParty || submitting
                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                : 'bg-green-700 text-white hover:bg-green-800 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99]'}
                        `}
                    >
                        {submitting ? 'জমা দেওয়া হচ্ছে...' : 'মতামত জমা দিন'}
                        {!submitting && <Send className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </main>
    );
}
