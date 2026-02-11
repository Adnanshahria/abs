import { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../lib/api';
import { Trash2, Search, CheckCircle, XCircle, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export default function AdminUsers() {
    const { language } = useLanguage();
    const t = translations[language].admin.users;
    const common = translations[language].common;

    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setLoading(false);
    };

    const handleDelete = async (id: number) => {
        if (confirm(t.alerts.deleteConfirm)) {
            await deleteUser(id);
            fetchUsers();
        }
    };

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.nid_number?.includes(searchTerm)
    );

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{t.title}</h1>
                    <p className="text-gray-600">{t.subtitle}</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm">
                    {t.total}: {users.length}
                </div>
            </div>

            {/* Search Bar */}
            <div className="relative mb-6">
                <input
                    type="text"
                    placeholder={t.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100">
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.table.status}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.table.details}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.table.nid}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm">{t.table.contact}</th>
                                <th className="p-4 font-semibold text-gray-600 text-sm text-right">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {loading ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">{t.table.loading}</td></tr>
                            ) : filteredUsers.length === 0 ? (
                                <tr><td colSpan={5} className="p-8 text-center text-gray-500">{t.table.empty}</td></tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4">
                                            {user.verification_status === 'verified' ? (
                                                <div className="flex items-center gap-1.5 text-green-600 bg-green-50 w-fit px-2 py-1 rounded-full text-xs font-medium">
                                                    <CheckCircle className="w-3.5 h-3.5" /> {t.table.verified}
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded-full text-xs font-medium">
                                                    <XCircle className="w-3.5 h-3.5" /> {t.table.unverified}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div>
                                                <p className="font-semibold text-gray-900">{user.name}</p>
                                                <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {user.nid_number ? (
                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">{user.nid_number}</p>
                                                    <p className="text-xs text-gray-500">{user.voter_area || 'N/A'}</p>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-sm italic">{t.table.notProvided}</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Mail className="w-3.5 h-3.5" /> {user.email}
                                                </div>
                                                {user.phone && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                                        <Phone className="w-3.5 h-3.5" /> {user.phone}
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            {user.role !== 'admin' && ( // Prevent deleting admins easily
                                                <button
                                                    onClick={() => handleDelete(user.id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title={common.delete}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
