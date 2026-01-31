-- Add user_name column to votes table for crediting reviews
ALTER TABLE votes ADD COLUMN user_name TEXT;
