# File: src/lib/api.ts

## Analysis
- **Type**: Utility (API/Database Layer)
- **Purpose**: Provides functions to interact with the Turso database (candidates, users, votes, rumors, etc.).
- **Key Logic**:
    - Uses `db.execute` with parameterized queries (prevents SQL injection).
    - `loginUser` / `registerUser`: Handles user auth (see Critical Bugs below).
    - `submitVote`: Enforces one-vote-per-user check.
    - `getVoteStats`: Switches between granular (live aggregation) and global (cached `alliance_stats` table) queries based on filters.
- **Dependencies**: `./db`, `./types`.

## Identified Bugs / Issues
1.  **[Critical] Security**: `registerUser` (line 64) stores passwords in **PLAIN TEXT**.
2.  **[Critical] Security**: `loginUser` (line 86) compares passwords in **PLAIN TEXT**. `bcryptjs` is installed (package.json) but NOT used here.
3.  **[Type Safety]**: Extensive use of `any` for arguments (`userData`, `credentials`, `nidData`, `candidateData`, etc.), bypassing TypeScript safety.
4.  **[Consistency]**: `loginUser` returns a User object with specific fields, but `registerUser` does not return the created user or token, forcing a separate login step.
