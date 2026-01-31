# Train AI Feature

## Overview
The Train AI feature allows admins to add custom Q&A pairs that the AI chatbot (Prerona) will prioritize when answering user questions.

## How It Works
1. **Admin adds Q&A** via `/adm/train-ai`
2. **User asks question** in chatbot
3. **AI searches in priority order**:
   - 🥇 Admin-trained knowledge (TRUSTED SOURCE)
   - 🥈 Local database (updates, rumors)
   - 🥉 Web search (if enabled)

## Admin Panel Features
- **Add/Edit Q&A pairs**
- **Categorize by Division** (e.g., "NID", "ভোট কেন্দ্র")
- **Keywords** for better matching
- **Priority** (higher = searched first)
- **Toggle active/inactive** without deleting

## Database Schema
```sql
CREATE TABLE ai_knowledge (
    id INTEGER PRIMARY KEY,
    division TEXT NOT NULL,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    keywords TEXT,
    priority INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TEXT,
    updated_at TEXT
);
```

## Files Modified
- `src/lib/schema/10_ai_knowledge.sql` - Database table
- `src/lib/api.ts` - CRUD functions
- `src/services/aiService.ts` - Knowledge search integration
- `src/pages/AdminTrainAI.tsx` - Admin interface
- `src/components/AdminLayout.tsx` - Nav item
- `src/App.tsx` - Route

## Usage
1. Go to Admin Panel → Train AI
2. Click "+ নতুন প্রশ্ন যোগ করুন"
3. Select division, enter question & answer
4. Add keywords (optional) for better matching
5. Set priority (0-100)
6. Save

The AI will now use this answer when users ask similar questions!
