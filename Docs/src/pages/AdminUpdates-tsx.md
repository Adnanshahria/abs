# File: src/pages/AdminUpdates.tsx

## Analysis
- **Type**: Admin Page (CRUD)
- **Purpose**: Create and manage election updates with enhanced metadata.
- **Key Features**:
    - **Card Grid Display**: Shows existing updates in 3-column grid with previews
    - **Add Modal**: Form with fields for title, author, tags, read time, image, content
    - **Tag Preview**: Live preview of tags as pills while typing
    - **Image Upload**: File upload with Base64 encoding and preview
- **Form Fields**:
    - Title (required)
    - Author Name (optional, defaults to 'Admin')
    - Tags (comma-separated, converted to array)
    - Read Time (minutes, defaults to 2)
    - Image (optional, file upload)
    - Content (required)
- **Dependencies**: `api` (getUpdates, addUpdate, deleteUpdate), `types`

## Identified Bugs / Issues
1. **[Performance/Architecture] Base64 Images**: Storing images as Base64 strings in a SQL database is an anti-pattern. Consider using a file storage service for large images.
