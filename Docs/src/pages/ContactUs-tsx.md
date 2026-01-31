# File: src/pages/ContactUs.tsx

## Analysis
- **Type**: Page (Public)
- **Purpose**: Contact form and info.
- **Key Logic**:
    - **Form**: Layout for contact inputs.
- **Dependencies**: None.

## Identified Bugs / Issues
1.  **[Logic] Dead Form**: The form inputs are uncontrolled and the "Send Message" button has no `onClick` handler (nor is it `type="submit"` within a handled form). Clicking it does nothing or triggers a page reload without sending data.
