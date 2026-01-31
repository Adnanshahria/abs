# File: src/components/NavigationMap.tsx

## Analysis
- **Type**: UI Component (Floating Action Button)
- **Purpose**: A fixed bottom-right menu providing quick access to all major site sections.
- **Key Logic**:
    - Toggles visibility on click.
    - Hides automatically on mobile if on `/chat` route.
- **Dependencies**: `react-router-dom`, `lucide-react`.

## Identified Bugs / Issues
1.  **[Styling] Missing Class**: Uses `custom-scrollbar` class (Line 62) which does not appear to be defined in `index.css` (which used standard webkit pseudoselectors).
