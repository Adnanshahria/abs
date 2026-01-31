
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';
import YouTubeEmbed from '../components/YouTubeEmbed';

export default function VideoTutorials() {
    const { language } = useLanguage();
    const t = translations[language];

    const videoList = [
        { title: "দেশের চাবি আপনার হাতে", id: "Wujw0I6y4P8" },
        { title: "যেভাবে ভোট দিবেন", id: "wBudmDxFQy4" },
        { title: "গণভোটে হ্যাঁ সিল দেয়ার আহ্বান জানিয়ে মাননীয় প্রধান উপদেষ্টা প্রফেসর মুহাম্মদ ইউনূসের বার্তা", id: "PnpX2NOytqQ" },
        { title: "আগামী সংসদ নির্বাচন এবং গণভোট উপলক্ষে সিলেট বিভাগের জন্য নির্মিত গান", id: "cRw_8y_StLQ" },
        { title: "আগামী সংসদ নির্বাচন এবং গণভোট উপলক্ষে রাজশাহী বিভাগের জন্য নির্মিত গান", id: "ot99RQlDIp4" },
        { title: "মাত্র তিন মিনিটে জেনে নিন গণভোট কী এবং কেন", id: "GYZJ0afN0sM" },
        { title: "সংসদ নির্বাচন এবং গণভোট উপলক্ষে চট্টগ্রাম বিভাগের জন্য নির্মিত গান", id: "iXttsZUIrQ0" },
        { title: "শহিদদের স্বপ্নের বাংলাদেশ গড়ে তোলাই আজ আমাদের নৈতিক দায়িত্ব", id: "FNcnfWNkblQ" },
        { title: "July & Journalism", id: "GKoj4r-rz2E" }
    ];

    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center min-h-[80vh]">
            <div className="w-full max-w-6xl flex flex-col items-center gap-12 relative z-10 pt-10">

                <div className="w-full text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold font-serif text-green-800 drop-shadow-sm">
                        {t.videoTutorials.title}
                    </h1>
                    <p className="text-green-600 mt-2 font-medium">{t.videoTutorials.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full px-2 sm:px-0">
                    {videoList.map((video, index) => (
                        <div key={index} className="bg-white p-3 rounded-2xl shadow-lg border border-green-100 transform transition-all md:hover:-translate-y-1 md:hover:shadow-xl">
                            <YouTubeEmbed videoId={video.id} title={video.title} />
                            <h3 className="mt-4 text-lg font-bold text-gray-800 font-serif px-1 min-h-[3.5rem] line-clamp-2" title={video.title}>{video.title}</h3>
                        </div>
                    ))}
                </div>


            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
