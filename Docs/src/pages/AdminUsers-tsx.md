# File: src/pages/AdminUsers.tsx

## Analysis
- **Type**: Admin Page (CRUD)
- **Purpose**: View and delete registered users.
- **Key Logic**:
    - Displays user table with verification status (NID).
    - Prevents deleting admins.
- **Dependencies**: `api`.

## Identified Bugs / Issues
1.  **[Privacy] PII Exposure**: Displays sensitive NID numbers in plain text.
