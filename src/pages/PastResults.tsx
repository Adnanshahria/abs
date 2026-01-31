import { BarChart3 } from 'lucide-react';

export default function PastResults() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-5xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Election Archive</h1>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* 2018 Card */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-green-800">2018</h2>
                            <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-green-600" />
                        </div>
                        <p className="text-gray-600 mb-4">11th National Parliamentary Election</p>
                        <div className="text-sm text-gray-500">
                            <div>Date: Dec 30, 2018</div>
                            <div>Turnout: 80%</div>
                        </div>
                    </div>

                    {/* 2014 Card */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-green-800">2014</h2>
                            <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-green-600" />
                        </div>
                        <p className="text-gray-600 mb-4">10th National Parliamentary Election</p>
                        <div className="text-sm text-gray-500">
                            <div>Date: Jan 05, 2014</div>
                            <div>Turnout: 40%</div>
                        </div>
                    </div>

                    {/* 2008 Card */}
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-100 hover:shadow-md transition-shadow cursor-pointer group">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-green-800">2008</h2>
                            <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-green-600" />
                        </div>
                        <p className="text-gray-600 mb-4">9th National Parliamentary Election</p>
                        <div className="text-sm text-gray-500">
                            <div>Date: Dec 29, 2008</div>
                            <div>Turnout: 87%</div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-md">
                        View Full Database
                    </button>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
