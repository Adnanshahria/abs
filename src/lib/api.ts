import { db } from './db';
import type { Candidate, VoteCenter, User, ElectionUpdate, Rumor, Review, Incident, Volunteer } from './types';
export type { ElectionUpdate, Rumor };
import bcrypt from 'bcryptjs';
import { cachedFetch, CACHE_KEYS, CACHE_TTL, clearCache } from './cache';

// Cached version of getCandidates - reduces DB reads
export async function getCandidates(): Promise<Candidate[]> {
    return cachedFetch(CACHE_KEYS.CANDIDATES, fetchCandidatesFromDB, CACHE_TTL.MEDIUM);
}

// Direct DB fetch for candidates (used internally)
async function fetchCandidatesFromDB(): Promise<Candidate[]> {
    try {
        const result = await db.execute('SELECT * FROM candidates');
        return result.rows.map(row => ({
            id: row.id as number,
            name: row.name as string,
            name_bn: row.name_bn as string,
            party: row.party as string,
            party_bn: row.party_bn as string,
            symbol: row.symbol as string,
            image_url: row.image_url as string,
            manifesto: row.manifesto as string,
            manifesto_bn: row.manifesto_bn as string,
            education: row.education as string,
            experience: row.experience as string,
            age: row.age as number,
            status: row.status as 'clean' | 'pending',
            division: row.division as string,
            district: row.district as string,
            area: row.area as string,
            alliance: row.alliance as string
        }));
    } catch (error) {
        console.error('Error fetching candidates:', error);
        return [];
    }
}


export async function getCandidateById(id: number): Promise<Candidate | null> {
    try {
        const result = await db.execute({
            sql: 'SELECT * FROM candidates WHERE id = ?',
            args: [id]
        });

        if (result.rows.length === 0) return null;

        const row = result.rows[0];
        return {
            id: row.id as number,
            name: row.name as string,
            name_bn: row.name_bn as string,
            party: row.party as string,
            party_bn: row.party_bn as string,
            symbol: row.symbol as string,
            image_url: row.image_url as string,
            manifesto: row.manifesto as string,
            manifesto_bn: row.manifesto_bn as string,
            education: row.education as string,
            experience: row.experience as string,
            age: row.age as number,
            status: row.status as 'clean' | 'pending',
            division: row.division as string,
            district: row.district as string,
            area: row.area as string,
            alliance: row.alliance as string
        };
    } catch (error) {
        console.error('Error fetching candidate:', error);
        return null;
    }
}

export async function getVoteCenters(): Promise<VoteCenter[]> {
    try {
        const result = await db.execute('SELECT * FROM vote_centers');
        return result.rows.map(row => ({
            id: row.id as number,
            name: row.name as string,
            name_bn: row.name_bn as string,
            address: row.address as string,
            address_bn: row.address_bn as string,
            division: row.division as string,
            district: row.district as string,
            area: row.area as string,
            latitude: row.latitude as number,
            longitude: row.longitude as number,
            capacity: row.capacity as number
        }));
    } catch (error) {
        console.error('Error fetching vote centers:', error);
        return [];
    }
}

// Authentication Functions
// NOTE: in a production app, these should be handled by a secure backend to protect the database token.
// Authentication Functions
// NOTE: Storing passwords in plain text as requested by user.

export async function registerUser(userData: any) {
    const { name, email, password, phone } = userData;
    try {
        // Hash password before storage
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await db.execute({
            sql: `INSERT INTO users (full_name, email, password_hash, phone_number, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
            args: [name, email, hashedPassword, phone]
        });
        return { success: true };
    } catch (error) {
        console.error("Registration error:", error);
        return { success: false, error };
    }
}

export async function loginUser(credentials: any) {
    const { email, password } = credentials;
    try {
        const result = await db.execute({
            sql: `SELECT * FROM users WHERE email = ?`,
            args: [email]
        });

        if (result.rows.length === 0) return { success: false, message: "User not found" };

        const user = result.rows[0];
        // Compare with hashed password
        let isValid = await bcrypt.compare(password, user.password_hash as string);

        // --- LAZY MIGRATION START ---
        // If hash fails, check if it's a legacy plain-text password
        if (!isValid && password === user.password_hash) {
            console.log("Migrating legacy plain-text password for user:", user.email);
            // 1. Hash the password
            const salt = await bcrypt.genSalt(10);
            const newHash = await bcrypt.hash(password, salt);

            // 2. Update DB
            await db.execute({
                sql: 'UPDATE users SET password_hash = ? WHERE id = ?',
                args: [newHash, user.id]
            });

            // 3. Mark as valid and use the new hash for this session logic if needed (though we just proceed)
            isValid = true;
        }
        // --- LAZY MIGRATION END ---

        if (!isValid) return { success: false, message: "Invalid password" };

        return {
            success: true,
            user: {
                id: user.id,
                name: user.full_name,
                email: user.email,
                role: user.role,
                verification_status: user.verification_status,
                nid_number: user.nid_number,
                voter_area: user.voter_area,
                // Location data for authenticated voting
                division: user.division,
                district: user.district,
                seat_no: user.seat_no
            }
        };
    } catch (error) {
        console.error("Login error:", error);
        return { success: false, error };
    }
}

export async function verifyUser(userId: number, nidData: any) {
    const { nidNumber, dateOfBirth, voterArea, division, district, seatNo } = nidData;
    try {
        await db.execute({
            sql: `UPDATE users SET nid_number = ?, date_of_birth = ?, voter_area = ?, division = ?, district = ?, seat_no = ?, verification_status = 'verified' WHERE id = ?`,
            args: [nidNumber, dateOfBirth, voterArea, division, district, seatNo, userId]
        });
        return { success: true };
    } catch (error) {
        console.error("Verification error:", error);
        return { success: false, error };

    }
}

export async function verifyAdmin(userId: number): Promise<boolean> {
    try {
        const result = await db.execute({
            sql: 'SELECT role FROM users WHERE id = ?',
            args: [userId]
        });

        if (result.rows.length === 0) return false;
        return result.rows[0].role === 'admin';
    } catch (error) {
        console.error("Admin verification error:", error);
        return false;
    }
}

export async function getDashboardStats() {
    try {
        const users = await db.execute('SELECT COUNT(*) as count FROM users');
        const candidates = await db.execute('SELECT COUNT(*) as count FROM candidates');
        const centers = await db.execute('SELECT COUNT(*) as count FROM vote_centers');

        return {
            success: true,
            stats: {
                users: users.rows[0].count as number,
                candidates: candidates.rows[0].count as number,
                centers: centers.rows[0].count as number
            }
        };
    } catch (error) {
        console.error("Stats error:", error);
        return {
            success: false,
            stats: { users: 0, candidates: 0, centers: 0 }
        };
    }
}

export async function addCandidate(candidateData: any) {
    const { name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance } = candidateData;
    try {
        await db.execute({
            sql: `INSERT INTO candidates (name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance]
        });
        clearCache(CACHE_KEYS.CANDIDATES); // Invalidate cache
        return { success: true };
    } catch (error) {
        console.error("Add candidate error:", error);
        return { success: false, error };
    }
}

