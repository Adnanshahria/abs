import { Download } from 'lucide-react';

export default function PressKit() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Press & Media Resources</h1>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Brand Assets</h2>
                        <div className="space-y-4">
                            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors border border-gray-200">
                                <span className="font-medium text-gray-700">Amar Ballot Logo (PNG)</span>
                                <Download className="w-5 h-5 text-gray-500" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors border border-gray-200">
                                <span className="font-medium text-gray-700">Brand Guidelines (PDF)</span>
                                <Download className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/90 p-6 rounded-2xl shadow-sm border border-green-100">
                        <h2 className="text-xl font-bold text-gray-800 mb-4">Press Releases</h2>
                        <div className="space-y-4">
                            <div className="border-b border-gray-100 pb-2">
                                <div className="text-xs text-green-600 font-bold mb-1">JAN 25, 2026</div>
                                <h3 className="font-medium text-gray-800 hover:text-green-700 cursor-pointer">Amar Ballot Launches New AI Assistant</h3>
                            </div>
                            <div className="border-b border-gray-100 pb-2">
                                <div className="text-xs text-green-600 font-bold mb-1">JAN 10, 2026</div>
                                <h3 className="font-medium text-gray-800 hover:text-green-700 cursor-pointer">Voter Registration Drive Successful</h3>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-green-800 text-white p-8 rounded-2xl text-center">
                    <h3 className="text-xl font-bold mb-2">Media Inquiries</h3>
                    <p className="opacity-90 mb-4">For interviews and official statements, please contact our PR team.</p>
                    <a href="mailto:press@amarballot.com" className="bg-white text-green-900 px-6 py-2 rounded-full font-bold hover:bg-green-100 transition-colors">
                        press@amarballot.com
                    </a>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
