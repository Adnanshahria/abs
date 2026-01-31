# File: src/pages/CastVote.tsx

## Analysis
- **Type**: Page (Protected)
- **Purpose**: Core voting interface.
- **Key Logic**:
    - **Check**: Verifies if user has already voted on mount.
    - **Submit**: Sends vote data to `submitVote` API.
- **Dependencies**: `api`, `AuthContext`.

## Identified Bugs / Issues
1.  **[Maintenance] Hardcoded Parties**: The list of parties (`PARTIES` array) is hardcoded in this file. It violates DRY (duplicated in `CandidateList` as `ALL_ALLIANCES` codes) and means adding a party requires editing this file. It does not fetch available candidates/parties for the specific seat from the DB.
    - **Impact**: Users might vote for "Independent" here, but if the specific seat has no Independent candidate, it creates data inconsistency (or if unique candidates aren't mapped).
