import { Eye, Ear, User } from 'lucide-react';

export default function Accessibility() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl relative z-10">
                <h1 className="text-4xl text-green-900 font-serif font-bold text-center mb-8">Accessibility Services</h1>

                <div className="bg-white/90 p-8 rounded-2xl shadow-sm border border-green-100">
                    <p className="text-xl text-gray-700 text-center mb-8">
                        The Election Commission is committed to ensuring that every eligible voter can cast their vote independently and with dignity.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <Eye className="w-6 h-6 text-green-700" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-green-900">Visual Impairment</h3>
                            <p className="text-sm text-gray-600">Braille ballot papers and magnifiers are available at all polling stations.</p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <User className="w-6 h-6 text-green-700" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-green-900">Mobility Aid</h3>
                            <p className="text-sm text-gray-600">Ramps and wheelchair assistance are mandatory at all Voting Centers.</p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
                            <div className="bg-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                                <Ear className="w-6 h-6 text-green-700" />
                            </div>
                            <h3 className="font-bold text-lg mb-2 text-green-900">Hearing Impairment</h3>
                            <p className="text-sm text-gray-600">Video guides with sign language interpretation are available online.</p>
                        </div>
                    </div>

                    <div className="mt-8 bg-amber-50 border border-amber-200 p-4 rounded-xl">
                        <h4 className="font-bold text-amber-900 mb-2">Need Special Assistance?</h4>
                        <p className="text-amber-800 text-sm">
                            If you require specific arrangements, please contact your local election office at least 48 hours before election day.
                        </p>
                    </div>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
