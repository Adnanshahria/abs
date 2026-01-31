# File: src/lib/db.ts

## Analysis
- **Type**: Utility (Database Infrastructure)
- **Purpose**: Initializes the LibSQL/Turso client.
- **Key Logic**:
    - Reads environment variables `VITE_TURSO_DB_URL` and `VITE_TURSO_DB_TOKEN`.
    - Throws error immediately if vars are missing.
    - Exports `checkConnection` diagnostic function.
- **Dependencies**: `@libsql/client`.

## Identified Bugs / Issues
- No functional bugs.
- **[Robustness]**: `checkConnection` logs to console only.
