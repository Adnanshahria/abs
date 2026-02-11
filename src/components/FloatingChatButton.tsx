import { useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import avatarImg from '../assets/prerona_avatar.png';

export default function FloatingChatButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => navigate('/chat')}
            className="fixed bottom-6 right-6 z-50 group"
            aria-label="Chat with Prerona"
        >
            {/* Pulse Ring */}
            <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30"></span>

            {/* Button Body */}
            <div className="relative flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white pl-1.5 pr-4 py-1.5 rounded-full shadow-2xl hover:shadow-green-500/30 transition-all duration-300 hover:scale-105">
                {/* Avatar Thumbnail */}
                <img
                    src={avatarImg}
                    alt="Prerona"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white/80 shadow-inner"
                />
                {/* Text + Icon */}
                <div className="flex items-center gap-1.5">
                    <MessageCircle className="w-4 h-4" />
                    <span className="font-semibold text-sm whitespace-nowrap">Chat with Prerona</span>
                </div>
            </div>

            {/* Tooltip on hover */}
            <div className="absolute -top-10 right-0 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap shadow-lg">
                AI Voting Assistant 🗳️
                <div className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-900 rotate-45"></div>
            </div>
        </button>
    );
}
