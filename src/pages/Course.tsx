import { BookOpen, Award, PlayCircle } from 'lucide-react';

export default function Course() {
    const modules = [
        {
            title: "Module 1: Understanding Democracy",
            desc: "Learn the basics of democratic rights and why your vote matters.",
            duration: "10 mins",
            lessons: ["What is Democracy?", "Rights & Responsibilities", "The Power of One Vote"]
        },
        {
            title: "Module 2: How to Register",
            desc: "Step-by-step guide to becoming a registered voter in Bangladesh.",
            duration: "15 mins",
            lessons: ["Eligibility Check", "Required Documents", "Online Registration Process"]
        },
        {
            title: "Module 3: Election Day Process",
            desc: "Everything you need to know about casting your ballot correctly.",
            duration: "12 mins",
            lessons: ["Finding Your Center", "Ballot Marking Rules", "Do's and Don'ts"]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 pt-20 md:pt-24 pb-12 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BookOpen className="w-8 h-8 text-green-600" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Voter Education Course</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Complete this free mini-course to become a certified "Civic Hero". Learn about your rights and the voting process.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {modules.map((module, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all group cursor-pointer hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <span className="bg-green-50 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                                    {module.duration}
                                </span>
                                <PlayCircle className="w-6 h-6 text-gray-300 group-hover:text-green-500 transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">{module.title}</h3>
                            <p className="text-gray-600 text-sm mb-6">{module.desc}</p>

                            <ul className="space-y-3">
                                {module.lessons.map((lesson, i) => (
                                    <li key={i} className="flex items-center gap-3 text-sm text-gray-700">
                                        <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
                                            {i + 1}
                                        </div>
                                        {lesson}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-12 bg-green-600 rounded-2xl p-8 md:p-12 text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="relative z-10">
                        <Award className="w-12 h-12 mx-auto mb-4 text-green-200" />
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to test your knowledge?</h2>
                        <p className="text-green-100 mb-8 max-w-xl mx-auto">
                            Take the final quiz after completing all modules to earn your digital Civic Hero Badge!
                        </p>
                        <button className="bg-white text-green-700 px-8 py-3.5 rounded-xl font-bold hover:bg-green-50 transition-colors shadow-lg active:scale-95 transform">
                            Start Final Quiz
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
