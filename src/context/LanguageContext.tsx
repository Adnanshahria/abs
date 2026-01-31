import { createContext, useContext, useState, type ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
    language: Language;
    toggleLanguage: () => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguage] = useState<Language>('bn'); // Default to Bangla as per app name "Amar Ballot"

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'bn' : 'en');
    };

    // Helper to get nested translation keys, e.g., 'home.title'
    // For now we will return the key itself if translation is missing or implement the lookup in the hook
    // Actually, a simple key lookup is better done in the translation file or hook. 
    // We'll expose the language and let components pick the string.

    // Simplification: We will export the full translations object in the hook for direct usage
    // t field here is placeholder, logic will be in useLanguage
    const t = (key: string) => key;

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
