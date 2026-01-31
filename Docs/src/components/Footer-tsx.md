# File: src/components/Footer.tsx

## Analysis
- **Type**: Layout Component
- **Purpose**: Application footer displaying emergency contacts.
- **Key Logic**:
    - Static rendering.
- **Dependencies**: `lucide-react`.

## Identified Bugs / Issues
1.  **[Functionality] Dead Link**: Same as `EmergencyContacts`, `#nearby-police` does nothing.
2.  **[Redundancy]**: Re-implements the exact same links as `EmergencyContacts.tsx` but with different styling/structure. Consider reusing the component.