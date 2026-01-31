# File: src/components/AdminLogin.tsx

## Analysis
- **Type**: Component (Form/Modal)
- **Purpose**: A blocking modal that forces the user to log in before accessing Admin routes.
- **Key Logic**:
    - Captures email/password.
    - Calls `login` from `AuthContext`.
    - Checks `result.user.role === 'admin'` to enforce privileges.
- **Dependencies**: `react-router-dom`, `AuthContext`.

## Identified Bugs / Issues
1.  **[Security]**: The Label "Secure Password" is misleading because the backend uses plain text storage (as noted in `api.ts` analysis).
2.  **[UX]**: The "Close" button (X) redirects to Home (`/`). This is standard behavior for a modal blocking a protected route.