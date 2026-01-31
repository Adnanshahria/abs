# File: src/pages/AdminCandidates.tsx

## Analysis
- **Type**: Admin Page (CRUD)
- **Purpose**: Interface for managing election candidates.
- **Key Logic**:
    - **Fetch**: Loads all candidates on mount.
    - **Create/Update**: Modal form with cascading dropdowns (Division -> District -> Constituency) sourced from `SEAT_SYSTEM`.
    - **Delete**: Confirms before deletion.
- **Dependencies**: `api`, `SEAT_SYSTEM`, `lucide-react`.

## Identified Bugs / Issues
1.  **[Scalability] No Pagination**: Loads *all* candidates into one table. With 300+ constituencies and multiple candidates each, this list will become unmanageable.
2.  **[Validation]**: Minimal validation on Age/Input fields aside from HTML attributes.
