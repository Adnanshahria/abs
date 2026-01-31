# File: src/pages/VideoTutorials.tsx

## Analysis
- **Type**: Page (Public)
- **Purpose**: Display educational videos.
- **Key Logic**:
    - **Data**: Static list of YouTube video IDs.
- **Dependencies**: `YouTubeEmbed`.

## Identified Bugs / Issues
1.  **[Maintenance] Hardcoded Content**: The list of videos (`videoList`) is hardcoded in the component. Admins cannot add/remove tutorials via the admin panel.
