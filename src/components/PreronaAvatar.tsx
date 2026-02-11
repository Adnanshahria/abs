import React from 'react';
import avatarImg from '../assets/prerona_avatar.png';

const PreronaAvatar: React.FC = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg">
            <style>{`
                @keyframes avatar-breathe {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.025); }
                }
                @keyframes avatar-float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-4px); }
                }
                @keyframes avatar-glow {
                    0%, 100% { box-shadow: 0 0 8px rgba(34, 197, 94, 0.2), 0 0 20px rgba(34, 197, 94, 0.05); }
                    50% { box-shadow: 0 0 16px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.15); }
                }
                @keyframes status-pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.3); }
                }
                .avatar-container {
                    animation: avatar-float 5s ease-in-out infinite, avatar-glow 4s ease-in-out infinite;
                }
                .avatar-image {
                    animation: avatar-breathe 6s ease-in-out infinite;
                }
                .status-dot {
                    animation: status-pulse 2s ease-in-out infinite;
                }
            `}</style>

            {/* Animated Avatar Container */}
            <div className="avatar-container w-full h-full rounded-lg overflow-hidden">
                <img
                    src={avatarImg}
                    alt="Prerona - AI Voting Assistant"
                    className="avatar-image w-full h-full object-cover rounded-lg"
                    draggable={false}
                />
            </div>

            {/* Online Status Badge */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm">
                <span className="status-dot w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
                <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider">Online</span>
            </div>
        </div>
    );
};

export default PreronaAvatar;
