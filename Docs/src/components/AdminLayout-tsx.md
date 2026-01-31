# File: src/components/AdminLayout.tsx

## Analysis
- **Type**: Layout Component
- **Purpose**: Provides the consistent shell for Admin pages, including a responsive sidebar and header.
- **Key Logic**:
    - **Sidebar**: Renders navigation links defined in `navigation` array. Highlights active link based on current path.
    - **Responsive**: Hidden sidebar on mobile, toggled via hamburger menu (`isMobileMenuOpen`).
    - **Auth**: Displays current user info and handles logout.
- **Dependencies**: `react-router-dom`, `lucide-react`, `AuthContext`.

## Identified Bugs / Issues
- No critical bugs.
- **[UX]**: Mobile menu overlay covers content but backdrop click to close isn't explicitly clear (only closes on link click or explicit X button).