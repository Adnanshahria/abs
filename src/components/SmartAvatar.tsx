import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import PreronaAvatar from './PreronaAvatar';

export default function SmartAvatar() {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const handleChatClick = () => {
        navigate('/chat');
    };

    return (
        <div className="flex flex-col items-center relative z-10">
            {/* Speech Bubble - pops up and fades */}
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-2xl shadow-xl border-2 border-green-500 animate-speech z-20 whitespace-nowrap origin-bottom">
                <p className="font-bold text-gray-800 text-lg">
                    {language === 'bn' ? 'হ্যালো! 👋' : 'Hello! 👋'}
                </p>
                {/* Bubble tail */}
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-5 h-5 bg-white border-r-2 border-b-2 border-green-500 transform rotate-45"></div>
            </div>

            <p className="text-gray-600 mb-2 text-lg xl:text-xl">
                <span className="italic text-2xl xl:text-3xl">Hello,</span> I'm Prerona
            </p>

            {/* Avatar Container */}
            <div className="bg-gradient-to-b from-blue-50 to-blue-100 rounded-xl p-1 border-4 border-green-500 shadow-lg relative overflow-hidden group cursor-pointer hover:scale-105 transition-transform duration-300 w-44 h-52 xl:w-64 xl:h-72" onClick={handleChatClick}>

                {/* Animated SVG Avatar */}
                <PreronaAvatar />

                {/* Interaction Overlay */}
                <div className="absolute inset-0 bg-green-500/0 group-hover:bg-green-500/5 transition-colors duration-300 pointer-events-none"></div>
            </div>

            <p className="text-center text-gray-600 text-sm xl:text-lg mt-3">
                I will help you to become<br />
                <span className="font-semibold">a responsible voter</span>
            </p>

            <button
                onClick={handleChatClick}
                className="mt-3 px-6 py-2.5 xl:py-4 xl:px-8 bg-white border-2 border-green-500 text-green-700 font-semibold rounded-lg shadow-md hover:bg-green-50 hover:border-green-600 hover:shadow-lg hover:scale-105 transition-all duration-200 xl:text-xl"
            >
                Chat With Me
            </button>
        </div>
    );
}
