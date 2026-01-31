import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Calendar as CalendarIcon } from 'lucide-react';

interface DatePickerProps {
    label: string;
    value: string;
    onChange: (date: string) => void;
}

export default function DatePicker({ label, value, onChange }: DatePickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date()); // For navigation
    const [selectedDate, setSelectedDate] = useState<Date | null>(value ? new Date(value) : null);

    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value));
            setCurrentDate(new Date(value)); // Jump to selected date on open
        }
    }, [value]);

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const renderDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);
        const days = [];

        // Empty slots for days before the 1st
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
        }

        // Days of the month
        for (let d = 1; d <= totalDays; d++) {
            const date = new Date(year, month, d);
            const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
            const isToday = new Date().toDateString() === date.toDateString();

            days.push(
                <button
                    key={d}
                    onClick={() => handleDateSelect(date)}
                    type="button"
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-sm transition-all
                        ${isSelected ? 'bg-green-600 text-white font-bold shadow-md' : 'hover:bg-green-50 text-gray-700'}
                        ${!isSelected && isToday ? 'border border-green-500 text-green-600 font-medium' : ''}
                    `}
                >
                    {d}
                </button>
            );
        }
        return days;
    };

    const handleDateSelect = (date: Date) => {
        // Format to YYYY-MM-DD using local time to avoid timezone shifts
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formatted = `${year}-${month}-${day}`;

        onChange(formatted);
        setSelectedDate(date);
        setIsOpen(false);
    };

    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));

    // Years select logic
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentDate(new Date(parseInt(e.target.value), currentDate.getMonth(), 1));
    };

    const generateYearOptions = () => {
        const currentYear = new Date().getFullYear();
        const years = [];
        for (let i = currentYear; i >= 1900; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    };

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    return (
        <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>

            {/* Input Trigger */}
            <div
                onClick={() => setIsOpen(true)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 flex items-center justify-between cursor-pointer hover:border-green-500 hover:ring-2 hover:ring-green-100 transition-all bg-white"
            >
                <span className={value ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                    {value ? new Date(value).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Select Date of Birth'}
                </span>
                <CalendarIcon className="w-5 h-5 text-gray-500" />
            </div>

            {/* Modal Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Blurred Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Calendar Popup */}
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden relative z-10 animate-in zoom-in-95 duration-200 border border-green-100 p-6">

                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold font-serif text-green-900">Select Date</h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mb-4 bg-green-50 p-2 rounded-xl">
                            <button onClick={prevMonth} type="button" className="p-1 hover:bg-white rounded-lg shadow-sm transition-all text-green-700">
                                <ChevronLeft className="w-6 h-6" />
                            </button>

                            <div className="flex gap-2">
                                <span className="font-bold text-green-900 text-lg w-24 text-center">
                                    {monthNames[currentDate.getMonth()]}
                                </span>
                                <select
                                    value={currentDate.getFullYear()}
                                    onChange={handleYearChange}
                                    className="bg-transparent font-medium text-green-800 outline-none cursor-pointer hover:underline"
                                >
                                    {generateYearOptions()}
                                </select>
                            </div>

                            <button onClick={nextMonth} type="button" className="p-1 hover:bg-white rounded-lg shadow-sm transition-all text-green-700">
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Weekday Labels */}
                        <div className="grid grid-cols-7 mb-2 text-center">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                                <div key={day} className="text-xs font-bold text-gray-400 uppercase tracking-wider py-1">
                                    {day}
                                </div>
                            ))}
                        </div>

                        {/* Days Grid */}
                        <div className="grid grid-cols-7 gap-1 place-items-center">
                            {renderDays()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
