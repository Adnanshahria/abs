import { createClient } from '@libsql/client';

const url = import.meta.env.VITE_TURSO_DB_URL;
const authToken = import.meta.env.VITE_TURSO_DB_TOKEN;

if (!url) {
    throw new Error('VITE_TURSO_DB_URL is not defined in .env file');
}

if (!authToken) {
    throw new Error('VITE_TURSO_DB_TOKEN is not defined in .env file');
}

export const db = createClient({
    url,
    authToken,
});

export async function checkConnection() {
    try {
        await db.execute('SELECT 1');
        console.log('✅ Connected to Turso database successfully!');
        return true;
    } catch (error) {
        console.error('❌ Failed to connect to Turso database:', error);
        return false;
    }
}
