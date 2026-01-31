import { CheckCircle2, Circle } from 'lucide-react';

interface AllianceSelectorProps {
    selectedAlliance: string | null;
    onSelect: (alliance: string) => void;
}

const ALLIANCES = [
    { id: 'bnp', label: 'বাংলাদেশ জাতীয়তাবাদী দল (BNP) ও সমমনা জোট', color: 'bg-green-100 border-green-500 text-green-900' },
    { id: 'jamayat', label: 'বাংলাদেশ জামায়াতে ইসলামী ও ১১ দলীয় জোট', color: 'bg-emerald-100 border-emerald-500 text-emerald-900' },
    { id: 'islamic_andolon', label: 'ইসলামী আন্দোলন বাংলাদেশ (হাতপাখা)', color: 'bg-orange-100 border-orange-500 text-orange-900' },
    { id: 'gonotontro', label: 'গণতন্ত্র মঞ্চ', color: 'bg-yellow-100 border-yellow-500 text-yellow-900' },
    { id: 'bam_jot', label: 'বাম গণতান্ত্রিক জোট', color: 'bg-red-100 border-red-500 text-red-900' },
    { id: 'jatiya_party', label: 'জাতীয় পার্টি (Jatiya Party)', color: 'bg-purple-100 border-purple-500 text-purple-900' },
    { id: 'independent', label: 'স্বতন্ত্র প্রার্থী (Independent)', color: 'bg-gray-100 border-gray-500 text-gray-900' },
];

export default function AllianceSelector({ selectedAlliance, onSelect }: AllianceSelectorProps) {
    return (
        <div className="w-full max-w-3xl mx-auto mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-xl text-green-800 font-serif font-bold text-center mb-6">
                আপনার পছন্দের জোট বা দল নির্বাচন করুন
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {ALLIANCES.map((alliance) => (
                    <div
                        key={alliance.id}
                        onClick={() => onSelect(alliance.id)}
                        className={`
                            relative cursor-pointer rounded-xl border-2 p-4 transition-all duration-200 flex items-center gap-3
                            ${selectedAlliance === alliance.id
                                ? `${alliance.color} shadow-md scale-[1.02]`
                                : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50'
                            }
                        `}
                    >
                        {selectedAlliance === alliance.id ? (
                            <CheckCircle2 className="w-6 h-6 text-green-700 shrink-0" />
                        ) : (
                            <Circle className="w-6 h-6 text-gray-300 shrink-0" />
                        )}
                        <span className="font-serif font-medium text-lg leading-tight">
                            {alliance.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
