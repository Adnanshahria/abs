export default function ObserverInfo() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Election Observer Information</h1>

                <div className="space-y-6">
                    <div className="bg-white/90 p-8 rounded-2xl shadow-sm border border-green-100">
                        <h2 className="text-2xl font-serif text-green-800 mb-4">Guidelines for International Observers</h2>
                        <p className="text-gray-700 mb-4">
                            International election observers play a crucial role in ensuring the transparency and legitimacy of the election process.
                        </p>
                        <h3 className="font-bold text-gray-800 mb-2">Accreditation Process</h3>
                        <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-6">
                            <li>Apply via the Election Commission portal 3 months prior to election.</li>
                            <li>Submit valid visa and organizational credentials.</li>
                            <li>Attend mandatory briefing session in Dhaka.</li>
                        </ol>
                        <button className="text-green-700 font-medium underline hover:text-green-800">Download Full PDF Guidelines</button>
                    </div>

                    <div className="bg-white/90 p-8 rounded-2xl shadow-sm border border-green-100">
                        <h2 className="text-2xl font-serif text-green-800 mb-4">Local Observer NGO List</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {['Shushashoner Jonno Nagorik (SHUJAN)', 'Fair Election Monitoring Alliance', 'Rights & Vote', 'Democracy Watch'].map((ngo, idx) => (
                                <div key={idx} className="bg-green-50 p-3 rounded-lg border border-green-100 text-gray-800 font-medium">
                                    {ngo}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
