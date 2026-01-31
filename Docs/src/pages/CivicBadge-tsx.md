# File: src/pages/CivicBadge.tsx

## Analysis
- **Type**: Page (Gamification)
- **Purpose**: Engaging users with civic duties and quizzes.
- **Key Logic**:
    - **Tabs**: Internal state for switching views.
    - **Quiz**: Simple client-side validation.
- **Dependencies**: `confetti`.

## Identified Bugs / Issues
1.  **[Logic] Hardcoded Quiz**: The quiz logic (Line 28) hardcodes the first option (Index 0) as the correct answer. This allows for easy cheating and limits the quiz complexity.
2.  **[Logic] Mock Data**: Referral codes and counts (Lines 16-17) are hardcoded mocks and not connected to real user data.
