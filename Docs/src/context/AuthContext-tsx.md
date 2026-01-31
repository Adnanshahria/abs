# File: src/context/AuthContext.tsx

## Analysis
- **Type**: Context Provider
- **Purpose**: Manages global authentication state (user, login status) and exposes auth methods.
- **Key Logic**:
    - **State**: `isLoggedIn`, `user`.
    - **Methods**: `login`, `register`, `verify`, `logout`.
    - **Verification**: Updates local user state immediately upon successful API verification.
- **Dependencies**: `api`.

## Identified Bugs / Issues
1.  **[Architecture] No Persistence**: Session is not persisted. Contains comment: `// In a real app, store token in localStorage here`. Refreshing the page logs the user out immediately.
2.  **[Types]**: Uses `any` extensively for user and credentials objects.
