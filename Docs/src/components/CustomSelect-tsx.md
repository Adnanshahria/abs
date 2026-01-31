# File: src/components/CustomSelect.tsx

## Analysis
- **Type**: UI Component (Form Input)
- **Purpose**: A searchable dropdown selector for single-choice items.
- **Key Logic**:
    - **Modal**: Opens a modal on click (better for mobile).
    - **Search**: Filters `options` array based on `searchTerm`.
    - **Selection**: Returns selected string via `onChange`.
- **Dependencies**: `lucide-react`.

## Identified Bugs / Issues
1.  **[Hardcoded Icon]**: Starts with a `<MapPin />` icon in the modal header (Line 56), assuming it's always used for location selection. If used for other data types (e.g., Party), this icon is inappropriate.
2.  **[UX]**: `autoFocus` on search input is good.