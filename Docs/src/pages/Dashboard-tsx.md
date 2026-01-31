# File: src/pages/Dashboard.tsx

## Analysis
- **Type**: Page (Protected)
- **Purpose**: User's personalized dashboard showing voting status, NID details, and quick actions.
- **Key Logic**:
    - **Auth**: Redirects to `/verify-nid` if verification status is not 'verified'.
    - **Data**: Fetches `checkUserVoteStatus`.
    - **UI**: Visual digital ID card and election countdown.
    - **Vote Center Locator**: `handleNearestVoteCenter()` uses browser geolocation to open Google Maps with a search for "polling station vote center" centered on the user's current location. Shows a loading spinner while locating.
- **Dependencies**: `AuthContext`, `api`.

## Identified Bugs / Issues
1.  **[Hardcoded Data] User Name Fallback**: `const userName = (user as any)?.name || 'Adnan Shahria';` - Hardcodes a specific name as fallback.
2.  **[Hardcoded Data] ID Details**: Defaults NID (`1993 2847 3290`) and DOB (`12 Oct 1995`) if missing from user object.
3.  **[Hardcoded Data] Election Date**: `2026-02-12` is hardcoded. Should be dynamic/configurable.
4.  **[Types]**: Extensive use of `(user as any)` casting suggests `AuthContext` User type is incomplete/outdated.

