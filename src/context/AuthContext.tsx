import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { loginUser, registerUser, verifyUser } from '../lib/api';

interface AuthContextType {
    isLoggedIn: boolean;
    user: any | null;
    login: (credentials: any) => Promise<{ success: boolean; message?: string; user?: any }>;
    register: (userData: any) => Promise<{ success: boolean; error?: any }>;
    verify: (userId: number, nidData: any) => Promise<{ success: boolean; error?: any }>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState<any | null>(null);

    // Persist session on load
    useEffect(() => {
        const storedUser = localStorage.getItem('amar_ballot_user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsLoggedIn(true);
            } catch (error) {
                console.error("Failed to restore session:", error);
                localStorage.removeItem('amar_ballot_user');
            }
        }
    }, []);

    const login = async (credentials: any) => {
        const result = await loginUser(credentials);
        if (result.success) {
            setIsLoggedIn(true);
            setUser(result.user);
            // Store user in localStorage
            localStorage.setItem('amar_ballot_user', JSON.stringify(result.user));
            return result;
        }
        return { success: false, message: result.message || "Login failed" };
    };

    const register = async (userData: any) => {
        const result = await registerUser(userData);
        if (result.success) {
            // Optional: Auto-login logic could be added here
            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const verify = async (userId: number, nidData: any) => {
        const result = await verifyUser(userId, nidData);
        if (result.success) {
            const updatedUser = {
                ...user,
                verification_status: 'verified',
                nid_number: nidData.nidNumber,
                voter_area: nidData.voterArea,
                division: nidData.division,
                district: nidData.district,
                seat_no: nidData.seatNo
            };

            setUser(updatedUser);
            // Update localStorage with verified status
            localStorage.setItem('amar_ballot_user', JSON.stringify(updatedUser));

            return { success: true };
        }
        return { success: false, error: result.error };
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        localStorage.removeItem('amar_ballot_user');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, login, register, verify, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