export async function updateCandidate(id: number, candidateData: any) {
    const { name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance } = candidateData;
    try {
        await db.execute({
            sql: `UPDATE candidates SET 
                  name = ?, name_bn = ?, party = ?, party_bn = ?, symbol = ?, image_url = ?, 
                  manifesto = ?, manifesto_bn = ?, education = ?, experience = ?, age = ?, 
                  status = ?, division = ?, district = ?, area = ?, alliance = ?
                  WHERE id = ?`,
            args: [name, name_bn, party, party_bn, symbol, image_url, manifesto, manifesto_bn, education, experience, age, status, division, district, area, alliance, id]
        });
        clearCache(CACHE_KEYS.CANDIDATES); // Invalidate cache
        return { success: true };
    } catch (error) {
        console.error("Update candidate error:", error);
        return { success: false, error };
    }
}

export async function deleteCandidate(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM candidates WHERE id = ?',
            args: [id]
        });
        clearCache(CACHE_KEYS.CANDIDATES); // Invalidate cache
        return { success: true };
    } catch (error) {
        console.error("Delete candidate error:", error);
        return { success: false, error };
    }
}

// --- USERS MANAGEMENT ---

export async function getUsers(): Promise<User[]> {
    try {
        const result = await db.execute('SELECT * FROM users ORDER BY created_at DESC');
        return result.rows.map(row => ({
            id: row.id as number,
            name: row.full_name as string,
            email: row.email as string,
            phone: row.phone_number as string,
            role: row.role as 'admin' | 'user',
            verification_status: row.verification_status as 'unverified' | 'verified',
            nid_number: row.nid_number as string,
            voter_area: row.voter_area as string,
            division: row.division as string,
            district: row.district as string,
            seat_no: row.seat_no as string,
            date_of_birth: row.date_of_birth as string
        }));
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
}

export async function deleteUser(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM users WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete user error:", error);
        return { success: false, error };
    }
}

// --- VOTE CENTERS MANAGEMENT ---

