# File: src/pages/ReportIncident.tsx

## Analysis
- **Type**: Page (Form)
- **Purpose**: Reporting violations.
- **Key Logic**: Form layout.
- **Dependencies**: None.

## Identified Bugs / Issues
1.  **[Logic] Dead Form**: The "Submit Report" button (Line 44) triggers no action; the form lacks an `onSubmit` handler.
2.  **[Privacy] Contradiction**: The page claims "Your identity will remain confidential" (Line 13) but explicitly lacks anonymity features and likely (if implemented) would send the user's Auth metadata or the fields for Name/Phone.
