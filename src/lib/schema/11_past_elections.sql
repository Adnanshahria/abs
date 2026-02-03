-- 1. Table for Election Info
CREATE TABLE IF NOT EXISTS past_elections (
    id INTEGER PRIMARY KEY,
    year INTEGER NOT NULL,
    date TEXT NOT NULL,
    turnout_percentage REAL,
    total_seats INTEGER DEFAULT 300,
    winner_party TEXT NOT NULL,
    description TEXT
);

-- 2. Table for Detailed Results
CREATE TABLE IF NOT EXISTS past_election_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    election_id INTEGER NOT NULL,
    party_name TEXT NOT NULL,
    seats_won INTEGER NOT NULL,
    color TEXT DEFAULT '#808080',
    FOREIGN KEY (election_id) REFERENCES past_elections(id)
);

-- 3. Seed Data (Using INSERT OR IGNORE to prevent duplicates if re-run)

-- 2024 Election
INSERT OR IGNORE INTO past_elections (id, year, date, turnout_percentage, winner_party, description) 
VALUES (2024, 2024, 'Jan 07, 2024', 41.8, 'Awami League', '12th National Parliamentary Election');

INSERT OR IGNORE INTO past_election_results (election_id, party_name, seats_won, color) VALUES 
(2024, 'Awami League', 225, '#00A859'),
(2024, 'Independent', 62, '#808080'),
(2024, 'Jatiya Party (Ershad)', 11, '#FFD700'),
(2024, 'Workers Party', 1, '#FF0000'),
(2024, 'Kalyan Party', 1, '#008000');

-- 2018 Election
INSERT OR IGNORE INTO past_elections (id, year, date, turnout_percentage, winner_party, description) 
VALUES (2018, 2018, 'Dec 30, 2018', 80.0, 'Awami League', '11th National Parliamentary Election');

INSERT OR IGNORE INTO past_election_results (election_id, party_name, seats_won, color) VALUES 
(2018, 'Awami League', 257, '#00A859'),
(2018, 'Jatiya Party (Ershad)', 24, '#FFD700'),
(2018, 'BNP', 6, '#2E8B57'),
(2018, 'Others', 13, '#808080');

-- 2014 Election
INSERT OR IGNORE INTO past_elections (id, year, date, turnout_percentage, winner_party, description) 
VALUES (2014, 2014, 'Jan 05, 2014', 40.0, 'Awami League', '10th National Parliamentary Election');

INSERT OR IGNORE INTO past_election_results (election_id, party_name, seats_won, color) VALUES 
(2014, 'Awami League', 234, '#00A859'),
(2014, 'Jatiya Party (Ershad)', 34, '#FFD700'),
(2014, 'Independent', 16, '#808080'),
(2014, 'Others', 16, '#A9A9A9');

-- 2008 Election
INSERT OR IGNORE INTO past_elections (id, year, date, turnout_percentage, winner_party, description) 
VALUES (2008, 2008, 'Dec 29, 2008', 87.1, 'Awami League', '9th National Parliamentary Election');

INSERT OR IGNORE INTO past_election_results (election_id, party_name, seats_won, color) VALUES 
(2008, 'Awami League', 230, '#00A859'),
(2008, 'BNP', 30, '#2E8B57'),
(2008, 'Jatiya Party (Ershad)', 27, '#FFD700'),
(2008, 'Jamaat-e-Islami', 2, '#006400'),
(2008, 'Others', 11, '#808080');

-- 2001 Election
INSERT OR IGNORE INTO past_elections (id, year, date, turnout_percentage, winner_party, description) 
VALUES (2001, 2001, 'Oct 01, 2001', 75.6, 'BNP', '8th National Parliamentary Election');

INSERT OR IGNORE INTO past_election_results (election_id, party_name, seats_won, color) VALUES 
(2001, 'BNP', 193, '#2E8B57'),
(2001, 'Awami League', 62, '#00A859'),
(2001, 'Jamaat-e-Islami', 17, '#006400'),
(2001, 'Jatiya Party (Ershad)', 14, '#FFD700'),
(2001, 'Others', 14, '#808080');
