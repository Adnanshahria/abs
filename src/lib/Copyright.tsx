import SEO from '../components/SEO';

export default function Copyright() {
    return (
        <main className="flex-1 w-full px-4 py-8 flex flex-col items-center justify-center min-h-[80vh]">
            <SEO
                title="Creator"
                description="Original Creator of Amar Ballot"
            />
            <div className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 p-12 text-center animate-in fade-in zoom-in duration-500">
                <h1 className="text-3xl font-serif text-green-900 font-bold mb-4">
                    Original Creator
                </h1>
                <p className="text-lg text-gray-700 font-medium">
                    The original creator of this website is <span className="text-green-700 font-bold">Mohammed Adnan Shahria</span>.
                </p>
            </div>
        </main>
    );
}
