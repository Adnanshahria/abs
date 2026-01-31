import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
}

export default function CustomSelect({ label, value, onChange, options, placeholder = 'Select Option' }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const triggerRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

    // Filter options based on search
    const filteredOptions = options.filter(option =>
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Update coordinates when opening
    useEffect(() => {
        if (isOpen && triggerRef.current) {
            const updatePosition = () => {
                const rect = triggerRef.current?.getBoundingClientRect();
                if (rect) {
                    setCoords({
                        top: rect.bottom + 6, // 6px gap
                        left: rect.left,
                        width: rect.width
                    });
                }
            };

            updatePosition();
            // Optional: Update on scroll/resize to keep it attached, 
            // but for a modal-like feel, closing on scroll is cleaner, 
            // or just keeping it fixed (modal behavior) is fine. 
            // We'll stick to fixed initial position.
            window.addEventListener('resize', updatePosition);
            window.addEventListener('scroll', updatePosition, true);

            return () => {
                window.removeEventListener('resize', updatePosition);
                window.removeEventListener('scroll', updatePosition, true);
            };
        } else {
            setSearchTerm('');
        }
    }, [isOpen]);

    const handleSelect = (option: string) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className="relative group">
            <label className="block text-xs font-bold text-green-800 uppercase tracking-wider mb-1.5 ml-1">{label}</label>

            {/* Trigger Button */}
            <div
                ref={triggerRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all duration-300 bg-white/80 backdrop-blur-sm
                    ${isOpen
                        ? 'border-green-500 ring-2 ring-green-100 shadow-xl'
                        : 'border-green-100 hover:border-green-400 hover:shadow-md'
                    }
                `}
            >
                <div className="flex items-center gap-2 overflow-hidden">
                    {value ? (
                        <span className="text-green-900 font-bold truncate">{value}</span>
                    ) : (
                        <span className="text-gray-400 font-medium truncate">{placeholder}</span>
                    )}
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-green-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </div>

            {/* Portal for Dropdown & Backdrop */}
            {isOpen && createPortal(
                <div className="fixed inset-0 z-[99999] isolate">
                    {/* Full Screen Blurred Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/20 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Floating Dropdown */}
                    <div
                        className="fixed bg-white rounded-xl shadow-2xl border border-green-200 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-200 flex flex-col"
                        style={{
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                            width: `${coords.width}px`,
                            maxHeight: '300px'
                        }}
                    >
                        {/* Search Input */}
                        <div className="p-2 border-b border-green-50 bg-green-50/30 flex-shrink-0">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-green-200 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-200 bg-white/50 text-gray-800 placeholder:text-gray-400"
                                autoFocus
                            />
                        </div>

                        {/* Options List */}
                        <div className="overflow-y-auto overflow-x-hidden flex-1 p-1 space-y-0.5 scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <button
                                        key={option}
                                        onClick={() => handleSelect(option)}
                                        className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-between group/item shrink-0
                                            ${value === option
                                                ? 'bg-green-100 text-green-800'
                                                : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                                            }
                                        `}
                                    >
                                        <span className="truncate pr-2">{option}</span>
                                        {value === option && (
                                            <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="py-6 text-center text-gray-400 text-sm italic">
                                    No results found
                                </div>
                            )}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