export async function addVoteCenter(centerData: any) {
    const { name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity } = centerData;
    try {
        await db.execute({
            sql: `INSERT INTO vote_centers (name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity]
        });
        return { success: true };
    } catch (error) {
        console.error("Add center error:", error);
        return { success: false, error };
    }
}

export async function updateVoteCenter(id: number, centerData: any) {
    const { name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity } = centerData;
    try {
        await db.execute({
            sql: `UPDATE vote_centers SET 
                  name = ?, name_bn = ?, address = ?, address_bn = ?, 
                  division = ?, district = ?, area = ?, 
                  latitude = ?, longitude = ?, capacity = ?
                  WHERE id = ?`,
            args: [name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity, id]
        });
        return { success: true };
    } catch (error) {
        console.error("Update center error:", error);
        return { success: false, error };
    }
}

export async function deleteVoteCenter(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM vote_centers WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete center error:", error);
        return { success: false, error };
    }
}

// --- ELECTION UPDATES MANAGEMENT ---

// Migration function to add missing columns to election_updates table
async function migrateElectionUpdatesSchema() {
    const columnsToAdd = [
        { name: 'author_name', type: "TEXT DEFAULT 'Admin'" },
        { name: 'tags', type: 'TEXT' },
        { name: 'read_time', type: 'INTEGER DEFAULT 2' },
        { name: 'view_count', type: 'INTEGER DEFAULT 0' },
        { name: 'source_url', type: 'TEXT' }
    ];

    for (const col of columnsToAdd) {
        try {
            await db.execute(`ALTER TABLE election_updates ADD COLUMN ${col.name} ${col.type}`);
            console.log(`Added column ${col.name} to election_updates`);
        } catch (error: any) {
            // Column likely already exists, ignore
            if (!error.message?.includes('duplicate column')) {
                console.log(`Column ${col.name} may already exist or error:`, error.message);
            }
        }
    }
}

// Run migration on module load
migrateElectionUpdatesSchema().catch(console.error);

export async function getUpdates(limit?: number): Promise<ElectionUpdate[]> {
    try {
        let sql = 'SELECT * FROM election_updates ORDER BY published_at DESC';
        if (limit) {
            sql += ` LIMIT ${limit}`;
        }
        const result = await db.execute(sql);
        return result.rows.map(row => ({
            id: row.id as number,
            title: row.title as string,
            content: row.content as string,
            image_url: row.image_url as string,
            published_at: row.published_at as string,
            author_name: (row.author_name as string) || 'Admin',
            tags: row.tags ? (row.tags as string).split(',').map(t => t.trim()).filter(Boolean) : [],
            read_time: (row.read_time as number) || 2,
            view_count: (row.view_count as number) || 0,
            source_url: (row.source_url as string) || ''
        }));
    } catch (error) {
        console.error("Error fetching updates:", error);
        return [];
    }
}

export async function getUnreadNotificationCount(days: number = 7): Promise<number> {
    try {
        // Calculate date roughly for SQL (easier to do in JS for SQLite string comparison)
        const date = new Date();
        date.setDate(date.getDate() - days);
        const dateStr = date.toISOString();

        const updatesResult = await db.execute({
            sql: 'SELECT COUNT(*) as count FROM election_updates WHERE published_at > ?',
            args: [dateStr]
        });

        const rumorsResult = await db.execute({
            sql: 'SELECT COUNT(*) as count FROM rumors WHERE published_at > ?',
            args: [dateStr]
        });

        const updatesCount = (updatesResult.rows[0] as any).count as number;
        const rumorsCount = (rumorsResult.rows[0] as any).count as number;

        return updatesCount + rumorsCount;
    } catch (error) {
        console.error("Error fetching unread count:", error);
        return 0;
    }
}


export async function addUpdate(updateData: Omit<ElectionUpdate, 'id' | 'published_at'>) {
    const { title, content, image_url, author_name, tags, read_time, source_url } = updateData;
    const tagsString = Array.isArray(tags) ? tags.join(',') : (tags || '');
    try {
        await db.execute({
            sql: `INSERT INTO election_updates (title, content, image_url, author_name, tags, read_time, view_count, source_url) VALUES (?, ?, ?, ?, ?, ?, 0, ?)`,
            args: [title, content, image_url || null, author_name || 'Admin', tagsString || null, read_time || 2, source_url || null] as any[]
        });
        return { success: true };
    } catch (error) {
        console.error("Add update error:", error);
        return { success: false, error };
    }
}

export async function incrementViewCount(id: number) {
    try {
        await db.execute({
            sql: `UPDATE election_updates SET view_count = COALESCE(view_count, 0) + 1 WHERE id = ?`,
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Increment view count error:", error);
        return { success: false, error };
    }
}

export async function updateUpdate(id: number, updateData: Partial<ElectionUpdate>) {
    const { title, content, image_url, author_name, tags, read_time, source_url } = updateData;
    const tagsString = Array.isArray(tags) ? tags.join(',') : (tags || '');
    try {
        await db.execute({
            sql: `UPDATE election_updates SET title = ?, content = ?, image_url = ?, author_name = ?, tags = ?, read_time = ?, source_url = ? WHERE id = ?`,
            args: [title, content, image_url || null, author_name || 'Admin', tagsString || null, read_time || 2, source_url || null, id] as any[]
        });
        return { success: true };
    } catch (error) {
        console.error("Update update error:", error);
        return { success: false, error };
    }
}

export async function deleteUpdate(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM election_updates WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete update error:", error);
        return { success: false, error };
    }
}

// --- RUMORS MANAGEMENT ---

export async function getRumors(searchQuery?: string, limit?: number): Promise<Rumor[]> {
    try {
        let sql = 'SELECT * FROM rumors';
        let args: any[] = [];

        if (searchQuery) {
            sql += ' WHERE title LIKE ? OR description LIKE ?';
            const term = `%${searchQuery}%`;
            args.push(term, term);
        }

        sql += ' ORDER BY published_at DESC';

        if (limit) {
            sql += ` LIMIT ${limit}`;
        }

        const result = await db.execute({ sql, args });
        return result.rows.map(row => ({
            id: row.id as number,
            title: row.title as string,
            description: row.description as string,
            status: row.status as 'debunked' | 'verified' | 'pending',
            source: row.source as string,
            image_url: row.image_url as string,
            published_at: row.published_at as string
        }));
    } catch (error) {
        console.error("Error fetching rumors:", error);
        return [];
    }
}

export async function addRumor(rumorData: Omit<Rumor, 'id' | 'published_at'>) {
    const { title, description, status, source, image_url } = rumorData;
    try {
        await db.execute({
            sql: `INSERT INTO rumors (title, description, status, source, image_url) VALUES (?, ?, ?, ?, ?)`,
            args: [title, description, status, source || null, image_url || null]
        });
        return { success: true };
    } catch (error) {
        console.error("Add rumor error:", error);
        return { success: false, error };
    }
}

export async function updateRumor(id: number, rumorData: Partial<Rumor>) {
    const { title, description, status, source, image_url } = rumorData;
    try {
        await db.execute({
            sql: `UPDATE rumors SET title = ?, description = ?, status = ?, source = ?, image_url = ? WHERE id = ?`,
            args: [title, description, status, source || null, image_url || null, id] as any[]
        });
        return { success: true };
    } catch (error) {
        console.error("Update rumor error:", error);
        return { success: false, error };
    }
}

export async function deleteRumor(id: number) {
    try {
        await db.execute({
            sql: 'DELETE FROM rumors WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error("Delete rumor error:", error);
        return { success: false, error };
    }
}

// --- VOTING MANAGEMENT ---

export async function submitVote(voteData: any) {
    // division, district, seat_no, alliance_id, user_review, user_name, user_id
    const { division, district, seat_no, alliance_id, user_review, user_name, user_id } = voteData;

    if (!user_id) {
        return { success: false, message: "User ID is required to vote." };
    }

    try {
        // 1. Check if user already voted
        const existingVote = await db.execute({
            sql: `SELECT id FROM votes WHERE user_id = ?`,
            args: [user_id]
        });

        if (existingVote.rows.length > 0) {
            return { success: false, message: "already_voted" };
        }

        // 2. Insert new vote
        await db.execute({
            // ID is autoincrement
            // user_name is optional
            sql: `INSERT INTO votes (division, district, seat_no, alliance_id, user_review, user_name, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            args: [division, district, seat_no, alliance_id, user_review || null, user_name || 'Anonymous', user_id]
        });

        // Trigger automatically updates alliance_stats
        return { success: true };
    } catch (error) {
        console.error("Submit vote error:", error);
        return { success: false, error };
    }

}

export async function checkUserVoteStatus(userId: number) {
    try {
        const result = await db.execute({
            sql: 'SELECT id FROM votes WHERE user_id = ?',
            args: [userId]
        });
        return { success: true, hasVoted: result.rows.length > 0 };
    } catch (error) {
        console.error("Check vote status error:", error);
        return { success: false, hasVoted: false };
    }
}

interface VoteFilters {
    division?: string;
    district?: string;
    seat_no?: string;
}

export async function getVoteStats(filters?: VoteFilters) {
    try {
        let sql: string;
        let args: any[] = [];

        // Check if any filter is active
        const hasFilters = filters && (filters.division || filters.district || filters.seat_no);

        if (hasFilters) {
            // GRANULAR QUERY: Query the main 'votes' table directly
            let whereClause = "WHERE 1=1";

            if (filters?.seat_no) {
                whereClause += " AND seat_no = ?";
                args.push(filters.seat_no);
            } else if (filters?.district) {
                whereClause += " AND district = ?";
                args.push(filters.district);
            } else if (filters?.division) {
                whereClause += " AND division = ?";
                args.push(filters.division);
            }

            sql = `
                SELECT alliance_id, COUNT(*) as total_votes 
                FROM votes 
                ${whereClause}
                GROUP BY alliance_id
            `;
        } else {
            // GLOBAL QUERY: Read from optimized cache table
            sql = `
                SELECT alliance_id, total_votes 
                FROM alliance_stats
            `;
        }

        const result = await db.execute({ sql, args });

        const stats: Record<string, number> = {};
        result.rows.forEach(row => {
            stats[row.alliance_id as string] = row.total_votes as number;
        });

        return { success: true, stats };
    } catch (error) {
        console.error("Error fetching vote stats:", error);
        return { success: false, stats: {} };
    }
}

interface ReviewFilters {
    seat_no?: string;
    district?: string;
    division?: string;
}

export async function getReviews(filters: ReviewFilters): Promise<{ success: boolean; reviews: Review[] }> {
    try {
        let whereClause = "WHERE user_review IS NOT NULL AND user_review != ''";
        let args: any[] = [];

        if (filters.seat_no) {
            whereClause += " AND seat_no = ?";
            args.push(filters.seat_no);
        } else if (filters.district) {
            whereClause += " AND district = ?";
            args.push(filters.district);
        } else if (filters.division) {
            // Optional: Support division level reviews if needed, though high volume
            whereClause += " AND division = ?";
            args.push(filters.division);
        } else {
            // National Level: Fetch recent reviews globally
            // No additional WHERE clause needed beyond the base one
        }

        const result = await db.execute({
            sql: `SELECT alliance_id, user_review, user_name, created_at, seat_no FROM votes ${whereClause} ORDER BY created_at DESC LIMIT 100`,
            args: args
        });

        return {
            success: true,
            reviews: result.rows.map(row => ({
                alliance_id: row.alliance_id as string,
                review: row.user_review as string,
                user_name: row.user_name as string,
                created_at: row.created_at as string,
                seat_no: row.seat_no as string
            }))
        };
    } catch (error) {
        console.error("Error fetching reviews:", error);
        return { success: false, reviews: [] };
    }
}


// --- CONTACT & INCIDENTS ---

// --- CONTACT & INCIDENTS ---

export async function submitContactMessage(data: any) {
    const { name, email, subject, message } = data;
    try {
        await db.execute({
            sql: `INSERT INTO messages (name, email, subject, message, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`,
            args: [name, email, subject, message]
        });
        return { success: true };
    } catch (error) {
        console.error("Contact message error:", error);
        return { success: false, error };
    }
}

export async function submitIncidentReport(data: Omit<Incident, 'id' | 'status' | 'created_at'>) {
    const { type, location, description } = data;
    try {
        await db.execute({
            sql: `INSERT INTO incidents (type, location, description, status, created_at) VALUES (?, ?, ?, 'pending', CURRENT_TIMESTAMP)`,
            args: [type, location, description]
        });
        return { success: true };
    } catch (error) {
        console.error("Incident report error:", error);
        return { success: false, error };
    }
}

export async function submitVolunteerSignup(data: Omit<Volunteer, 'id' | 'status' | 'created_at'>) {
    const { name, email, phone, role } = data;
    try {
        await db.execute({
            sql: `INSERT INTO volunteers (name, email, phone, role, status, created_at) VALUES (?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP)`,
            args: [name, email, phone, role]
        });
        return { success: true };
    } catch (error) {
        console.error("Volunteer signup error:", error);
        return { success: false, error };
    }
}

export async function fixDatabaseSchema() {
    try {
        // 1. Check if we need to migrate the table structure for new status values
        // We do this by trying to insert a 'pending' status. If it fails, we know we need to migrate.
        // OR simpler: just check if the Image URL column exists, if not add it.
        // But the user has a CHECK constraint issue.

        // Let's migrate the table to support new statuses: 'debunked', 'verified', 'pending'
        // SQLite doesn't support changing CHECK constraints easily. We must:
        // 1. Rename old table
        // 2. Create new table
        // 3. Copy data
        // 4. Drop old table

        console.log("Starting schema update...");

        // Enable foreign keys just in case
        await db.execute("PRAGMA foreign_keys=OFF");

        // Transaction for safety
        await db.execute("BEGIN TRANSACTION");

        try {
            // 1. Check if we already migrated (check if we can insert a dummy pending rumor, or check table info)
            // Ideally we'd query table info, but let's just do the migration if we haven't 'marked' it.
            // For now, let's assume if the user hits "Fix Schema" they want this.

            // Rename current table
            // We use 'rumors_old' as backup. If it exists, drop it first from previous failed attempts
            await db.execute("DROP TABLE IF EXISTS rumors_old");
            await db.execute("ALTER TABLE rumors RENAME TO rumors_old");

            // 2. Create new table with updated constraints
            await db.execute(`
                CREATE TABLE rumors (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT NOT NULL,
                    description TEXT NOT NULL,
                    status TEXT NOT NULL CHECK(status IN ('debunked', 'verified', 'pending', 'fake')), -- Keeping 'fake' for legacy compatibility, 'debunked' is new preferred
                    source TEXT,
                    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                    image_url TEXT
                )
            `);

            // 3. Copy data from rumors_old to new rumors
            // We map 'fake' to 'debunked' if desired, or keep it. Let's keep it 'fake' if that's what it was, or map it.
            // The user wants 'debunked' in UI, so let's migrate data: 'fake' -> 'debunked'
            await db.execute(`
                INSERT INTO rumors (id, title, description, status, source, created_at, published_at, image_url)
                SELECT 
                    id, 
                    title, 
                    description, 
                    CASE WHEN status = 'fake' THEN 'debunked' ELSE status END, 
                    source, 
                    created_at, 
                    published_at, 
                    image_url
                FROM rumors_old
            `);

            // 4. Drop old table
            await db.execute("DROP TABLE rumors_old");

            await db.execute("COMMIT");
            await db.execute("PRAGMA foreign_keys=ON");

            console.log("Schema migration completed successfully.");
            return { success: true, message: "Schema updated. 'fake' status migrated to 'debunked'." };

        } catch (innerError) {
            await db.execute("ROLLBACK");
            await db.execute("PRAGMA foreign_keys=ON");
            // If rollback happens, maybe we failed because table didn't exist or something.
            // Try to recover: if rumors doesn't exist but rumors_old does, rename back.
            try {
                await db.execute("ALTER TABLE rumors_old RENAME TO rumors");
            } catch (e) { /* ignore */ }

            throw innerError;
        }

    } catch (error: any) {
        console.error("Schema update error:", error);
        return { success: false, error: error.message };
    }
}

// --- LIKES & COMMENTS SYSTEM ---

// Create tables for likes and comments
async function createLikesCommentsTable() {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS content_likes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content_type TEXT NOT NULL CHECK(content_type IN ('update', 'rumor')),
                content_id INTEGER NOT NULL,
                user_id TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                UNIQUE(content_type, content_id, user_id)
            )
        `);
        await db.execute(`
            CREATE TABLE IF NOT EXISTS content_comments (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                content_type TEXT NOT NULL CHECK(content_type IN ('update', 'rumor')),
                content_id INTEGER NOT NULL,
                user_id TEXT NOT NULL,
                user_name TEXT NOT NULL,
                comment TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('Likes and comments tables ready');
    } catch (error) {
        console.error('Error creating likes/comments tables:', error);
    }
}

