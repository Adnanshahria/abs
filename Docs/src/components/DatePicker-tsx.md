# File: src/components/DatePicker.tsx

## Analysis
- **Type**: UI Component (Form Input)
- **Purpose**: A custom calendar interface for selecting dates (specifically DOB).
- **Key Logic**:
    - Renders a custom grid for days of the month.
    - Handles month/year navigation separately.
    - Converts selected Date object to string (YYYY-MM-DD) for parent.
- **Dependencies**: `lucide-react`.

## Identified Bugs / Issues
1.  **[Critical] Date/Timezone Logic**: `handleDateSelect` uses `date.toISOString().split('T')[0]` (Line 62). `toISOString` converts the local date to **UTC**. If a user in Bangladesh (GMT+6) selects "Jan 1, 2000", `date` is "Jan 1, 2000 00:00:00 GMT+6". In UTC, this is "Dec 31, 1999 18:00:00". `toISOString` returns "1999-12-31...".
    *   **Result**: The saved date is one day behind the selected date.
    *   **Fix Recommendation**: Use local date formatting: `const offset = date.getTimezoneOffset(); const local = new Date(date.getTime() - (offset*60*1000)); return local.toISOString().split('T')[0];` or simple string concatenation.