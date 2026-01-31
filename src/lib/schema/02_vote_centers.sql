-- Create Vote Centers Table
CREATE TABLE IF NOT EXISTS vote_centers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    name_bn TEXT,
    address TEXT NOT NULL,
    address_bn TEXT,
    division TEXT NOT NULL,
    district TEXT NOT NULL,
    area TEXT NOT NULL,
    latitude REAL,
    longitude REAL,
    capacity INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert Sample Vote Centers
INSERT INTO vote_centers (name, name_bn, address, address_bn, division, district, area, latitude, longitude, capacity) VALUES
('Dhaka City College Center', 'ঢাকা সিটি কলেজ কেন্দ্র', 'Road 2, Dhanmondi, Dhaka', 'রোড ২, ধানমন্ডি, ঢাকা', 'Dhaka', 'Faridpur', 'Faridpur-3', 23.7465, 90.3763, 5000),
('Faridpur Zilla School', 'ফরিদপুর জেলা স্কুল', 'Faridpur Sadar', 'ফরিদপুর সদর', 'Dhaka', 'Faridpur', 'Faridpur-1', 23.6070, 89.8429, 3000);