// Run on module load
createLikesCommentsTable().catch(console.error);

// Toggle like (add if not exists, remove if exists)
export async function toggleLike(contentType: 'update' | 'rumor', contentId: number, userId: string) {
    try {
        // Check if like exists
        const existing = await db.execute({
            sql: 'SELECT id FROM content_likes WHERE content_type = ? AND content_id = ? AND user_id = ?',
            args: [contentType, contentId, userId]
        });

        if (existing.rows.length > 0) {
            // Remove like
            await db.execute({
                sql: 'DELETE FROM content_likes WHERE content_type = ? AND content_id = ? AND user_id = ?',
                args: [contentType, contentId, userId]
            });
            return { success: true, liked: false };
        } else {
            // Add like
            await db.execute({
                sql: 'INSERT INTO content_likes (content_type, content_id, user_id) VALUES (?, ?, ?)',
                args: [contentType, contentId, userId]
            });
            return { success: true, liked: true };
        }
    } catch (error) {
        console.error('Toggle like error:', error);
        return { success: false, error };
    }
}

// Get like count for content
export async function getLikes(contentType: 'update' | 'rumor', contentId: number) {
    try {
        const result = await db.execute({
            sql: 'SELECT COUNT(*) as count FROM content_likes WHERE content_type = ? AND content_id = ?',
            args: [contentType, contentId]
        });
        return (result.rows[0]?.count as number) || 0;
    } catch (error) {
        console.error('Get likes error:', error);
        return 0;
    }
}

