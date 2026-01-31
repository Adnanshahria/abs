-- Create Candidates Table
CREATE TABLE IF NOT EXISTS candidates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_bn TEXT,
    party TEXT NOT NULL,
    party_bn TEXT,
    symbol TEXT,
    image_url TEXT,
    manifesto TEXT,
    manifesto_bn TEXT,
    education TEXT,
    experience TEXT,
    age INTEGER,
    status TEXT DEFAULT 'clean',
    division TEXT NOT NULL,
    district TEXT NOT NULL,
    area TEXT NOT NULL,
    alliance TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Candidates
INSERT INTO candidates (name, name_bn, party, party_bn, symbol, manifesto, manifesto_bn, education, experience, age, status, division, district, area) VALUES
('Nargis Akter', 'নার্গিস আক্তার', 'Progress Party', 'প্রগতি দল', '🐱', 'Education for all', 'সবার জন্য শিক্ষা', 'M.A. in Economics', 'social', 45, 'clean', 'Dhaka', 'Faridpur', 'Faridpur-3'),
('Rahim Mia', 'রহিম মিয়া', 'Development Alliance', 'উন্নয়ন জোট', '🌀', 'Roads and infrastructure', 'রাস্তা ও অবকাঠামো', 'B.Sc. in Engineering', 'business', 52, 'clean', 'Dhaka', 'Faridpur', 'Faridpur-3'),
('Anamika Poddar', 'অনামিকা পোদ্দার', 'Green Future', 'সবুজ ভবিষ্যৎ', '🚗', 'Environmental protection', 'পরিবেশ সুরক্ষা', 'Ph.D. in Environmental Science', 'social', 38, 'clean', 'Dhaka', 'Faridpur', 'Faridpur-3');
