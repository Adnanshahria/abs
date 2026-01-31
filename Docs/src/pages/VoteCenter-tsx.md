# File: src/pages/VoteCenter.tsx

## Analysis
- **Type**: Page
- **Purpose**: Allow users to find their polling center based on NID.
- **Key Logic**:
    - **Search**: `handleLookup` triggers API call.
- **Dependencies**: `api`.

## Identified Bugs / Issues
1.  **[Logic] Fake Implementation**: The search logic `handleLookup` simply fetches *all* centers (`getVoteCenters`) and displays the first one (`centers[0]`). It completely ignores the `nid` input.
    - Code: `// Here we just fetch the first one from DB for demo.`
2.  **[UI] Static Map**: The map view is a static background image (`bg-[url(...)]`) instead of an interactive Google Map component.
