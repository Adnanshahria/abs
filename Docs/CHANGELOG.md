# Changelog

## [2026-01-29] - Admin Panel Fixes

### Fixed
- **AdminLayout.tsx**: Fixed a runtime error where `item` was undefined because `NavLink` was not wrapped in `navigation.map()`. The side navigation now correctly iterates over menu items.
- **Admin Access**: Reset the local database admin password to `admin123` (for email `admin@amarballot.com`) to resolve "Invalid password" errors. This was done via a temporary script `scripts/reset_admin_password.js` which has since been removed.

### Changed
- **Dependencies**: Verified `bcryptjs` is available for password hashing.
