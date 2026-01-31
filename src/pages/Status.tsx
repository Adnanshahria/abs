
import { Check, ArrowRight } from 'lucide-react';

export default function Status() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center min-h-[80vh]">

            <div className="w-full max-w-5xl flex flex-col items-center gap-12 relative z-10 pt-10">

                {/* Title */}
                <h1 className="text-4xl text-green-900 font-serif font-medium text-center">
                    Result
                </h1>

                {/* Mobile View: Vertical List */}
                <div className="flex md:hidden flex-col gap-4 w-full max-w-sm">
                    <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center backdrop-blur-sm">
                        <h3 className="text-green-800 font-bold text-lg mb-1">Getting Started</h3>
                        <p className="text-green-700/70 text-sm italic">Just started? Learn the basics</p>
                    </div>
                    <div className="flex justify-center"><ArrowRight className="text-green-300 rotate-90" /></div>
                    <div className="bg-green-100 border-2 border-green-500 p-6 rounded-lg shadow-md text-center backdrop-blur-sm">
                        <h3 className="text-green-900 font-bold text-xl mb-1">Not Registered</h3>
                        <p className="text-green-800 text-sm italic">Not registered, apply for NID</p>
                    </div>
                    <div className="flex justify-center"><ArrowRight className="text-green-300 rotate-90" /></div>
                    <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center backdrop-blur-sm">
                        <h3 className="text-green-800 font-bold text-lg mb-1">Partially Ready</h3>
                        <p className="text-green-700/70 text-sm italic">More to do! Complete steps</p>
                    </div>
                    <div className="flex justify-center"><ArrowRight className="text-green-300 rotate-90" /></div>
                    <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center backdrop-blur-sm">
                        <h3 className="text-green-800 font-bold text-lg mb-1">Almost Ready</h3>
                        <p className="text-green-700/70 text-sm italic">Just a little left! Check missing info</p>
                    </div>
                    <div className="flex justify-center"><ArrowRight className="text-green-300 rotate-90" /></div>
                    <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center backdrop-blur-sm">
                        <h3 className="text-green-800 font-bold text-lg mb-1">Ready to Vote</h3>
                        <p className="text-green-700/70 text-sm italic">You're ready, go vote!</p>
                    </div>
                </div>

                {/* Desktop View: Status Diagram Container */}
                <div className="hidden md:flex relative w-full max-w-4xl h-[500px] items-center justify-center">

                    {/* Background Clipboard Graphic (CSS drawn) */}
                    <div className="absolute inset-0 border-[10px] border-green-100/50 rounded-3xl z-0"></div>
                    <div className="absolute top-0 w-1/3 h-16 bg-green-100/50 rounded-b-3xl z-0 transform -translate-y-1/2"></div>


                    {/* Status Cards - Distributed */}

                    {/* 1. Getting Started */}
                    <div className="absolute top-1/4 left-0 transform -translate-y-1/2 translate-x-12">
                        <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center w-64 backdrop-blur-sm">
                            <h3 className="text-green-800 font-bold text-lg mb-1">Getting Started</h3>
                            <p className="text-green-700/70 text-sm italic">Just started? Learn the basics</p>
                        </div>
                    </div>

                    {/* 2. Not Registered (Central, Highlighted) */}
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                        <div className="bg-green-100 border-2 border-green-500 p-6 rounded-lg shadow-md text-center w-72 backdrop-blur-sm relative overflow-hidden">
                            {/* Indicator Line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-green-500"></div>

                            <h3 className="text-green-900 font-bold text-xl mb-1">Not Registered</h3>
                            <p className="text-green-800 text-sm italic">Not registered, apply for NID</p>
                        </div>
                    </div>

                    {/* 3. Partially Ready */}
                    <div className="absolute top-1/4 right-0 transform -translate-y-1/2 -translate-x-12">
                        <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center w-64 backdrop-blur-sm">
                            <h3 className="text-green-800 font-bold text-lg mb-1">Partially Ready</h3>
                            <p className="text-green-700/70 text-sm italic">More to do! Complete steps</p>
                        </div>
                    </div>

                    {/* 4. Almost Ready */}
                    <div className="absolute bottom-1/4 left-1/4 transform -translate-x-12 translate-y-1/2">
                        <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center w-64 backdrop-blur-sm">
                            <h3 className="text-green-800 font-bold text-lg mb-1">Almost Ready</h3>
                            <p className="text-green-700/70 text-sm italic">Just a little left! Check missing info</p>
                        </div>
                    </div>

                    {/* 5. Ready to Vote */}
                    <div className="absolute bottom-1/4 right-1/4 transform translate-x-12 translate-y-1/2">
                        <div className="bg-green-50/80 border border-green-200 p-6 rounded-lg shadow-sm text-center w-64 backdrop-blur-sm">
                            <h3 className="text-green-800 font-bold text-lg mb-1">Ready to Vote</h3>
                            <p className="text-green-700/70 text-sm italic">You're ready, go vote!</p>
                        </div>
                    </div>

                    {/* Central Checkmark Watermark */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none z-0">
                        <Check className="w-96 h-96 text-green-900" />
                    </div>

                </div>

            </div>

            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>

        </main>
    );
}