// Check if user has liked
export async function hasUserLiked(contentType: 'update' | 'rumor', contentId: number, userId: string) {
    try {
        const result = await db.execute({
            sql: 'SELECT id FROM content_likes WHERE content_type = ? AND content_id = ? AND user_id = ?',
            args: [contentType, contentId, userId]
        });
        return result.rows.length > 0;
    } catch (error) {
        console.error('Has user liked error:', error);
        return false;
    }
}

// Add a comment
export async function addComment(contentType: 'update' | 'rumor', contentId: number, userId: string, userName: string, comment: string) {
    try {
        await db.execute({
            sql: 'INSERT INTO content_comments (content_type, content_id, user_id, user_name, comment) VALUES (?, ?, ?, ?, ?)',
            args: [contentType, contentId, userId, userName, comment]
        });
        return { success: true };
    } catch (error) {
        console.error('Add comment error:', error);
        return { success: false, error };
    }
}

// Get comments for content
export async function getComments(contentType: 'update' | 'rumor', contentId: number) {
    try {
        const result = await db.execute({
            sql: 'SELECT * FROM content_comments WHERE content_type = ? AND content_id = ? ORDER BY created_at DESC',
            args: [contentType, contentId]
        });
        return result.rows.map(row => ({
            id: row.id as number,
            content_type: row.content_type as 'update' | 'rumor',
            content_id: row.content_id as number,
            user_id: row.user_id as string,
            user_name: row.user_name as string,
            comment: row.comment as string,
            created_at: row.created_at as string
        }));
    } catch (error) {
        console.error('Get comments error:', error);
        return [];
    }
}

// ============================================
// AI KNOWLEDGE BASE FUNCTIONS
// ============================================

export interface AIKnowledgeEntry {
    id?: number;
    division: string;
    question: string;
    answer: string;
    keywords?: string;
    priority?: number;
    is_active?: number;
    created_at?: string;
    updated_at?: string;
}

