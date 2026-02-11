import { useNavigate } from 'react-router-dom';
import PreronaAvatar from './PreronaAvatar';

export default function AssistantAvatar() {
    const navigate = useNavigate();

    const handleChatClick = () => {
        navigate('/chat');
    };

    return (
        <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-2 text-lg">
                <span className="italic text-2xl">Hello,</span> I'm Prerona
            </p>

            <div className="bg-gradient-to-b from-green-100 to-green-200 rounded-xl p-1 border-4 border-green-500 shadow-lg">
                <PreronaAvatar className="w-44 h-52 xl:w-64 xl:h-72 rounded-lg" />
            </div>

            <p className="text-center text-gray-600 text-sm mt-3">
                I will help you to become<br />
                <span className="font-semibold">a responsible voter</span>
            </p>

            <button
                onClick={handleChatClick}
                className="mt-3 px-6 py-2.5 bg-white border-2 border-green-500 text-green-700 font-semibold rounded-lg shadow-md hover:bg-green-50 hover:border-green-600 hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
                Chat With Me
            </button>
        </div>
    );
}
