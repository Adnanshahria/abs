# Social Features - Likes, Comments & Share Links

## Overview

This update adds social interaction features to the Amar Ballot application, allowing users to engage with election updates and rumors through likes, comments, and shareable links.

## Features Implemented

### 1. Likes System
- **Anyone can like** - Both logged-in and anonymous users can like content
- Anonymous users are identified by a device ID stored in localStorage
- Like status persists across page reloads

### 2. Comments System
- **Anyone can comment** - Both logged-in and anonymous users can post comments
- Anonymous users appear as "Anonymous" in comments
- Comments display with user name, date, and content

### 3. Share Links
- Click the share icon next to titles to copy a shareable link
- Links include query parameter `?id=` for direct navigation

### 4. Source URLs (Updates only)
- Admins can add source URLs when creating/editing updates
- Source link button appears in the update modal

## Database Schema

### content_likes table
```sql
CREATE TABLE content_likes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL CHECK(content_type IN ('update', 'rumor')),
    content_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(content_type, content_id, user_id)
)
```

### content_comments table
```sql
CREATE TABLE content_comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL CHECK(content_type IN ('update', 'rumor')),
    content_id INTEGER NOT NULL,
    user_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    comment TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## API Functions

| Function | Description |
|----------|-------------|
| `toggleLike(contentType, contentId, userId)` | Add or remove a like |
| `getLikes(contentType, contentId)` | Get like count |
| `hasUserLiked(contentType, contentId, userId)` | Check if user liked |
| `addComment(contentType, contentId, userId, userName, comment)` | Add a comment |
| `getComments(contentType, contentId)` | Get all comments |

## Files Modified

- `src/lib/types.ts` - Added Comment interface, source_url and like_count fields
- `src/lib/api.ts` - Added likes/comments tables and API functions
- `src/pages/ElectionUpdates.tsx` - Full social features integration
- `src/pages/RumorCheck.tsx` - Full social features integration
- `src/pages/AdminUpdates.tsx` - Added source URL input field