// Initialize AI Knowledge table if it doesn't exist
async function initAIKnowledgeTable() {
    try {
        await db.execute(`
            CREATE TABLE IF NOT EXISTS ai_knowledge (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                division TEXT NOT NULL,
                question TEXT NOT NULL,
                answer TEXT NOT NULL,
                keywords TEXT,
                priority INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1,
                created_at TEXT DEFAULT CURRENT_TIMESTAMP,
                updated_at TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `);
        console.log('AI Knowledge table ready');
    } catch (error) {
        console.error('Init AI Knowledge table error:', error);
    }
}

// Auto-init on module load
initAIKnowledgeTable();

// Get all AI Knowledge entries
export async function getAIKnowledge(): Promise<AIKnowledgeEntry[]> {
    try {
        const result = await db.execute('SELECT * FROM ai_knowledge ORDER BY priority DESC, created_at DESC');
        return result.rows.map(row => ({
            id: row.id as number,
            division: row.division as string,
            question: row.question as string,
            answer: row.answer as string,
            keywords: row.keywords as string || '',
            priority: row.priority as number || 0,
            is_active: row.is_active as number,
            created_at: row.created_at as string,
            updated_at: row.updated_at as string
        }));
    } catch (error) {
        console.error('Get AI Knowledge error:', error);
        return [];
    }
}

// Add new AI Knowledge entry
export async function addAIKnowledge(entry: AIKnowledgeEntry): Promise<{ success: boolean; id?: number; error?: any }> {
    try {
        const result = await db.execute({
            sql: `INSERT INTO ai_knowledge (division, question, answer, keywords, priority, is_active) 
                  VALUES (?, ?, ?, ?, ?, ?)`,
            args: [
                entry.division,
                entry.question,
                entry.answer,
                entry.keywords || '',
                entry.priority || 0,
                entry.is_active ?? 1
            ]
        });
        return { success: true, id: Number(result.lastInsertRowid) };
    } catch (error) {
        console.error('Add AI Knowledge error:', error);
        return { success: false, error };
    }
}

// Update AI Knowledge entry
export async function updateAIKnowledge(id: number, entry: Partial<AIKnowledgeEntry>): Promise<{ success: boolean; error?: any }> {
    try {
        await db.execute({
            sql: `UPDATE ai_knowledge SET 
                  division = COALESCE(?, division),
                  question = COALESCE(?, question),
                  answer = COALESCE(?, answer),
                  keywords = COALESCE(?, keywords),
                  priority = COALESCE(?, priority),
                  is_active = COALESCE(?, is_active),
                  updated_at = CURRENT_TIMESTAMP
                  WHERE id = ?`,
            args: [
                entry.division ?? null,
                entry.question ?? null,
                entry.answer ?? null,
                entry.keywords ?? null,
                entry.priority ?? null,
                entry.is_active ?? null,
                id
            ]
        });
        return { success: true };
    } catch (error) {
        console.error('Update AI Knowledge error:', error);
        return { success: false, error };
    }
}

// Delete AI Knowledge entry
export async function deleteAIKnowledge(id: number): Promise<{ success: boolean; error?: any }> {
    try {
        await db.execute({
            sql: 'DELETE FROM ai_knowledge WHERE id = ?',
            args: [id]
        });
        return { success: true };
    } catch (error) {
        console.error('Delete AI Knowledge error:', error);
        return { success: false, error };
    }
}

// Search AI Knowledge for matching answers (used by AI service)
export async function searchAIKnowledge(query: string): Promise<AIKnowledgeEntry[]> {
    try {
        // Search in question, keywords, and division fields
        const searchTerm = `%${query.toLowerCase()}%`;
        const result = await db.execute({
            sql: `SELECT * FROM ai_knowledge 
                  WHERE is_active = 1 
                  AND (LOWER(question) LIKE ? OR LOWER(keywords) LIKE ? OR LOWER(division) LIKE ?)
                  ORDER BY priority DESC, created_at DESC
                  LIMIT 5`,
            args: [searchTerm, searchTerm, searchTerm]
        });
        return result.rows.map(row => ({
            id: row.id as number,
            division: row.division as string,
            question: row.question as string,
            answer: row.answer as string,
            keywords: row.keywords as string || '',
            priority: row.priority as number || 0,
            is_active: row.is_active as number,
            created_at: row.created_at as string,
            updated_at: row.updated_at as string
        }));
    } catch (error) {
        console.error('Search AI Knowledge error:', error);
        return [];
    }
}

// Bulk import AI Knowledge entries from JSON
export async function bulkImportAIKnowledge(
    entries: AIKnowledgeEntry[],
    onProgress?: (current: number, total: number) => void
): Promise<{ success: boolean; imported: number; failed: number; errors: string[] }> {
    let imported = 0;
    let failed = 0;
    const errors: string[] = [];

    for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        try {
            // Validate required fields
            if (!entry.question || !entry.answer || !entry.division) {
                errors.push(`Entry ${i + 1}: Missing required field (question, answer, or division)`);
                failed++;
                continue;
            }

            await db.execute({
                sql: `INSERT INTO ai_knowledge (division, question, answer, keywords, priority, is_active) 
                      VALUES (?, ?, ?, ?, ?, ?)`,
                args: [
                    entry.division,
                    entry.question,
                    entry.answer,
                    entry.keywords || '',
                    entry.priority || 0,
                    entry.is_active ?? 1
                ]
            });
            imported++;
        } catch (error) {
            errors.push(`Entry ${i + 1}: ${error}`);
            failed++;
        }

        // Report progress
        if (onProgress) {
            onProgress(i + 1, entries.length);
        }
    }

    console.log(`Bulk import complete: ${imported} imported, ${failed} failed`);
    return { success: failed === 0, imported, failed, errors };
}

