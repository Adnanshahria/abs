import { useState } from 'react';
import { Play } from 'lucide-react';

interface YouTubeEmbedProps {
    videoId: string;
    title: string;
}

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (isPlaying) {
        return (
            <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black animate-in fade-in duration-300">
                <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&playsinline=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <button
            type="button"
            className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-black cursor-pointer group block border-0 p-0 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play video: ${title}`}
        >
            {/* Thumbnail */}
            <img
                src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                alt={title}
                className="absolute top-0 left-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity pointer-events-none"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                </div>
            </div>

            {/* Title Overlay (Optional) */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none">
                <p className="text-white font-medium text-sm truncate text-left">{title}</p>
            </div>
        </button>
    );
}
