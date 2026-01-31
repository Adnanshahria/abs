# File: src/components/SEO.tsx

## Analysis
- **Type**: Utility Component
- **Purpose**: Injects SEO meta tags into the document head.
- **Key Logic**:
    - Renders `<title>` and `<meta>` tags as direct children.
- **Dependencies**: None.

## Identified Bugs / Issues
1.  **[Best Practice] React Head Management**: Relying on React to hoist these tags from a component deep in the tree works mostly but `react-helmet-async` (installed in package.json) is the preferred way to prevent duplicate tags and ensure SSR compatibility.
