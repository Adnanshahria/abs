# Changelog

## [2026-02-03] - Admin-Editable Content & Dynamic Archive

### Added
- **AdminContent.tsx**: New admin page at `/adm/content` for editing About, Contact, and Services page content.
- **Branding Section**: Logo and favicon file upload with base64 storage in database.
- **page_content table**: Database schema for storing editable page content (EN/BN).
- **API functions**: `getPageContent()`, `updatePageContent()`, `getAllPageContent()` for content management.
- **AdminLayout.tsx**: Added "Content" and "Reports" links to admin sidebar navigation.
- **PastResults.tsx**: Dynamic historical election data with charts for 2024, 2018, 2014, 2008, 2001.
- **past_elections tables**: Database schema for storing historical election seat distributions.

### Changed
- **Header.tsx**: Now fetches dynamic logo from database branding settings.
- **ContactUs.tsx**: Now fetches contact info (email, phone, address) dynamically from database.
- **Footer.tsx**: "Report" link now goes to `/adm/incidents`, "Nearby Police" opens Google Maps search.
- **App.tsx**: Footer is now hidden on admin pages (`/adm/*` routes).

## [2026-02-03] - Cloudflare Pages Optimization

### Added
- **cache.ts**: Client-side localStorage caching utility with TTL support to reduce DB reads.
- **_headers**: Cloudflare Pages caching headers file (1 year for assets, 5 min for HTML).
- **_redirects**: SPA routing support for Cloudflare Pages.

### Changed
- **api.ts**: `getCandidates()` now uses caching with 10-minute TTL. Cache invalidation on add/update/delete.

## [2026-02-03] - Good Citizen Popup Feature

### Added
- **EligibilityCard.tsx**: Enhanced success popup with sparkle animations and dynamic inspiring message
- **AdminContent.tsx**: Added "Good Citizen Message" section for editing the inspiring message
- **12_page_content.sql**: Added default inspiring message for good citizens

---

## [2026-02-03] - Universal Footer Redesign

### Added
- **Footer.tsx**: Completely redesigned the Footer component with:
  - Rounded-rectangle styling matching the navbar (`rounded-lg`, `border border-green-200`).
  - Brand section with logo, tagline ("Empowering Democracy, Together"), and social media icons.
  - Quick Links: Home, Candidates, Results.
  - Support Links: About Us, Contact, Report, Tutorials.
  - Emergency Contacts section with 999 and Nearby Police links.
  - Copyright notice: `© {Year} Amar Ballot. All rights reserved.`
  - Trademark notice: `This product is registered to @ Amar Ballot ™`
  - **Mobile-first responsive design**: 2-column grid on mobile, smaller fonts, compact spacing.
- **App.tsx**: Added `Footer` component to main layout for universal visibility.

### Removed
- **Home.tsx**: Removed duplicate `EmergencyContacts` component (now in universal footer).

---

## [2026-01-29] - Admin Panel Fixes

### Fixed
- **AdminLayout.tsx**: Fixed a runtime error where `item` was undefined because `NavLink` was not wrapped in `navigation.map()`. The side navigation now correctly iterates over menu items.
- **Admin Access**: Reset the local database admin password to `admin123` (for email `admin@amarballot.com`) to resolve "Invalid password" errors. This was done via a temporary script `scripts/reset_admin_password.js` which has since been removed.

### Changed
- **Dependencies**: Verified `bcryptjs` is available for password hashing.
