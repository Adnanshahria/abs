-- Create Voters Table
CREATE TABLE IF NOT EXISTS voters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nid TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    date_of_birth TEXT,
    vote_center_id INTEGER,
    FOREIGN KEY (vote_center_id) REFERENCES vote_centers(id)
);
