import { createClient } from '@libsql/client';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load .env from root
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const url = process.env.VITE_TURSO_DB_URL;
const authToken = process.env.VITE_TURSO_DB_TOKEN;

if (!url || !authToken) {
    console.error('Missing DB credentials in .env');
    process.exit(1);
}

const db = createClient({ url, authToken });

async function createAdmin() {
    const email = 'admin@amarballot.com';
    const password = 'admin'; // Simple password for testing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    try {
        // Check if user exists
        const result = await db.execute({
            sql: 'SELECT * FROM users WHERE email = ?',
            args: [email]
        });

        if (result.rows.length > 0) {
            console.log('Admin user already exists. Updating password and role...');
            await db.execute({
                sql: `UPDATE users SET password_hash = ?, role = 'admin', verification_status = 'verified' WHERE email = ?`,
                args: [passwordHash, email]
            });
        } else {
            console.log('Creating new admin user...');
            await db.execute({
                sql: `INSERT INTO users (full_name, email, password_hash, role, verification_status, created_at) VALUES (?, ?, ?, 'admin', 'verified', CURRENT_TIMESTAMP)`,
                args: ['Admin User', email, passwordHash]
            });
        }
        console.log(`✅ Admin user ready: ${email} / ${password}`);
    } catch (error) {
        console.error('Error creating admin:', error);
    }
}

createAdmin();
