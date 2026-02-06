import { useState, useEffect, useRef, useMemo } from 'react';
import { Brain, Plus, Edit2, Trash2, Search, ToggleLeft, ToggleRight, X, Save, Loader2, Upload, FileJson, CheckCircle2, AlertCircle, Copy, ChevronDown } from 'lucide-react';
import { getAIKnowledge, addAIKnowledge, updateAIKnowledge, deleteAIKnowledge, bulkImportAIKnowledge, removeDuplicateAIKnowledge, type AIKnowledgeEntry } from '../lib/api';

// Default divisions (used as fallback when no entries exist)
const DEFAULT_DIVISIONS = [
    'ভোটার নিবন্ধন',
    'NID / জাতীয় পরিচয়পত্র',
    'ভোট কেন্দ্র',
    'নির্বাচন প্রক্রিয়া',
    'প্রার্থী তথ্য',
    'গুজব যাচাই',
    'আইন ও বিধি',
    'সাধারণ প্রশ্ন',
    'অন্যান্য'
];

export default function AdminTrainAI() {
    const [entries, setEntries] = useState<AIKnowledgeEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterDivision, setFilterDivision] = useState('');
    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingEntry, setEditingEntry] = useState<AIKnowledgeEntry | null>(null);
    const [saving, setSaving] = useState(false);

    // Form state
    const [formData, setFormData] = useState({
        division: '',
        question: '',
        answer: '',
        keywords: '',
        priority: 0
    });

    // JSON Import state
    const [showImportModal, setShowImportModal] = useState(false);
    const [jsonInput, setJsonInput] = useState('');
    const [importing, setImporting] = useState(false);
    const [importProgress, setImportProgress] = useState({ current: 0, total: 0 });
    const [importResult, setImportResult] = useState<{ success: boolean; imported: number; failed: number; errors: string[] } | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Duplicate removal state
    const [removingDuplicates, setRemovingDuplicates] = useState(false);

    // Dynamic divisions - extracted from entries + defaults
    const divisions = useMemo(() => {
        const uniqueDivisions = new Set<string>();
        entries.forEach(entry => {
            if (entry.division) uniqueDivisions.add(entry.division);
        });
        // Merge with defaults to include empty categories
        DEFAULT_DIVISIONS.forEach(div => uniqueDivisions.add(div));
        return Array.from(uniqueDivisions).sort();
    }, [entries]);

    useEffect(() => {
        loadEntries();
    }, []);

    const loadEntries = async () => {
        setLoading(true);
        const data = await getAIKnowledge();
        setEntries(data);
        setLoading(false);
    };

    const openAddModal = () => {
        setEditingEntry(null);
        setFormData({ division: divisions[0] || '', question: '', answer: '', keywords: '', priority: 0 });
        setShowModal(true);
    };

    const openEditModal = (entry: AIKnowledgeEntry) => {
        setEditingEntry(entry);
        setFormData({
            division: entry.division,
            question: entry.question,
            answer: entry.answer,
            keywords: entry.keywords || '',
            priority: entry.priority || 0
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!formData.division || !formData.question || !formData.answer) {
            alert('বিভাগ, প্রশ্ন এবং উত্তর আবশ্যক');
            return;
        }

        setSaving(true);
        try {
            if (editingEntry?.id) {
                await updateAIKnowledge(editingEntry.id, formData);
            } else {
                await addAIKnowledge(formData);
            }
            await loadEntries();
            setShowModal(false);
        } catch (error) {
            console.error('Save error:', error);
            alert('সংরক্ষণে সমস্যা হয়েছে');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('আপনি কি নিশ্চিত এটি মুছে ফেলতে চান?')) return;

        try {
            await deleteAIKnowledge(id);
            await loadEntries();
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const handleToggleActive = async (entry: AIKnowledgeEntry) => {
        if (!entry.id) return;
        await updateAIKnowledge(entry.id, { is_active: entry.is_active === 1 ? 0 : 1 });
        await loadEntries();
    };

    // JSON Import Handlers
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target?.result as string;
            setJsonInput(content);
        };
        reader.readAsText(file);
    };

    const handleJsonImport = async () => {
        if (!jsonInput.trim()) {
            alert('JSON ডেটা প্রদান করুন');
            return;
        }

        setImporting(true);
        setImportResult(null);
        setImportProgress({ current: 0, total: 0 });

        try {
            const data = JSON.parse(jsonInput);
            const entries: AIKnowledgeEntry[] = Array.isArray(data) ? data : [data];

            setImportProgress({ current: 0, total: entries.length });

            const result = await bulkImportAIKnowledge(entries, (current, total) => {
                setImportProgress({ current, total });
            });

            setImportResult(result);
            if (result.imported > 0) {
                await loadEntries();
            }
        } catch (error) {
            console.error('JSON parse error:', error);
            setImportResult({
                success: false,
                imported: 0,
                failed: 1,
                errors: ['Invalid JSON format. Please check your JSON syntax.']
            });
        } finally {
            setImporting(false);
        }
    };

    const sampleJson = `[
  {
    "division": "ভোটার নিবন্ধন",
    "question": "ভোটার হতে বয়স কত লাগে?",
    "answer": "১৮ বছর বয়স হলে ভোটার হতে পারবেন।",
    "keywords": "বয়স, ভোটার, নিবন্ধন",
    "priority": 10
  },
  {
    "division": "NID / জাতীয় পরিচয়পত্র",
    "question": "NID হারিয়ে গেলে কি করব?",
    "answer": "নিকটস্থ UDC বা জেলা নির্বাচন অফিসে আবেদন করুন।",
    "keywords": "NID, হারানো, আবেদন",
    "priority": 5
  }
]`;

    // Handle Remove Duplicates
    const handleRemoveDuplicates = async () => {
        if (!confirm('ডুপ্লিকেট প্রশ্নগুলো মুছে ফেলা হবে। শুধুমাত্র সর্বোচ্চ অগ্রাধিকারের কপি রাখা হবে। আপনি কি নিশ্চিত?')) return;

        setRemovingDuplicates(true);
        try {
            const result = await removeDuplicateAIKnowledge();
            if (result.success) {
                alert(`✅ ${result.removed}টি ডুপ্লিকেট প্রশ্ন মুছে ফেলা হয়েছে!`);
                await loadEntries();
            } else {
                alert('সমস্যা হয়েছে। আবার চেষ্টা করুন।');
            }
        } catch (error) {
            console.error('Remove duplicates error:', error);
            alert('সমস্যা হয়েছে');
        } finally {
            setRemovingDuplicates(false);
        }
    };

    // Filter entries
    const filteredEntries = entries.filter(entry => {
        const matchesSearch = !searchQuery ||
            entry.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            entry.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (entry.keywords || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesDivision = !filterDivision || entry.division === filterDivision;
        return matchesSearch && matchesDivision;
    });

    // Group by division
    const groupedEntries = filteredEntries.reduce((acc, entry) => {
        const div = entry.division || 'অন্যান্য';
        if (!acc[div]) acc[div] = [];
        acc[div].push(entry);
        return acc;
    }, {} as Record<string, AIKnowledgeEntry[]>);

    return (
        <div>
            {/* Header */}
            <div className="flex flex-col gap-2 mb-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900 font-serif flex items-center gap-1.5">
                            <Brain className="w-4 h-4 text-purple-600" />
                            Train AI
                        </h1>
                        <p className="text-gray-500 text-xs">AI কে শেখান আপনার ইচ্ছেমতো উত্তর দিতে</p>
                    </div>
                    {/* All controls in one row */}
                    <div className="flex items-center gap-1 flex-nowrap">
                        <button
                            onClick={handleRemoveDuplicates}
                            disabled={removingDuplicates}
                            className="flex items-center gap-1 bg-red-50 text-red-600 px-2 py-1 rounded-lg text-xs font-medium hover:bg-red-100 border border-red-200 disabled:opacity-50"
                        >
                            {removingDuplicates ? <Loader2 className="w-3 h-3 animate-spin" /> : <Copy className="w-3 h-3" />}
                            <span className="hidden sm:inline">ডুপ্লিকেট</span>
                        </button>
                        <button
                            onClick={() => setShowImportModal(true)}
                            className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-medium hover:bg-blue-100 border border-blue-200"
                        >
                            <Upload className="w-3 h-3" />
                            <span className="hidden sm:inline">JSON</span>
                        </button>
                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-1 bg-purple-600 text-white px-2 py-1 rounded-lg text-xs font-medium hover:bg-purple-700"
                        >
                            <Plus className="w-3 h-3" />
                            <span className="hidden sm:inline">নতুন</span>
                        </button>
                    </div>
                </div>

                {/* Filters Row */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="প্রশ্ন বা উত্তর খুঁজুন..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:ring-1 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    {/* Custom Dropdown */}
                    <div className="relative">
                        <button
                            type="button"
                            onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                            className="flex items-center gap-1 px-2.5 py-1.5 text-xs border border-gray-200 rounded-lg bg-white hover:border-purple-300 whitespace-nowrap"
                        >
                            <span className="truncate max-w-[80px]">{filterDivision || 'সকল'}</span>
                            <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${filterDropdownOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {filterDropdownOpen && (
                            <>
                                {/* Backdrop to close dropdown */}
                                <div
                                    className="fixed inset-0 z-10"
                                    onClick={() => setFilterDropdownOpen(false)}
                                />

                                {/* Dropdown menu */}
                                <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden min-w-[200px]">
                                    <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-200 scrollbar-track-gray-50">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setFilterDivision('');
                                                setFilterDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-3 py-2 text-sm hover:bg-purple-50 transition-colors ${filterDivision === '' ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
                                                }`}
                                        >
                                            সকল বিভাগ
                                        </button>
                                        {divisions.map((div: string) => (
                                            <button
                                                key={div}
                                                type="button"
                                                onClick={() => {
                                                    setFilterDivision(div);
                                                    setFilterDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-3 py-2 text-sm hover:bg-purple-50 transition-colors ${filterDivision === div ? 'bg-purple-100 text-purple-700 font-medium' : 'text-gray-700'
                                                    }`}
                                            >
                                                {div}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-2 mb-4">
                <div className="bg-white px-3 py-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400 text-xs">মোট প্রশ্ন</p>
                    <p className="text-lg font-bold text-gray-900">{entries.length}</p>
                </div>
                <div className="bg-white px-3 py-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400 text-xs">সক্রিয়</p>
                    <p className="text-lg font-bold text-green-600">{entries.filter(e => e.is_active === 1).length}</p>
                </div>
                <div className="bg-white px-3 py-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400 text-xs">নিষ্ক্রিয়</p>
                    <p className="text-lg font-bold text-gray-400">{entries.filter(e => e.is_active === 0).length}</p>
                </div>
                <div className="bg-white px-3 py-2 rounded-lg border border-gray-100">
                    <p className="text-gray-400 text-xs">বিভাগ</p>
                    <p className="text-lg font-bold text-purple-600">{Object.keys(groupedEntries).length}</p>
                </div>
            </div>

            {/* Content */}
            {loading ? (
                <div className="flex justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
                </div>
            ) : filteredEntries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-gray-200">
                    <Brain className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-600">কোনো প্রশ্ন নেই</h3>
                    <p className="text-gray-400 mt-1">AI কে শেখাতে নতুন প্রশ্ন যোগ করুন</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(groupedEntries).map(([division, divEntries]) => (
                        <div key={division}>
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full"></span>
                                {division} ({divEntries.length})
                            </h3>
                            <div className="space-y-2">
                                {divEntries.map((entry) => (
                                    <div
                                        key={entry.id}
                                        className={`bg-white rounded-lg border px-3 py-2 transition-all ${entry.is_active === 1
                                            ? 'border-gray-100 hover:border-gray-200'
                                            : 'border-gray-100 opacity-50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-sm text-gray-900">
                                                    প্রশ্ন: {entry.question}
                                                </h4>
                                                <p className="text-gray-600 text-xs line-clamp-1 mt-0.5">
                                                    উত্তর: {entry.answer}
                                                </p>
                                                {entry.keywords && (
                                                    <div className="flex flex-wrap gap-1 mt-1.5">
                                                        {entry.keywords.split(',').slice(0, 3).map((kw, i) => (
                                                            <span key={i} className="text-xs bg-purple-50 text-purple-600 px-1.5 py-0.5 rounded">
                                                                {kw.trim()}
                                                            </span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 shrink-0">
                                                <button
                                                    onClick={() => handleToggleActive(entry)}
                                                    className={`p-1.5 rounded transition-colors ${entry.is_active === 1
                                                        ? 'text-green-600 hover:bg-green-50'
                                                        : 'text-gray-400 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {entry.is_active === 1 ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                                                </button>
                                                <button
                                                    onClick={() => openEditModal(entry)}
                                                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                                >
                                                    <Edit2 className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => entry.id && handleDelete(entry.id)}
                                                    className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95">
                        {/* Modal Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-purple-50">
                            <h3 className="font-bold text-lg text-purple-900 flex items-center gap-2">
                                <Brain className="w-5 h-5" />
                                {editingEntry ? 'প্রশ্ন সম্পাদনা' : 'নতুন প্রশ্ন যোগ করুন'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-purple-100 rounded-full">
                                <X className="w-5 h-5 text-purple-600" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 space-y-4 max-h-[60vh] overflow-y-auto">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">বিভাগ *</label>
                                <select
                                    value={formData.division}
                                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                                >
                                    {divisions.map((div: string) => (
                                        <option key={div} value={div}>{div}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">প্রশ্ন *</label>
                                <input
                                    type="text"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="যেমন: NID কিভাবে পাবো?"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">উত্তর *</label>
                                <textarea
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    placeholder="AI এই উত্তর দেবে..."
                                    rows={4}
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">কীওয়ার্ড (ঐচ্ছিক)</label>
                                <input
                                    type="text"
                                    value={formData.keywords}
                                    onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
                                    placeholder="কমা দিয়ে আলাদা করুন: NID, জাতীয় পরিচয়পত্র, আবেদন"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                                />
                                <p className="text-xs text-gray-400 mt-1">এই শব্দগুলো দিয়ে খোঁজা হলে এই উত্তর দেখাবে</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">অগ্রাধিকার</label>
                                <input
                                    type="number"
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: parseInt(e.target.value) || 0 })}
                                    min={0}
                                    max={100}
                                    className="w-24 px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500"
                                />
                                <p className="text-xs text-gray-400 mt-1">বেশি মান = বেশি অগ্রাধিকার (0-100)</p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                            >
                                বাতিল
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {saving ? 'সংরক্ষণ হচ্ছে...' : 'সংরক্ষণ করুন'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* JSON Import Modal */}
            {showImportModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
                        {/* Modal Header */}
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-blue-50">
                            <h3 className="font-bold text-lg text-blue-900 flex items-center gap-2">
                                <FileJson className="w-5 h-5" />
                                JSON দিয়ে বাল্ক ইম্পোর্ট
                            </h3>
                            <button onClick={() => { setShowImportModal(false); setImportResult(null); setJsonInput(''); }} className="p-1 hover:bg-blue-100 rounded-full">
                                <X className="w-5 h-5 text-blue-600" />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
                            {/* File Upload */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">JSON ফাইল আপলোড করুন</label>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".json,application/json"
                                    onChange={handleFileUpload}
                                    className="w-full px-4 py-2.5 border border-dashed border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-400 transition-colors"
                                />
                            </div>

                            {/* Or Text Divider */}
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-px bg-gray-200"></div>
                                <span className="text-sm text-gray-400">অথবা</span>
                                <div className="flex-1 h-px bg-gray-200"></div>
                            </div>

                            {/* JSON Textarea */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">JSON পেস্ট করুন</label>
                                <textarea
                                    value={jsonInput}
                                    onChange={(e) => setJsonInput(e.target.value)}
                                    placeholder='[{"division": "বিভাগ", "question": "প্রশ্ন", "answer": "উত্তর"}, ...]'
                                    rows={8}
                                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
                                />
                            </div>

                            {/* Sample Format */}
                            <details className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                                <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-blue-600">
                                    📋 নমুনা JSON ফরম্যাট দেখুন
                                </summary>
                                <pre className="mt-3 bg-white p-3 rounded-lg border border-gray-200 text-xs overflow-x-auto font-mono">
                                    {sampleJson}
                                </pre>
                                <button
                                    onClick={() => setJsonInput(sampleJson)}
                                    className="mt-2 text-sm text-blue-600 hover:underline"
                                >
                                    নমুনা ব্যবহার করুন
                                </button>
                            </details>

                            {/* Progress */}
                            {importing && (
                                <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                        <span className="font-medium text-blue-900">ইম্পোর্ট হচ্ছে...</span>
                                    </div>
                                    <div className="w-full bg-blue-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-600 h-2 rounded-full transition-all"
                                            style={{ width: `${importProgress.total > 0 ? (importProgress.current / importProgress.total) * 100 : 0}%` }}
                                        />
                                    </div>
                                    <p className="text-sm text-blue-600 mt-1">{importProgress.current} / {importProgress.total}</p>
                                </div>
                            )}

                            {/* Result */}
                            {importResult && (
                                <div className={`rounded-xl p-4 border ${importResult.success ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                                    <div className="flex items-center gap-3 mb-2">
                                        {importResult.success ? (
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        ) : (
                                            <AlertCircle className="w-5 h-5 text-red-600" />
                                        )}
                                        <span className={`font-medium ${importResult.success ? 'text-green-900' : 'text-red-900'}`}>
                                            {importResult.success ? 'সফলভাবে ইম্পোর্ট হয়েছে!' : 'কিছু সমস্যা হয়েছে'}
                                        </span>
                                    </div>
                                    <div className="text-sm space-y-1">
                                        <p className="text-green-600">✅ ইম্পোর্ট: {importResult.imported}</p>
                                        {importResult.failed > 0 && (
                                            <p className="text-red-600">❌ ব্যর্থ: {importResult.failed}</p>
                                        )}
                                    </div>
                                    {importResult.errors.length > 0 && (
                                        <details className="mt-2">
                                            <summary className="text-sm text-red-600 cursor-pointer">এরর বিস্তারিত</summary>
                                            <ul className="mt-1 text-xs text-red-500 space-y-1">
                                                {importResult.errors.slice(0, 5).map((err, i) => (
                                                    <li key={i}>• {err}</li>
                                                ))}
                                                {importResult.errors.length > 5 && (
                                                    <li>...এবং আরো {importResult.errors.length - 5}টি</li>
                                                )}
                                            </ul>
                                        </details>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-gray-50">
                            <button
                                onClick={() => { setShowImportModal(false); setImportResult(null); setJsonInput(''); }}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                            >
                                বন্ধ করুন
                            </button>
                            <button
                                onClick={handleJsonImport}
                                disabled={importing || !jsonInput.trim()}
                                className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                            >
                                {importing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                {importing ? 'ইম্পোর্ট হচ্ছে...' : 'ইম্পোর্ট করুন'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
