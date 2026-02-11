import { useState, useRef, useEffect } from 'react';
import { Send, X, Globe, MessageCircle, Trash2 } from 'lucide-react';
import { sendMessageToAI } from '../services/aiService';
import type { ChatMessage } from '../services/aiService';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import avatarImg from '../assets/prerona_avatar.png';
import preronaImg from '../assets/prerona.png';

const INITIAL_MESSAGE: ChatMessage = {
    role: 'assistant',
    content: 'আসসালামু আলাইকুম! 👋 আমি প্রেরণা। বাংলাদেশের নির্বাচন সম্পর্কে যেকোনো প্রশ্ন জিজ্ঞেস করুন।'
};

export default function FloatingChatButton() {
    const { isLoggedIn } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState('');
    const [searchEnabled, setSearchEnabled] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isLoading]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (!inputValue.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: inputValue.trim() };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInputValue('');
        setIsLoading(true);
        setLoadingStatus('অনুসন্ধান করছি...');

        try {
            const response = await sendMessageToAI(newMessages, (status) => {
                setLoadingStatus(status);
            }, searchEnabled);
            setMessages([...newMessages, { role: 'assistant', content: response }]);
        } catch (error) {
            console.error('Error:', error);
            setMessages([...newMessages, { role: 'assistant', content: 'দুঃখিত, একটি সমস্যা হয়েছে।' }]);
        } finally {
            setIsLoading(false);
            setLoadingStatus('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleClear = () => {
        setMessages([INITIAL_MESSAGE]);
    };

    return (
        <>
            {/* Chat Widget Popup */}
            {isOpen && (
                <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">

                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white flex-shrink-0">
                        <div className="flex items-center gap-3">
                            <img src={avatarImg} alt="Prerona" className="w-9 h-9 rounded-full border-2 border-white/50 object-cover" />
                            <div>
                                <h3 className="font-bold text-sm">প্রেরণা</h3>
                                <p className="text-[10px] text-green-100">Your AI Voting Assistant</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1">
                            <button
                                onClick={handleClear}
                                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                                title="Clear chat"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Login Gate or Chat */}
                    {!isLoggedIn ? (
                        <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                <MessageCircle className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="font-bold text-gray-800 mb-2">চ্যাট শুরু করুন</h3>
                            <p className="text-sm text-gray-500 mb-4">প্রেরণার সাথে কথা বলতে লগইন করুন</p>
                            <Link
                                to="/sign-up"
                                onClick={() => setIsOpen(false)}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm"
                            >
                                লগইন করুন
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Messages */}
                            <div ref={chatContainerRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
                                {messages.map((message, index) => (
                                    <div key={index} className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        {message.role === 'assistant' && (
                                            <img src={preronaImg} alt="AI" className="w-7 h-7 rounded-full flex-shrink-0 mt-1 border border-green-200"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).style.display = 'none';
                                                }}
                                            />
                                        )}
                                        <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${message.role === 'user'
                                                ? 'bg-green-500 text-white rounded-br-md'
                                                : 'bg-gray-100 text-gray-800 rounded-bl-md'
                                            }`}>
                                            <div className="whitespace-pre-wrap">{message.content}</div>
                                        </div>
                                    </div>
                                ))}

                                {/* Loading */}
                                {isLoading && (
                                    <div className="flex gap-2 justify-start">
                                        <img src={preronaImg} alt="AI" className="w-7 h-7 rounded-full flex-shrink-0 mt-1 border border-green-200" />
                                        <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                                            <div className="flex items-center gap-2">
                                                <div className="flex gap-1">
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                                </div>
                                                <span className="text-xs text-gray-400">{loadingStatus}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="border-t border-gray-100 px-3 py-2 bg-white flex-shrink-0">
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-xl px-3 py-1.5 focus-within:border-green-400 transition-colors">
                                    <textarea
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="প্রশ্ন লিখুন..."
                                        className="flex-1 resize-none border-none outline-none text-gray-800 placeholder-gray-400 text-sm bg-transparent max-h-16"
                                        rows={1}
                                        disabled={isLoading}
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!inputValue.trim() || isLoading}
                                        className={`p-1.5 rounded-lg transition-all flex-shrink-0 ${inputValue.trim() && !isLoading
                                                ? 'bg-green-500 text-white hover:bg-green-600'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <Send className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between mt-1 px-1">
                                    <button
                                        onClick={() => setSearchEnabled(!searchEnabled)}
                                        className={`flex items-center gap-1 text-[10px] ${searchEnabled ? 'text-green-600' : 'text-gray-400'}`}
                                    >
                                        <Globe className="w-2.5 h-2.5" />
                                        <span>Search {searchEnabled ? 'ON' : 'OFF'}</span>
                                        <span className={`w-1 h-1 rounded-full ${searchEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                                    </button>
                                    <span className="text-[10px] text-gray-300">Amar Ballot</span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 group"
                aria-label="Chat with Prerona"
            >
                {/* Pulse Ring - only when closed */}
                {!isOpen && <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></span>}

                {/* Button Body */}
                <div className={`relative flex items-center gap-2 text-white pl-1.5 pr-4 py-1.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 ${isOpen
                        ? 'bg-gradient-to-r from-red-500 to-red-400 hover:shadow-red-500/30'
                        : 'bg-gradient-to-r from-green-600 to-green-500 hover:shadow-green-500/30'
                    }`}>
                    {isOpen ? (
                        <>
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <X className="w-5 h-5" />
                            </div>
                            <span className="font-semibold text-sm whitespace-nowrap">বন্ধ করুন</span>
                        </>
                    ) : (
                        <>
                            <img
                                src={avatarImg}
                                alt="Prerona"
                                className="w-10 h-10 rounded-full object-cover border-2 border-white/80"
                            />
                            <div className="flex items-center gap-1.5">
                                <MessageCircle className="w-4 h-4" />
                                <span className="font-semibold text-sm whitespace-nowrap">Chat with Prerona</span>
                            </div>
                        </>
                    )}
                </div>
            </button>
        </>
    );
}
