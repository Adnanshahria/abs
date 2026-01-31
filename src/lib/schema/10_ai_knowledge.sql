-- AI Knowledge Base for Training the Chatbot
-- Admins can add custom Q&A pairs that the AI will prioritize

CREATE TABLE IF NOT EXISTS ai_knowledge (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    division TEXT NOT NULL,           -- Category (e.g., "ভোটার নিবন্ধন", "NID", "ভোট কেন্দ্র")
    question TEXT NOT NULL,           -- The question/trigger
    answer TEXT NOT NULL,             -- The AI's response
    keywords TEXT,                    -- Optional: comma-separated keywords for better matching
    priority INTEGER DEFAULT 0,       -- Higher = searched first
    is_active INTEGER DEFAULT 1,      -- 1 = active, 0 = disabled
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster searching
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_division ON ai_knowledge(division);
CREATE INDEX IF NOT EXISTS idx_ai_knowledge_active ON ai_knowledge(is_active);