// Remove duplicate questions (keeps the one with highest priority, or oldest if same priority)
export async function removeDuplicateAIKnowledge(): Promise<{ success: boolean; removed: number; error?: any }> {
    try {
        // Get all entries
        const allEntries = await getAIKnowledge();

        // Group by normalized question (lowercase, trimmed)
        const questionMap = new Map<string, AIKnowledgeEntry[]>();
        allEntries.forEach(entry => {
            const normalizedQ = entry.question.toLowerCase().trim();
            if (!questionMap.has(normalizedQ)) {
                questionMap.set(normalizedQ, []);
            }
            questionMap.get(normalizedQ)!.push(entry);
        });

        let removed = 0;

        // For each group with duplicates, keep the best one and delete others
        for (const [, entries] of questionMap) {
            if (entries.length <= 1) continue;

            // Sort by priority (desc), then by created_at (asc - keep oldest)
            entries.sort((a, b) => {
                if ((b.priority || 0) !== (a.priority || 0)) {
                    return (b.priority || 0) - (a.priority || 0);
                }
                return (a.created_at || '').localeCompare(b.created_at || '');
            });

            // Keep first one, delete rest
            for (let i = 1; i < entries.length; i++) {
                if (entries[i].id) {
                    await deleteAIKnowledge(entries[i].id!);
                    removed++;
                }
            }
        }

        console.log(`Removed ${removed} duplicate entries`);
        return { success: true, removed };
    } catch (error) {
        console.error('Remove duplicates error:', error);
        return { success: false, removed: 0, error };
    }
}
// ... existing code ...

// --- PAST ELECTIONS MANAGEMENT ---

export interface PastElection {
    id: number;
    year: number;
    date: string;
    turnout_percentage: number;
    total_seats: number;
    winner_party: string;
    description: string;
    results: {
        party_name: string;
        seats_won: number;
        color: string;
    }[];
}

async function migratePastElections() {
    try {
        // Check if table exists
        const check = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='past_elections'");
        if (check.rows.length === 0) {
            console.log("Migrating past elections schema...");

            // 1. Create Tables
            await db.execute(`
                CREATE TABLE IF NOT EXISTS past_elections (
                    id INTEGER PRIMARY KEY,
                    year INTEGER NOT NULL,
                    date TEXT NOT NULL,
                    turnout_percentage REAL,
                    total_seats INTEGER DEFAULT 300,
                    winner_party TEXT NOT NULL,
                    description TEXT
                )
            `);

            await db.execute(`
                CREATE TABLE IF NOT EXISTS past_election_results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    election_id INTEGER NOT NULL,
                    party_name TEXT NOT NULL,
                    seats_won INTEGER NOT NULL,
                    color TEXT DEFAULT '#808080',
                    FOREIGN KEY (election_id) REFERENCES past_elections(id)
                )
            `);

            // 2. Insert Data
            // 2024
            await db.execute("INSERT INTO past_elections (id, year, date, turnout_percentage, winner_party, description) VALUES (2024, 2024, 'Jan 07, 2024', 41.8, 'Awami League', '12th National Parliamentary Election')");
            await db.execute("INSERT INTO past_election_results (election_id, party_name, seats_won, color) VALUES (2024, 'Awami League', 225, '#00A859'), (2024, 'Independent', 62, '#808080'), (2024, 'Jatiya Party (Ershad)', 11, '#FFD700'), (2024, 'Workers Party', 1, '#FF0000'), (2024, 'Kalyan Party', 1, '#008000')");

            // 2018
            await db.execute("INSERT INTO past_elections (id, year, date, turnout_percentage, winner_party, description) VALUES (2018, 2018, 'Dec 30, 2018', 80.0, 'Awami League', '11th National Parliamentary Election')");
            await db.execute("INSERT INTO past_election_results (election_id, party_name, seats_won, color) VALUES (2018, 'Awami League', 257, '#00A859'), (2018, 'Jatiya Party (Ershad)', 24, '#FFD700'), (2018, 'BNP', 6, '#2E8B57'), (2018, 'Others', 13, '#808080')");

            // 2014
            await db.execute("INSERT INTO past_elections (id, year, date, turnout_percentage, winner_party, description) VALUES (2014, 2014, 'Jan 05, 2014', 40.0, 'Awami League', '10th National Parliamentary Election')");
            await db.execute("INSERT INTO past_election_results (election_id, party_name, seats_won, color) VALUES (2014, 'Awami League', 234, '#00A859'), (2014, 'Jatiya Party (Ershad)', 34, '#FFD700'), (2014, 'Independent', 16, '#808080'), (2014, 'Others', 16, '#A9A9A9')");

            // 2008
            await db.execute("INSERT INTO past_elections (id, year, date, turnout_percentage, winner_party, description) VALUES (2008, 2008, 'Dec 29, 2008', 87.1, 'Awami League', '9th National Parliamentary Election')");
            await db.execute("INSERT INTO past_election_results (election_id, party_name, seats_won, color) VALUES (2008, 'Awami League', 230, '#00A859'), (2008, 'BNP', 30, '#2E8B57'), (2008, 'Jatiya Party (Ershad)', 27, '#FFD700'), (2008, 'Jamaat-e-Islami', 2, '#006400'), (2008, 'Others', 11, '#808080')");

            // 2001
            await db.execute("INSERT INTO past_elections (id, year, date, turnout_percentage, winner_party, description) VALUES (2001, 2001, 'Oct 01, 2001', 75.6, 'BNP', '8th National Parliamentary Election')");
            await db.execute("INSERT INTO past_election_results (election_id, party_name, seats_won, color) VALUES (2001, 'BNP', 193, '#2E8B57'), (2001, 'Awami League', 62, '#00A859'), (2001, 'Jamaat-e-Islami', 17, '#006400'), (2001, 'Jatiya Party (Ershad)', 14, '#FFD700'), (2001, 'Others', 14, '#808080')");

            console.log("Past elections migration completed.");
        }
    } catch (error) {
        console.error("Migration error:", error);
    }
}

migratePastElections().catch(console.error);

