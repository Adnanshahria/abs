# File: src/components/Header.tsx

## Analysis
- **Type**: Layout Component
- **Purpose**: Main navigation bar with logo, links, language toggle, notifications, and auth status.
- **Key Logic**:
    - **Responsive**: Adapts layout for mobile/desktop. Hamburger menu for mobile.
    - **Auth**: Shows "Account" button if logged in (`/dashboard`), otherwise "Login" (`/sign-up`).
    - **Language**: Toggles language context.
    - **Notifications**: Bell icon triggers a popup modal showing Election Updates and Rumor Check entries.
        - Dynamic unread count badge (items from last 7 days)
        - Blur backdrop when modal is open
        - Loading state with spinner
        - Combined updates & rumors sorted by date
        - Click notification to navigate to relevant page
- **Dependencies**: `react-router-dom`, `lucide-react`, `LanguageContext`, `AuthContext`, `api.ts` (getUpdates, getRumors).

## Identified Bugs / Issues
1.  **[Logic] Auth Flow**: `handleAccountClick` redirects to `/sign-up` if not logged in. Usually, "Login" button should go to `/login`.
2.  ~~**[UI] Hardcoded Data**: Notification badge count "3" is hardcoded.~~ **FIXED**: Now dynamic based on recent items.
