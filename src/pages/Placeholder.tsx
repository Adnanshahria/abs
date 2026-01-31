
export default function Placeholder({ title = "Coming Soon" }: { title?: string }) {
    return (
        <main className="flex-1 w-full px-4 py-8 flex items-center justify-center min-h-[50vh]">
            <div className="text-center p-8 bg-white/80 rounded-2xl shadow-lg border border-green-100 backdrop-blur-sm">
                <h1 className="text-4xl text-green-800 font-serif mb-4">{title}</h1>
                <p className="text-gray-600">This page is under construction.</p>
            </div>
        </main>
    );
}
