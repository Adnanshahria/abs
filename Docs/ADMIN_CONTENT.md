# Admin Content Management System

## Overview

The `/adm/content` route provides a centralized hub for managing website content. It is organized into 5 sub-pages for better organization and usability.

## Route Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/adm/content` | `AdminContent.tsx` | Navigation hub with cards linking to sub-pages |
| `/adm/content/branding` | `AdminContentBranding.tsx` | Logo and Favicon management |
| `/adm/content/about` | `AdminContentAbout.tsx` | About page content |
| `/adm/content/contact` | `AdminContentContact.tsx` | Contact page content |
| `/adm/content/services` | `AdminContentServices.tsx` | Services page content |
| `/adm/content/citizen` | `AdminContentCitizen.tsx` | Good Citizen inspiring message |

## Features

### Auto-Save
All content sub-pages implement auto-save functionality:
- Changes are saved automatically 800ms after you stop typing
- Visual indicators show save status: Saving... → Saved ✓ → Error
- Optimistic UI updates - changes appear immediately

### Dual Language Support
All content can be edited in both English and Bengali (বাংলা).

### Content IDs

The system uses ID prefixes to organize content:
- `branding_` - Logo and favicon
- `about_`, `mission_`, `vision_`, `trust_`, `story_` - About page
- `contact_` - Contact page
- `services_`, `service_` - Services page
- `citizen_` - Good citizen message

## Data Storage

Content is stored in the `page_content` table in Turso (libsql) database:

```sql
CREATE TABLE page_content (
    id TEXT PRIMARY KEY,
    content TEXT NOT NULL,
    content_bn TEXT,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## API Functions Used

- `getAllPageContent()` - Fetch all content items
- `updatePageContent(id, content, content_bn)` - Update a content item
