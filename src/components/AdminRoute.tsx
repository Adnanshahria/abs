import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { verifyAdmin } from '../lib/api';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';

export default function AdminRoute() {
    const { user, isLoggedIn, logout } = useAuth();
    const [isVerified, setIsVerified] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAdminStatus = async () => {
            if (!isLoggedIn || !user?.id) {
                setIsVerified(false);
                return;
            }

            // Client-side quick check
            if (user.role !== 'admin') {
                setIsVerified(false);
                return;
            }

            // Database strict check
            const isValid = await verifyAdmin(user.id);
            if (!isValid) {
                // If DB says not admin, but local says admin, force logout
                logout();
            }
            setIsVerified(isValid);
        };

        checkAdminStatus();
    }, [isLoggedIn, user, logout]);

    if (isVerified === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
            </div>
        );
    }

    if (isVerified) {
        return <AdminLayout />;
    }

    return <AdminLogin />;
}
