import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, X, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { getCandidates, addCandidate, deleteCandidate, updateCandidate } from '../lib/api';
import { SEAT_SYSTEM } from '../lib/seats';

export default function AdminCandidates() {
    const [candidates, setCandidates] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '', name_bn: '', party: '', party_bn: '', symbol: '',
        image_url: 'https://placehold.co/400',
        manifesto: '', manifesto_bn: '',
        education: '', experience: '', age: '', status: 'clean',
        division: '', district: '', area: '', alliance: ''
    });

    // Cascading Dropdown State
    const [availableDistricts, setAvailableDistricts] = useState<any[]>([]);
    const [availableAreas, setAvailableAreas] = useState<string[]>([]);

    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = async () => {
        setLoading(true);
        const data = await getCandidates();
        setCandidates(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this candidate?')) {
            await deleteCandidate(id);
            fetchCandidates();
        }
    };

    const handleEdit = (candidate: any) => {
        setEditingId(candidate.id);
        setFormData({
            name: candidate.name,
            name_bn: candidate.name_bn || '',
            party: candidate.party,
            party_bn: candidate.party_bn || '',
            symbol: candidate.symbol,
            image_url: candidate.image_url,
            manifesto: candidate.manifesto || '',
            manifesto_bn: candidate.manifesto_bn || '',
            education: candidate.education,
            experience: candidate.experience,
            age: candidate.age?.toString() || '',
            status: candidate.status,
            division: candidate.division,
            district: candidate.district,
            area: candidate.area,
            alliance: candidate.alliance || ''
        });

        // Trigger cascading updates
        if (candidate.division) {
            const divData = SEAT_SYSTEM.data.find(d => d.division === candidate.division);
            setAvailableDistricts(divData ? divData.districts : []);

            if (candidate.district && divData) {
                const distData = divData.districts.find(d => d.district_name === candidate.district);
                setAvailableAreas(distData ? distData.constituencies : []);
            }
        }

        setIsAddModalOpen(true);
    };

    const handleDivisionChange = (division: string) => {
        setFormData({ ...formData, division, district: '', area: '' });
        const divData = SEAT_SYSTEM.data.find(d => d.division === division);
        setAvailableDistricts(divData ? divData.districts : []);
        setAvailableAreas([]);
    };

    const handleDistrictChange = (districtName: string) => {
        setFormData({ ...formData, district: districtName, area: '' });
        const distData = availableDistricts.find(d => d.district_name === districtName);
        setAvailableAreas(distData ? distData.constituencies : []);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            age: parseInt(formData.age) || 0
        };

        let result;
        if (editingId) {
            result = await updateCandidate(editingId, payload);
        } else {
            result = await addCandidate(payload);
        }

        if (result.success) {
            setIsAddModalOpen(false);
            setEditingId(null);
            fetchCandidates();
            resetForm();
        } else {
            alert('Failed to save candidate');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '', name_bn: '', party: '', party_bn: '', symbol: '',
            image_url: 'https://placehold.co/400',
            manifesto: '', manifesto_bn: '',
            education: '', experience: '', age: '', status: 'clean',
            division: '', district: '', area: '', alliance: ''
        });
        setEditingId(null);
    };

    const filteredCandidates = candidates.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.party.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.area?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Manage Candidates</h1>
                    <p className="text-gray-600">Add, edit, or remove election candidates</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                    className="flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    Add Candidate
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder="Search candidates by name, party, or area..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-500/10 outline-none transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Candidates Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600 text-sm">Valid</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Name / Party</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Constituency</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">Symbol</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">Loading candidates...</td></tr>
                            ) : filteredCandidates.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">No candidates found.</td></tr>
                            ) : (
                                filteredCandidates.map((candidate) => (
                                    <tr key={candidate.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            {candidate.status === 'clean' ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-yellow-500" />
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img src={candidate.image_url} alt="" className="w-10 h-10 rounded-full object-cover bg-gray-100" />
                                                <div>
                                                    <p className="font-semibold text-gray-900">{candidate.name}</p>
                                                    <p className="text-sm text-gray-500">{candidate.party}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">{candidate.area}</td>
                                        <td className="p-4 text-gray-600">{candidate.symbol}</td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(candidate)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <div className="w-4 h-4">✏️</div>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(candidate.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add/Edit Candidate Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? 'Edit Candidate' : 'Add New Candidate'}</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (English)</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (Bangla)</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.name_bn} onChange={e => setFormData({ ...formData, name_bn: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Party Name</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.party} onChange={e => setFormData({ ...formData, party: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Symbol</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.symbol} onChange={e => setFormData({ ...formData, symbol: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <input required type="number" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Education</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.education} onChange={e => setFormData({ ...formData, education: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                    <input required type="url" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.image_url} onChange={e => setFormData({ ...formData, image_url: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Alliance</label>
                                    <select className="w-full p-3 rounded-lg border border-gray-200 bg-white"
                                        value={formData.alliance} onChange={e => setFormData({ ...formData, alliance: e.target.value })}>
                                        <option value="">None</option>
                                        <option value="bal">Awami League</option>
                                        <option value="bnp">BNP</option>
                                        <option value="jp">Jatiya Party</option>
                                        <option value="jamaat">Jamaat</option>
                                    </select>
                                </div>
                            </div>

                            {/* Seat Selection */}
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Division</label>
                                    <select
                                        required
                                        className="w-full p-3 rounded-lg border border-gray-200 bg-white"
                                        value={formData.division}
                                        onChange={(e) => handleDivisionChange(e.target.value)}
                                    >
                                        <option value="">Select Division</option>
                                        {SEAT_SYSTEM.data.map(d => (
                                            <option key={d.division} value={d.division}>{d.division}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                    <select
                                        required
                                        disabled={!formData.division}
                                        className="w-full p-3 rounded-lg border border-gray-200 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                                        value={formData.district}
                                        onChange={(e) => handleDistrictChange(e.target.value)}
                                    >
                                        <option value="">Select District</option>
                                        {availableDistricts.map(d => (
                                            <option key={d.district_name} value={d.district_name}>{d.district_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Constituency (Area)</label>
                                    <select
                                        required
                                        disabled={!formData.district}
                                        className="w-full p-3 rounded-lg border border-gray-200 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    >
                                        <option value="">Select Seat</option>
                                        {availableAreas.map(area => (
                                            <option key={area} value={area}>{area}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button
                                    type="button"
                                    onClick={() => setIsAddModalOpen(false)}
                                    className="px-6 py-2.5 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 shadow-sm transition-colors flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {editingId ? 'Update Candidate' : 'Save Candidate'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
