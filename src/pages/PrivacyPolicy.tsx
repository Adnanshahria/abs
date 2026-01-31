export default function PrivacyPolicy() {
    return (
        <main className="flex-1 w-full px-4 sm:px-8 lg:px-16 py-8 relative flex flex-col items-center justify-start min-h-[80vh]">
            <div className="w-full max-w-4xl bg-white/90 p-8 rounded-2xl shadow-sm border border-green-100 relative z-10">
                <h1 className="text-3xl font-serif font-bold text-green-900 mb-6">Privacy Policy</h1>

                <div className="space-y-6 text-gray-700">
                    <p>Last updated: January 2026</p>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">1. Information We Collect</h2>
                        <p>We collect information you provide directly to us when you use our services, such as when you search for your voter information or contact us. This may include your NID number and date of birth.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">2. How We Use Your Information</h2>
                        <p>We use the information solely to facilitate your access to voter data. We do not store your personal search history or share it with third parties.</p>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold text-gray-800 mb-2">3. Data Security</h2>
                        <p>We implement appropriate security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
                    </section>
                </div>
            </div>
            {/* Background Faded Image */}
            <div className="fixed inset-0 z-0 opacity-5 pointer-events-none bg-[url('/src/assets/nirbachon-bhaban.png')] bg-cover bg-center"></div>
        </main>
    );
}
