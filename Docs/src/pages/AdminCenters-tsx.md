# File: src/pages/AdminCenters.tsx

## Analysis
- **Type**: Admin Page (CRUD)
- **Purpose**: Interface for managing polling stations/vote centers.
- **Key Logic**:
    - **Structure**: Similar to Candidates page (Table + Modal Form).
    - **Geolocation**: Inputs for Latitude/Longitude.
- **Dependencies**: `api`, `SEAT_SYSTEM`.

## Identified Bugs / Issues
1.  **[Validation] Geodata**: No validation that Latitude (-90 to 90) and Longitude (-180 to 180) are within valid ranges. Invalid data breaks maps.
2.  **[UX]**: No interactive map picker. Users must manually find and copy-paste coordinates from Google Maps, which is error-prone.
