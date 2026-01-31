# File: src/pages/ElectionUpdates.tsx

## Analysis
- **Type**: Page (Public)
- **Purpose**: Display election updates in a modern card-based grid layout.
- **Key Features**:
    - **Card Grid**: 3-column responsive grid displaying update cards
    - **Card Elements**: Featured image, view count badge, decorative wave border, tags, title, content preview, author info, date, read time
    - **Hover Effect**: Subtle elevation with shadow and scale transform
    - **Detail Modal**: Full-screen modal for reading complete update
    - **View Tracking**: Increments view count when card is clicked
- **Data Fields**:
    - `title`, `content`, `image_url`, `published_at`
    - `author_name`, `tags` (array), `read_time` (minutes), `view_count`
- **Dependencies**: `api` (getUpdates, incrementViewCount), `types` (ElectionUpdate)

## Identified Bugs / Issues
- No bugs found.
