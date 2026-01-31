DROP TABLE IF EXISTS election_updates;
CREATE TABLE IF NOT EXISTS election_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  author_name TEXT DEFAULT 'Admin',
  tags TEXT,
  read_time INTEGER DEFAULT 2,
  view_count INTEGER DEFAULT 0,
  source_url TEXT,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rumors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK(status IN ('verified', 'fake')) NOT NULL DEFAULT 'fake',
  source TEXT,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
