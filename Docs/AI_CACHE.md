# AI Knowledge Base Caching

The AI chatbot uses **persistent localStorage caching** for the Turso database content.

---

## How It Works

| Feature | Details |
|---------|---------|
| **Cache Location** | Browser localStorage |
| **Cache Duration** | **LIFETIME** (365 days, admin refresh only) |
| **Data Cached** | AI Knowledge, Updates, Rumors |
| **Persistence** | Survives page reloads, browser restart |

## Cache Keys

- `amar_ballot_ai_knowledge_cache` - Trained AI Q&A pairs
- `amar_ballot_updates_cache` - Election updates
- `amar_ballot_rumors_cache` - Rumor/fact-check data
- `amar_ballot_cache_timestamp` - Last update time

---

## Force Refresh Cache

From admin panel or code, you can force refresh:

```typescript
import { forceRefreshCache } from '../services/aiService';

// Call this after admin updates data
await forceRefreshCache();
```

---

## Admin Dashboard Controls

Located at `/adm` (Admin Dashboard):

| Button | Action |
|--------|--------|
| 🔄 **Force Refresh** | Clears cache, reloads from Turso DB |
| 💾 **Setup Cache** | Initializes cache with latest data |
| 🧠 **Add Knowledge** | Opens Train AI page to add new Q&A pairs |

---

## Priority Order for AI Responses

1. **HIGHEST**: Admin-trained knowledge base (cached)
2. **SECOND**: Election updates & rumors (cached)
3. **THIRD**: Web search (Brave API) - only if no DB results

---

## Auto-Learn System

When a user asks a question **not found in the knowledge base**, the system:

1. Gets AI response (from web search or general knowledge)
2. **Automatically saves** the Q&A pair to Turso DB
3. Extracts keywords for better future matching
4. Invalidates cache so the new data is available

| Feature | Details |
|---------|---------|
| Auto-save | Enabled by default |
| Category | `সাধারণ প্রশ্ন` (General) |
| Priority | 1 (Low - user-generated) |
| Deduplication | Per-session to avoid spam |
