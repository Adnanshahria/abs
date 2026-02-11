import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Send, Globe, LogIn, MessageCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { sendMessageToAI } from '../services/aiService';
import type { ChatMessage } from '../services/aiService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import avatarImg from '../assets/prerona_avatar.png';
import preronaImg from '../assets/prerona.png';

export default function Chat() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            role: 'assistant',
            content: 'আসসালামু আলাইকুম! 👋 আমি প্রেরণা। বাংলাদেশের নির্বাচন সম্পর্কে যেকোনো প্রশ্ন জিজ্ঞেস করুন।'
        }
    ]);
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
        inputRef.current?.focus();
    }, []);

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

    // Quick suggestion chips
    const suggestions = [
        'ভোট কেন্দ্র কোথায়?',
        'NID কিভাবে পাবো?',
        'ভোটের নিয়ম কি?',
        'প্রার্থী তালিকা'
    ];

    const handleSuggestion = (text: string) => {
        setInputValue(text);
        setTimeout(() => handleSend(), 100);
    };

    // If not logged in, show login prompt
    if (!isLoggedIn) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4">
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 max-w-md w-full text-center border border-green-100/50 relative overflow-hidden">
                    {/* Decorative gradient orbs */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-200/30 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-green-300/20 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/20 rotate-3">
                            <MessageCircle className="w-10 h-10 text-white -rotate-3" />
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 mb-2">প্রেরণার সাথে কথা বলুন</h2>
                        <p className="text-gray-500 mb-6 text-sm leading-relaxed">
                            AI সহকারী <strong className="text-green-700">প্রেরণা</strong> আপনাকে নির্বাচন সম্পর্কে সব তথ্য দিতে প্রস্তুত
                        </p>

                        <div className="text-left bg-gradient-to-br from-green-50 to-green-100/50 rounded-2xl p-4 mb-6 border border-green-100">
                            <p className="text-xs font-bold text-green-800 mb-2 uppercase tracking-wider">আপনি যা জানতে পারবেন</p>
                            <ul className="text-sm text-green-700 space-y-1.5">
                                <li className="flex items-center gap-2"><span className="text-green-500">✦</span> নির্বাচনের তারিখ ও সময়সূচী</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✦</span> প্রার্থীদের তথ্য</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✦</span> ভোট কেন্দ্রের অবস্থান</li>
                                <li className="flex items-center gap-2"><span className="text-green-500">✦</span> ভোটার গাইড ও নিয়মাবলী</li>
                            </ul>
                        </div>

                        <Link
                            to="/sign-up"
                            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-green-500/20 hover:shadow-green-500/40 hover:scale-[1.02] active:scale-95"
                        >
                            <LogIn className="w-5 h-5" />
                            লগইন করুন
                        </Link>

                        <p className="text-xs text-gray-400 mt-4">
                            একাউন্ট নেই? <Link to="/sign-up" className="text-green-600 hover:underline font-medium">এখনই তৈরি করুন</Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100dvh-64px)] overflow-hidden bg-gradient-to-b from-gray-50 to-white">

            {/* Chat Header Bar */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/80 backdrop-blur-md border-b border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <button onClick={() => navigate(-1)} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-500">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <div className="relative">
                        <img src={avatarImg} alt="Prerona" className="w-10 h-10 rounded-full object-cover border-2 border-green-400 shadow-sm" />
                        <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    </div>
                    <div>
                        <h1 className="font-bold text-gray-800 text-sm flex items-center gap-1.5">
                            প্রেরণা
                            <Sparkles className="w-3.5 h-3.5 text-green-500" />
                        </h1>
                        <p className="text-[11px] text-green-600">AI Voting Assistant • Online</p>
                    </div>
                </div>
                <button
                    onClick={() => setSearchEnabled(!searchEnabled)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${searchEnabled
                            ? 'bg-green-50 text-green-700 border border-green-200'
                            : 'bg-gray-50 text-gray-400 border border-gray-200'
                        }`}
                >
                    <Globe className="w-3 h-3" />
                    Web {searchEnabled ? 'ON' : 'OFF'}
                </button>
            </div>

            {/* Messages Area */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
                <div className="max-w-3xl mx-auto px-4 py-4 space-y-4">

                    {/* Welcome card (only if 1 message) */}
                    {messages.length === 1 && (
                        <div className="bg-gradient-to-br from-green-50 via-white to-green-50 rounded-2xl p-5 border border-green-100/80 mb-4">
                            <div className="flex items-center gap-3 mb-3">
                                <img src={avatarImg} alt="Prerona" className="w-12 h-12 rounded-xl object-cover shadow-md border-2 border-green-200" />
                                <div>
                                    <h2 className="font-bold text-green-900">প্রেরণা</h2>
                                    <p className="text-xs text-green-600">Powered by AI • Amar Ballot</p>
                                </div>
                            </div>
                            <p className="text-sm text-green-800 mb-4 leading-relaxed">
                                আমি আপনার নির্বাচন সহকারী। ভোট কেন্দ্র, প্রার্থী তালিকা, NID যাচাই — যেকোনো প্রশ্নে আমি সাহায্য করতে প্রস্তুত! 🗳️
                            </p>
                            {/* Suggestion Chips */}
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSuggestion(s)}
                                        className="px-3 py-1.5 bg-white hover:bg-green-50 border border-green-200 rounded-full text-xs text-green-700 font-medium transition-all hover:border-green-400 hover:shadow-sm active:scale-95"
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Messages */}
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex gap-2.5 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {/* Bot Avatar */}
                            {message.role === 'assistant' && (
                                <img
                                    src={preronaImg}
                                    alt="AI"
                                    className="w-8 h-8 rounded-full flex-shrink-0 mt-1 border border-green-200 shadow-sm"
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).style.display = 'none';
                                    }}
                                />
                            )}

                            {/* Message Bubble */}
                            <div className={`max-w-[75%] relative group ${message.role === 'user'
                                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl rounded-br-md shadow-md shadow-green-500/10'
                                    : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                                }`}>
                                <div className="px-4 py-2.5 text-sm leading-7 whitespace-pre-wrap">
                                    {message.content}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                        <div className="flex gap-2.5 justify-start">
                            <img src={preronaImg} alt="AI" className="w-8 h-8 rounded-full flex-shrink-0 mt-1 border border-green-200 shadow-sm" />
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="flex gap-1">
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                        <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                    </div>
                                    <span className="text-xs text-gray-400 animate-pulse">{loadingStatus}</span>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 bg-white/80 backdrop-blur-md px-4 py-3 flex-shrink-0">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-end gap-2 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-2 focus-within:border-green-400 focus-within:bg-white focus-within:shadow-lg focus-within:shadow-green-500/5 transition-all duration-300">
                        <textarea
                            ref={inputRef}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="প্রশ্ন লিখুন..."
                            className="flex-1 resize-none border-none outline-none text-gray-800 placeholder-gray-400 text-sm bg-transparent max-h-24 py-1"
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isLoading}
                            className={`p-2.5 rounded-xl transition-all duration-200 flex-shrink-0 ${inputValue.trim() && !isLoading
                                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 hover:scale-105 active:scale-95'
                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <p className="text-center text-[10px] text-gray-300 mt-1.5">
                        Prerona AI • Amar Ballot Ltd.
                    </p>
                </div>
            </div>
        </div>
    );
}
