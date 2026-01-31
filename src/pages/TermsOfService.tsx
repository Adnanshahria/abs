export default function TermsOfService() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl bg-white/90 p-8 rounded-2xl shadow-sm border border-green-100 relative z-10">
                <h1 className="text-3xl font-serif font-bold text-green-900 mb-6">Terms of Service</h1>

                <div className="space-y-6 text-gray-700">
                    <p>Please read these terms carefully before using Amar Ballot.</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">1. Acceptance of Terms</h2>
                        <p>By accessing this website, you agree to be bound by these Terms of Service and all applicable laws and regulations.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">2. Use License</h2>
                        <p>This website is for informational purposes only. You may not use the data for any commercial purpose or attempt to reverse engineer any software contained on the site.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">3. Disclaimer</h2>
                        <p>The materials on Amar Ballot are provided on an 'as is' basis. We make no warranties, expressed or implied, regarding the accuracy or reliability of the data.</p>
                    </section>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
