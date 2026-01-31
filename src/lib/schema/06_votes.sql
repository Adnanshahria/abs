-- 1. Main Vote Table (For Audit/Security only - Do not query this for the Chart)
CREATE TABLE IF NOT EXISTS votes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  division TEXT NOT NULL,
  district TEXT NOT NULL,
  seat_no TEXT NOT NULL, -- e.g., 'Chittagong-1'
  alliance_id TEXT NOT NULL,
  user_review TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. The "Cache" Table (Query THIS for the Chart)
CREATE TABLE IF NOT EXISTS alliance_stats (
  alliance_id TEXT PRIMARY KEY,
  alliance_name_bn TEXT,
  total_votes INTEGER DEFAULT 0
);

-- 3. Pre-fill the Alliances (INSERT OR IGNORE to prevent errors on re-run)
INSERT OR IGNORE INTO alliance_stats (alliance_id, alliance_name_bn) VALUES 
('bnp', 'বাংলাদেশ জাতীয়তাবাদী দল (BNP) ও সমমনা জোট'),
('jamayat', 'বাংলাদেশ জামায়াতে ইসলামী ও ১০ দলীয় জোট'),
('islamic_andolon', 'ইসলামী আন্দোলন বাংলাদেশ (হাতপাখা)'),
('gonotontro', 'গণতন্ত্র মঞ্চ'),
('bam_jot', 'বাম গণতান্ত্রিক জোট'),
('jatiya_party', 'জাতীয় পার্টি (Jatiya Party)'),
('independent', 'স্বতন্ত্র প্রার্থী');

-- 4. The Trigger (Automated Counting)
-- Drop trigger first if it exists to ensure we have the latest version
DROP TRIGGER IF EXISTS update_vote_counts;

CREATE TRIGGER update_vote_counts
AFTER INSERT ON votes
BEGIN
  UPDATE alliance_stats 
  SET total_votes = total_votes + 1 
  WHERE alliance_id = NEW.alliance_id;
END;
