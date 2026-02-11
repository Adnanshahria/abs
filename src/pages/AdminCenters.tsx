import { useState, useEffect } from 'react';
import { Plus, Search, Trash2, MapPin, X, Save } from 'lucide-react';
import { getVoteCenters, addVoteCenter, deleteVoteCenter, updateVoteCenter } from '../lib/api';
import { SEAT_SYSTEM } from '../lib/seats';

import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function AdminCenters() {
    const { language } = useLanguage();
    const t = translations[language];
    const [centers, setCenters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingId, setEditingId] = useState<number | null>(null);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '', name_bn: '',
        address: '', address_bn: '',
        division: '', district: '', area: '',
        latitude: '', longitude: '', capacity: ''
    });

    // Cascading Dropdown State
    const [availableDistricts, setAvailableDistricts] = useState<any[]>([]);
    const [availableAreas, setAvailableAreas] = useState<string[]>([]);

    useEffect(() => {
        fetchCenters();
    }, []);

    const fetchCenters = async () => {
        setLoading(true);
        const data = await getVoteCenters();
        setCenters(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm(t.admin.centers.alerts.deleteConfirm)) {
            await deleteVoteCenter(id);
            fetchCenters();
        }
    };

    const handleEdit = (center: any) => {
        setEditingId(center.id);
        setFormData({
            name: center.name,
            name_bn: center.name_bn || '',
            address: center.address,
            address_bn: center.address_bn || '',
            division: center.division,
            district: center.district,
            area: center.area,
            latitude: center.latitude.toString(),
            longitude: center.longitude.toString(),
            capacity: center.capacity.toString()
        });

        // Trigger cascading updates
        if (center.division) {
            const divData = SEAT_SYSTEM.data.find(d => d.division === center.division);
            setAvailableDistricts(divData ? divData.districts : []);

            if (center.district && divData) {
                const distData = divData.districts.find(d => d.district_name === center.district);
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
            latitude: parseFloat(formData.latitude) || 0,
            longitude: parseFloat(formData.longitude) || 0,
            capacity: parseInt(formData.capacity) || 0
        };

        let result;
        if (editingId) {
            result = await updateVoteCenter(editingId, payload);
        } else {
            result = await addVoteCenter(payload);
        }

        if (result.success) {
            setIsAddModalOpen(false);
            setEditingId(null);
            fetchCenters();
            resetForm();
        } else {
            alert(t.admin.centers.alerts.fail);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '', name_bn: '',
            address: '', address_bn: '',
            division: '', district: '', area: '',
            latitude: '', longitude: '', capacity: ''
        });
        setEditingId(null);
    };

    const filteredCenters = centers.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.area.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t.admin.centers.title}</h1>
                    <p className="text-gray-600">{t.admin.centers.subtitle}</p>
                </div>
                <button
                    onClick={() => { resetForm(); setIsAddModalOpen(true); }}
                    className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-xl hover:bg-purple-700 transition-colors font-medium shadow-sm hover:shadow-md"
                >
                    <Plus className="w-5 h-5" />
                    {t.admin.centers.add}
                </button>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder={t.admin.centers.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Centers Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.admin.centers.table.name}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.admin.centers.table.location}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.admin.centers.table.capacity}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.admin.centers.table.coordinates}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-right">{t.admin.centers.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">{t.admin.centers.table.loading}</td></tr>
                            ) : filteredCenters.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">{t.admin.centers.table.empty}</td></tr>
                            ) : (
                                filteredCenters.map((center) => (
                                    <tr key={center.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            <div className="flex items-start gap-3">
                                                <div className="mt-1">
                                                    <MapPin className="w-5 h-5 text-purple-500" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-900">{center.name}</p>
                                                    <p className="text-xs text-gray-500">{center.address}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-block px-2 py-1 bg-gray-100 rounded text-xs text-gray-600 font-medium">
                                                {center.area}
                                            </span>
                                            <p className="text-xs text-gray-400 mt-1">{center.district}, {center.division}</p>
                                        </td>
                                        <td className="p-4 text-gray-600 font-mono text-sm">{(center.capacity ?? 0).toLocaleString()}</td>
                                        <td className="p-4 text-gray-500 text-xs font-mono">
                                            {(center.latitude ?? 0).toFixed(4)}, {(center.longitude ?? 0).toFixed(4)}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(center)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <div className="w-4 h-4">✏️</div>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(center.id)}
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

            {/* Add/Edit Center Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)} />
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 animate-in zoom-in-95 duration-200">
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-20">
                            <h2 className="text-xl font-bold text-gray-900">{editingId ? t.admin.centers.form.editTitle : t.admin.centers.form.addTitle}</h2>
                            <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-5 h-5" /></button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.nameEn}</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.nameBn}</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.name_bn} onChange={e => setFormData({ ...formData, name_bn: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.addressEn}</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.addressBn}</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.address_bn} onChange={e => setFormData({ ...formData, address_bn: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.capacity}</label>
                                    <input required type="number" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.capacity} onChange={e => setFormData({ ...formData, capacity: e.target.value })} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.lat}</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.latitude} onChange={e => setFormData({ ...formData, latitude: e.target.value })} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.lng}</label>
                                    <input required type="text" className="w-full p-3 rounded-lg border border-gray-200"
                                        value={formData.longitude} onChange={e => setFormData({ ...formData, longitude: e.target.value })} />
                                </div>
                            </div>

                            {/* Seat Selection */}
                            <div className="p-5 bg-gray-50 rounded-xl border border-gray-200 grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.division}</label>
                                    <select
                                        required
                                        className="w-full p-3 rounded-lg border border-gray-200 bg-white"
                                        value={formData.division}
                                        onChange={(e) => handleDivisionChange(e.target.value)}
                                    >
                                        <option value="">{t.admin.centers.form.selectDivision}</option>
                                        {SEAT_SYSTEM.data.map(d => (
                                            <option key={d.division} value={d.division}>{d.division}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.district}</label>
                                    <select
                                        required
                                        disabled={!formData.division}
                                        className="w-full p-3 rounded-lg border border-gray-200 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                                        value={formData.district}
                                        onChange={(e) => handleDistrictChange(e.target.value)}
                                    >
                                        <option value="">{t.admin.centers.form.selectDistrict}</option>
                                        {availableDistricts.map(d => (
                                            <option key={d.district_name} value={d.district_name}>{d.district_name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">{t.admin.centers.form.area}</label>
                                    <select
                                        required
                                        disabled={!formData.district}
                                        className="w-full p-3 rounded-lg border border-gray-200 bg-white disabled:bg-gray-100 disabled:text-gray-400"
                                        value={formData.area}
                                        onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                                    >
                                        <option value="">{t.admin.centers.form.selectSeat}</option>
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
                                    {t.admin.centers.form.cancel}
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2.5 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 shadow-sm transition-colors flex items-center gap-2"
                                >
                                    <Save className="w-4 h-4" />
                                    {editingId ? t.admin.centers.form.update : t.admin.centers.form.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div >
            )
            }
        </div >
    );
}
