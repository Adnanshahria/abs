# File: src/components/EmergencyContacts.tsx

## Analysis
- **Type**: Component (UI Widget)
- **Purpose**: Displays quick access buttons for emergency services (999, Police).
- **Key Logic**:
    - Renders static links styled as buttons.
- **Dependencies**: `lucide-react`, `LanguageContext`.

## Identified Bugs / Issues
1.  **[Functionality] Dead Link**: The "Nearby Police" link (`href="#nearby-police"`) is a placeholder anchor that does not navigate anywhere or open any map.