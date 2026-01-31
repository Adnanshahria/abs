import { X, CheckCircle, AlertCircle } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    type?: 'success' | 'error' | 'info';
}

export default function Modal({ isOpen, onClose, title, message, type = 'info' }: ModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-green-100">
                <div className="p-6 text-center relative">
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        {type === 'success' && (
                            <div className="bg-green-100 p-3 rounded-full">
                                <CheckCircle className="w-8 h-8 text-green-600" />
                            </div>
                        )}
                        {type === 'error' && (
                            <div className="bg-red-100 p-3 rounded-full">
                                <AlertCircle className="w-8 h-8 text-red-600" />
                            </div>
                        )}
                        {type === 'info' && (
                            <div className="bg-blue-100 p-3 rounded-full">
                                <AlertCircle className="w-8 h-8 text-blue-600" />
                            </div>
                        )}
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">{title}</h3>
                    <p className="text-gray-600 mb-6">{message}</p>

                    {/* Action Button */}
                    <button
                        onClick={onClose}
                        className={`w-full py-2.5 rounded-xl font-medium transition-colors ${type === 'success'
                                ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200'
                                : type === 'error'
                                    ? 'bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-200'
                                    : 'bg-gray-800 hover:bg-gray-900 text-white'
                            }`}
                    >
                        Okay, Got it
                    </button>
                </div>
            </div>
        </div>
    );
}
