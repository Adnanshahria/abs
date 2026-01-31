import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

import { getCandidateById } from '../lib/api';
import type { Candidate } from '../lib/types';
import SEO from '../components/SEO';
import { ChevronLeft, Award, BookOpen, Briefcase, MapPin } from 'lucide-react';

export default function CandidateDetails() {
    const { id } = useParams();
    const { language } = useLanguage();


    const [candidate, setCandidate] = useState<Candidate | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCandidate() {
            if (!id) return;
            const data = await getCandidateById(Number(id));
            setCandidate(data);
            setLoading(false);
        }
        fetchCandidate();
    }, [id]);

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    if (!candidate) {
        return <div className="min-h-screen flex items-center justify-center">Candidate not found</div>;
    }

    const name = language === 'bn' ? candidate.name_bn : candidate.name;
    const party = language === 'bn' ? candidate.party_bn : candidate.party;
    const manifesto = language === 'bn' ? candidate.manifesto_bn : candidate.manifesto;

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 bg-gray-50 min-h-screen">
            <SEO title={name} description={`Details for ${name} - ${party}`} />

            <div className="max-w-4xl mx-auto">
                <Link to="/candidate-list" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6 transition-colors">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to List
                </Link>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-green-100">
                    <div className="bg-gradient-to-r from-green-800 to-green-600 h-32 relative"></div>

                    <div className="px-8 pb-8">
                        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                            <img
                                src={candidate.image_url}
                                alt={name}
                                className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-gray-200"
                            />
                            <div className="flex-1">
                                <h1 className="text-3xl font-serif font-bold text-gray-900">{name}</h1>
                                <div className="flex items-center justify-center md:justify-start gap-2 text-green-700 font-medium mt-1">
                                    <Award className="w-4 h-4" />
                                    <span>{party}</span>
                                    <span className="text-gray-300">|</span>
                                    <span>Symbol: {candidate.symbol}</span>
                                </div>
                            </div>
                            <div className="flex flex-col items-center">
                                <span className={`px-4 py-1 rounded-full text-sm font-bold border ${candidate.status === 'clean'
                                    ? 'bg-green-50 text-green-700 border-green-200'
                                    : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                    }`}>
                                    {candidate.status === 'clean' ? 'Clean Record' : 'Pending Review'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-green-600" />
                                        Experience & Education
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Education</label>
                                            <p className="text-gray-800 font-medium">{candidate.education}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Experience</label>
                                            <p className="text-gray-800 font-medium">{candidate.experience}</p>
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-500 uppercase">Age</label>
                                            <p className="text-gray-800 font-medium">{candidate.age} Years</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Constituency</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                                            <span className="text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> Area</span>
                                            <span className="font-medium text-gray-800">{candidate.area}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-gray-500 flex items-center gap-2"><MapPin className="w-4 h-4" /> District</span>
                                            <span className="font-medium text-gray-800">{candidate.district}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-green-50/50 p-6 rounded-xl border border-green-100">
                                <h3 className="text-lg font-bold text-green-900 mb-4 flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-green-600" />
                                    Election Manifesto
                                </h3>
                                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                                    {manifesto}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
