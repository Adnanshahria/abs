# File: src/pages/SignUp.tsx

## Analysis
- **Type**: Page
- **Purpose**: Combined Login and Registration form.
- **Key Logic**:
    - **Toggle**: Switches user interface between Login/Signup modes.
    - **Auth**: Calls `login` or `register` from `AuthContext`.
- **Dependencies**: `AuthContext`, `Modal`.

## Identified Bugs / Issues
1.  **[Validation] Client-Only**: Password confirmation is only checked on client.
2.  **[Security]**: Relies on `api.ts` which has known plain-text password handling.
3.  **[UX]**: No "Forgot Password" functionality implemented (button present but dead).
