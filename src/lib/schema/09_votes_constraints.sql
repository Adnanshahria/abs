-- Add user_id column to votes table to track who voted
ALTER TABLE votes ADD COLUMN user_id INTEGER;

-- Create a UNIQUE index ensures a user can only have ONE vote entry in the table
-- We use IF NOT EXISTS to be safe, though index usually requires name uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS idx_votes_user_id ON votes(user_id);
