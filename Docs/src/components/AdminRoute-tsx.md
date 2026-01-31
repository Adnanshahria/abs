# File: src/components/AdminRoute.tsx

## Analysis
- **Type**: Higher-Order Component / Wrapper
- **Purpose**: Protects admin routes from unauthorized access.
- **Key Logic**:
    - Checks `isLoggedIn` and `user.role === 'admin'`.
    - If authorized: Renders `<AdminLayout />`.
    - If unauthorized: Renders `<AdminLogin />`.
- **Dependencies**: `AuthContext`, `AdminLayout`, `AdminLogin`.

## Identified Bugs / Issues
- No bugs found. Logic correctly gates access.