export async function getPastElections(): Promise<PastElection[]> {
    try {
        const elections = await db.execute("SELECT * FROM past_elections ORDER BY year DESC");
        const results = await db.execute("SELECT * FROM past_election_results");

        return elections.rows.map(e => {
            const id = e.id as number;
            const electionResults = results.rows
                .filter(r => r.election_id === id)
                .map(r => ({
                    party_name: r.party_name as string,
                    seats_won: r.seats_won as number,
                    color: r.color as string
                }));

            return {
                id,
                year: e.year as number,
                date: e.date as string,
                turnout_percentage: e.turnout_percentage as number,
                total_seats: e.total_seats as number,
                winner_party: e.winner_party as string,
                description: e.description as string,
                results: electionResults
            };
        });
    } catch (error) {
        console.error("Error fetching past elections:", error);
        return [];
    }
}

// --- PAGE CONTENT MANAGEMENT ---

export interface PageContentItem {
    id: string;
    content: string;
    content_bn: string;
    updated_at: string;
}

async function migratePageContent() {
    try {
        const check = await db.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='page_content'");
        if (check.rows.length === 0) {
            console.log("Migrating page content schema...");

            await db.execute(`
                CREATE TABLE IF NOT EXISTS page_content (
                    id TEXT PRIMARY KEY,
                    content TEXT NOT NULL,
                    content_bn TEXT,
                    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            `);

            // About Page
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('about_title', 'About Us', 'আমাদের সম্পর্কে')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('about_desc', 'Amar Ballot is a civic platform designed to empower Bangladeshi voters.', 'আমার ব্যালট বাংলাদেশি ভোটারদের ক্ষমতায়িত করার জন্য ডিজাইন করা।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('mission_title', 'Our Mission', 'আমাদের লক্ষ্য')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('mission_desc', 'To provide every citizen with accurate, unbiased election information.', 'প্রতিটি নাগরিককে সঠিক, নিরপেক্ষ নির্বাচন তথ্য প্রদান করা।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('vision_title', 'Our Vision', 'আমাদের দৃষ্টিভঙ্গি')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('vision_desc', 'A Bangladesh where every voter makes informed decisions.', 'একটি বাংলাদেশ যেখানে প্রতিটি ভোটার সচেতন সিদ্ধান্ত নেয়।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('trust_title', 'Trust & Transparency', 'বিশ্বাস ও স্বচ্ছতা')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('trust_desc', 'We provide verified, fact-checked information you can rely on.', 'আমরা যাচাইকৃত তথ্য প্রদান করি।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('story_title', 'Our Story', 'আমাদের গল্প')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('story_desc', 'Born from the belief that informed citizens strengthen democracy.', 'সচেতন নাগরিকরা গণতন্ত্র শক্তিশালী করে।')");

            // Contact Page
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('contact_email_1', 'support@amarballot.bd', 'support@amarballot.bd')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('contact_email_2', 'info@amarballot.bd', 'info@amarballot.bd')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('contact_phone', '+880 1711 000000', '+880 1711 000000')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('contact_address', 'Election Commission Secretariat, Agargaon, Dhaka-1207', 'নির্বাচন কমিশন সচিবালয়, আগারগাঁও, ঢাকা-১২০৭')");

            // Services Page
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_1_title', 'Vote Center Locator', 'ভোট কেন্দ্র সন্ধানকারী')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_1_desc', 'Find your nearest voting center with ease.', 'সহজে আপনার নিকটতম ভোট কেন্দ্র খুঁজুন।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_2_title', 'Candidate Search', 'প্রার্থী অনুসন্ধান')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_2_desc', 'Search and compare candidates in your constituency.', 'প্রার্থীদের অনুসন্ধান এবং তুলনা করুন।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_3_title', 'Voter Education', 'ভোটার শিক্ষা')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_3_desc', 'Learn about your rights and how to vote.', 'আপনার অধিকার জানুন।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_4_title', 'Rumor Check', 'গুজব যাচাই')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_4_desc', 'Verify election-related news and information.', 'নির্বাচন সম্পর্কিত তথ্য যাচাই করুন।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_5_title', 'Sample Ballot', 'নমুনা ব্যালট')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_5_desc', 'Preview and practice with sample ballots.', 'নমুনা ব্যালট দিয়ে অনুশীলন করুন।')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_6_title', 'AI Assistant', 'এআই সহকারী')");
            await db.execute("INSERT INTO page_content (id, content, content_bn) VALUES ('service_6_desc', 'Get instant answers to your election questions.', 'তাৎক্ষণিক উত্তর পান।')");

            console.log("Page content migration completed.");
        }
    } catch (error) {
        console.error("Page content migration error:", error);
    }
}

migratePageContent().catch(console.error);

export async function getPageContent(prefix?: string): Promise<Record<string, { en: string; bn: string }>> {
    try {
        let sql = "SELECT * FROM page_content";
        if (prefix) {
            sql += ` WHERE id LIKE '${prefix}%'`;
        }
        const result = await db.execute(sql);

        const content: Record<string, { en: string; bn: string }> = {};
        result.rows.forEach(row => {
            content[row.id as string] = {
                en: row.content as string,
                bn: (row.content_bn as string) || (row.content as string)
            };
        });
        return content;
    } catch (error) {
        console.error("Error fetching page content:", error);
        return {};
    }
}

export async function updatePageContent(id: string, content: string, content_bn: string) {
    try {
        await db.execute({
            sql: "UPDATE page_content SET content = ?, content_bn = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
            args: [content, content_bn, id]
        });
        return { success: true };
    } catch (error) {
        console.error("Update page content error:", error);
        return { success: false, error };
    }
}

export async function getAllPageContent(): Promise<PageContentItem[]> {
    try {
        const result = await db.execute("SELECT * FROM page_content ORDER BY id");
        return result.rows.map(row => ({
            id: row.id as string,
            content: row.content as string,
            content_bn: (row.content_bn as string) || '',
            updated_at: row.updated_at as string
        }));
    } catch (error) {
        console.error("Error fetching all page content:", error);
        return [];
    }
}
