import Lottie from 'lottie-react';
import wavingAnimation from '../assets/prerona-waving.json';

const PreronaAvatar: React.FC = () => {
    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-lg bg-green-50">
            {/* Animated Avatar Container */}
            <div className="avatar-container w-full h-full flex items-center justify-center">
                <Lottie
                    animationData={wavingAnimation}
                    loop={true}
                    className="w-[120%] h-[120%] object-cover mt-2"
                />
            </div>

            {/* Online Status Badge */}
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-sm z-10">
                <span className="status-dot w-1.5 h-1.5 rounded-full bg-green-500 inline-block animate-pulse"></span>
                <span className="text-[9px] font-bold text-green-700 uppercase tracking-wider">Online</span>
            </div>
        </div>
    );
};

export default PreronaAvatar;
