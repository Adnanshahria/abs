-- Create Users Table for Email/Password Auth
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    nid_number TEXT,
    date_of_birth TEXT,
    voter_area TEXT,
    verification_status TEXT DEFAULT 'unverified', -- 'unverified', 'verified'
    role TEXT DEFAULT 'voter', -- 'voter', 'admin', 'candidate'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_verified INTEGER DEFAULT 0
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
