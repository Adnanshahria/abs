export interface Candidate {
    id: number;
    name: string;
    name_bn?: string;
    party: string;
    party_bn?: string;
    symbol: string;
    image_url?: string;
    manifesto?: string;
    manifesto_bn?: string;
    education?: string;
    experience?: string;
    age?: number;
    status: 'clean' | 'pending';
    division: string;
    district: string;
    area: string;
    alliance?: string;
    matchPercentage?: number; // Calculated on client
}

export interface VoteCenter {
    id: number;
    name: string;
    name_bn?: string;
    address: string;
    address_bn?: string;
    areas: string[]; // List of areas serving this center
    total_voters?: number;
    type?: 'male' | 'female' | 'combined';
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone?: string;
    role: 'admin' | 'user';
    verification_status: 'unverified' | 'verified';
    nid_number?: string;
    voter_area?: string;
    division?: string; // Location data for authenticated voting
    district?: string;
    seat_no?: string;
    date_of_birth?: string;
}

export interface ElectionUpdate {
    id: number;
    title: string;
    content: string;
    image_url?: string;
    published_at: string;
    author_name?: string;
    tags?: string[];
    read_time?: number;
    view_count?: number;
    source_url?: string;
    like_count?: number;
}

export interface Rumor {
    id: number;
    title: string;
    description: string;
    status: 'debunked' | 'verified' | 'pending';
    source?: string;
    image_url?: string;
    published_at: string;
    like_count?: number;
}

export interface Comment {
    id: number;
    content_type: 'update' | 'rumor';
    content_id: number;
    user_id: string;
    user_name: string;
    comment: string;
    created_at: string;
}

export interface Incident {
    id: number;
    type: string;
    location: string;
    description: string;
    status: 'pending' | 'reviewed' | 'resolved';
    created_at: string;
}

export interface Volunteer {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
}

export interface Review {
    alliance_id: string;
    review: string;
    user_name: string; // Masked or full
    created_at: string;
    seat_no: string;
}

export interface Message {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
}
