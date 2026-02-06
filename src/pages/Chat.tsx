import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Globe } from 'lucide-react';
import { sendMessageToAI } from '../services/aiService';
import type { ChatMessage } from '../services/aiService';
import preronaImg from '../assets/prerona.png';

export default function Chat() {
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

    const scrollToBottom = () => {
        // Scroll the container directly instead of using scrollIntoView
        // This prevents the whole page from scrolling
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

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

    return (
        <div className="flex flex-col h-[calc(100vh-50px)] bg-gray-50">
            {/* Chat Messages Area - Takes most space */}
            <div ref={chatContainerRef} className="flex-1 overflow-y-auto">
                <div className="max-w-4xl mx-auto px-4 py-2">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`py-3 ${message.role === 'assistant' ? 'bg-white -mx-4 px-4 border-b border-gray-100' : ''}`}
                        >
                            <div className="flex gap-3 max-w-3xl mx-auto">
                                {/* Avatar */}
                                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${message.role === 'user'
                                    ? 'bg-green-600'
                                    : 'bg-green-100 border border-green-300'
                                    }`}>
                                    {message.role === 'user' ? (
                                        <User className="w-5 h-5 text-white" />
                                    ) : (
                                        <img src={preronaImg} alt="AI" className="w-8 h-8 rounded-full"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).style.display = 'none';
                                                (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>';
                                            }}
                                        />
                                    )}
                                </div>
                                {/* Message Content */}
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-gray-700 mb-1">
                                        {message.role === 'user' ? 'আপনি' : 'প্রেরণা'}
                                    </p>
                                    <div className="text-gray-800 text-base leading-7 whitespace-pre-wrap">
                                        {message.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Loading */}
                    {isLoading && (
                        <div className="py-6 bg-white -mx-4 px-4">
                            <div className="flex gap-4 max-w-3xl mx-auto">
                                <div className="w-8 h-8 rounded-full bg-green-100 border border-green-300 flex-shrink-0 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-green-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="font-semibold text-sm text-gray-700 mb-1">প্রেরণা</p>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                                            <span className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                                        </div>
                                        <span className="text-sm">{loadingStatus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Input Area - Fixed at bottom */}
            <div className="border-t border-gray-200 bg-white p-2">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 focus-within:border-green-500">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="প্রশ্ন লিখুন..."
                            className="flex-1 resize-none border-none outline-none text-gray-800 placeholder-gray-400 text-sm bg-transparent max-h-20"
                            rows={1}
                            disabled={isLoading}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!inputValue.trim() || isLoading}
                            className={`p-1.5 rounded-lg transition-all ${inputValue.trim() && !isLoading
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                        >
                            <Send className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-1 px-1">
                        <button
                            onClick={() => setSearchEnabled(!searchEnabled)}
                            className={`flex items-center gap-1 text-xs ${searchEnabled ? 'text-green-600' : 'text-gray-400'}`}
                        >
                            <Globe className="w-3 h-3" />
                            <span>Search {searchEnabled ? 'ON' : 'OFF'}</span>
                            <span className={`w-1.5 h-1.5 rounded-full ${searchEnabled ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        </button>
                        <span className="text-xs text-gray-400">Amar Ballot</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
