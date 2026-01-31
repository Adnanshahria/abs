# File: src/pages/CandidateList.tsx

## Analysis
- **Type**: Page
- **Purpose**: Display election results/stats and user reviews.
- **Key Logic**:
    - **Filtering**: Cascading dropdowns (Division -> District -> Constituency).
    - **Stats**: Fetches vote counts from `getVoteStats`.
    - **Reviews**: Fetches reviews and filters/sorts.
    - **Export**: Uses `html-to-image` to download result card.
- **Dependencies**: `api`, `SEAT_SYSTEM`, `html-to-image`.

## Identified Bugs / Issues
1.  **[Performance] Client-Side Filtering**: `loadStats` fetches reviews filtered by location, but the "Party" filter is applied in-memory (`getProcessedReviews`). If a seat has thousands of reviews, fetching them all just to filter by party on the client is inefficient.
2.  **[Hardcoded Data]**: Party colors and labels are hardcoded in local dictionaries (`getAllianceColor`, `getAllianceLabel`). If new parties are added to DB, this page requires code changes.
