import { Link } from 'react-router-dom';
import { Phone, MapPin, Facebook, Twitter, Linkedin, Mail, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
    const { language } = useLanguage();
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { path: '/', label: language === 'bn' ? 'হোম' : 'Home' },
        { path: 'http://103.183.38.66/', label: language === 'bn' ? 'প্রার্থী তালিকা' : 'Candidates' },
        { path: '/archive', label: language === 'bn' ? 'ফলাফল' : 'Results' },
    ];

    const supportLinks = [
        { path: '/about', label: language === 'bn' ? 'আমাদের সম্পর্কে' : 'About Us' },
        { path: '/contact', label: language === 'bn' ? 'যোগাযোগ' : 'Contact' },
        { path: '/adm/incidents', label: language === 'bn' ? 'অভিযোগ' : 'Report' },
        { path: '/video-tutorials', label: language === 'bn' ? 'টিউটোরিয়াল' : 'Tutorials' },
    ];

    // Boxy link style matching emergency buttons
    const boxyLinkStyle = "flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-purple-600 text-xs sm:text-sm transition-colors bg-white px-3 py-2 rounded-md border border-gray-200 hover:border-purple-300";

    return (
        <footer className="px-2 pb-2 mt-auto">
            {/* Footer Container with rounded-rectangle shape and purple border */}
            <div className="bg-gradient-to-r from-green-50 to-green-100 shadow-sm rounded-lg border border-purple-200">
                <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">

                    {/* Main Grid - Mobile optimized: 2 cols on mobile, 4 on desktop */}
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">

                        {/* Brand Section - Full width on mobile */}
                        <div className="col-span-2 sm:col-span-2 md:col-span-1 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                                <span className="font-bold text-base sm:text-lg text-green-700 italic">Amar Ballot</span>
                            </div>
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                                {language === 'bn'
                                    ? 'গণতন্ত্রকে শক্তিশালী করি, একসাথে।'
                                    : 'Empowering Democracy, Together.'
                                }
                            </p>
                            {/* Social Icons - Centered on mobile */}
                            <div className="flex items-center justify-center sm:justify-start gap-2 mt-3">
                                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors bg-white p-1.5 sm:p-2 rounded-md border border-gray-200 hover:border-purple-300">
                                    <Facebook className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors bg-white p-1.5 sm:p-2 rounded-md border border-gray-200 hover:border-purple-300">
                                    <Twitter className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </a>
                                <a href="#" className="text-gray-500 hover:text-purple-600 transition-colors bg-white p-1.5 sm:p-2 rounded-md border border-gray-200 hover:border-purple-300">
                                    <Linkedin className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </a>
                                <a href="mailto:contact@amarballot.com" className="text-gray-500 hover:text-purple-600 transition-colors bg-white p-1.5 sm:p-2 rounded-md border border-gray-200 hover:border-purple-300">
                                    <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </a>
                            </div>
                        </div>

                        {/* Quick Links - Boxy style */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">
                                {language === 'bn' ? 'দ্রুত লিংক' : 'Quick Links'}
                            </h4>
                            <div className="space-y-1.5 sm:space-y-2">
                                {quickLinks.map((link) => (
                                    link.path.startsWith('http') ? (
                                        <a
                                            key={link.path}
                                            href={link.path}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={boxyLinkStyle}
                                        >
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link
                                            key={link.path}
                                            to={link.path}
                                            className={boxyLinkStyle}
                                        >
                                            {link.label}
                                        </Link>
                                    )
                                ))}
                            </div>
                        </div>

                        {/* Support Links - Boxy style */}
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">
                                {language === 'bn' ? 'সাহায্য' : 'Support'}
                            </h4>
                            <div className="space-y-1.5 sm:space-y-2">
                                {supportLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={boxyLinkStyle}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Emergency Contacts */}
                        <div className="col-span-2 sm:col-span-1">
                            <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-xs sm:text-sm uppercase tracking-wide">
                                {language === 'bn' ? 'জরুরি যোগাযোগ' : 'Emergency'}
                            </h4>
                            <div className="flex sm:flex-col gap-2">
                                <a
                                    href="tel:999"
                                    className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-purple-600 text-xs sm:text-sm transition-colors bg-white px-3 py-2 rounded-md border border-gray-200 hover:border-purple-300"
                                >
                                    <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-red-500" />
                                    <span className="font-semibold">999</span>
                                    <span className="text-gray-400 text-[10px] sm:text-xs hidden sm:inline">({language === 'bn' ? 'জাতীয়' : 'National'})</span>
                                </a>
                                <a
                                    href="https://www.google.com/maps/search/police+station+near+me/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 text-gray-600 hover:text-purple-600 text-xs sm:text-sm transition-colors bg-white px-3 py-2 rounded-md border border-gray-200 hover:border-purple-300"
                                >
                                    <MapPin className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-blue-500" />
                                    <span className="font-medium">{language === 'bn' ? 'নিকটতম থানা' : 'Nearby Police'}</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-purple-200 mt-4 sm:mt-6 pt-3 sm:pt-4">
                        <div className="flex flex-col items-center gap-1 sm:gap-2 text-center">
                            {/* Copyright */}
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                                © {currentYear} Amar Ballot. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
                            </p>

                            {/* Trademark */}
                            <p className="text-gray-400 text-[10px] sm:text-xs">
                                {language === 'bn'
                                    ? 'এই প্রোডাক্টটি @ Amar Ballot ™ এ নিবন্ধিত।'
                                    : 'This product is registered to @ Amar Ballot ™'
                                }
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
}
