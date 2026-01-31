# Amar Ballot - Comprehensive Bug Report & Codebase Analysis

## 1. Executive Summary
This report summarizes the findings from a complete file-by-file audit of the "Amar Ballot" web application. The audit focused on identifying bugs, security vulnerabilities, logical flaws, and dead code. **No code was modified**, as per instructions.

**Overall Health**: 
The codebase is structured well (React + Vite + Tailwind) but contains **critical security vulnerabilities**, **numerous dead/placeholder features**, and **unsafe type practices**. The application is largely a visual prototype with significant backend gaps.

## 2. Critical Issues (Must Fix)

### 🚨 Security
1.  **Plain Text Passwords**: `src/lib/api.ts` stores and compares passwords in plain text. `bcryptjs` is installed but unused.
2.  **Unsafe Database Queries**: `src/pages/AdminUpdates.tsx` stores images as Base64 strings directly in the DB, causing massive bloat and potential injection risks if not sanitized.
3.  **Client-Side "Security"**: 
    - `src/context/AuthContext.tsx` does not persist sessions (refreshing logs you out).
    - `src/pages/NIDVerification.tsx` has a "Skip NID" button that bypasses verification logic entirely.
    - `src/pages/AdminRoute.tsx` relies on client-side state that can be easily manipulated.
4.  **PII Exposure**: `src/pages/AdminUsers.tsx` displays National ID (NID) numbers in plain text.

### 🐛 Critical Functional Bugs
1.  **Broken Forms**:
    - `src/pages/ContactUs.tsx`: "Send Message" button does nothing (dead form).
    - `src/pages/ReportIncident.tsx`: "Submit" button does nothing.
    - `src/pages/Volunteer.tsx`: "Sign Up" form is uncontrolled and dead.
2.  **Timezone Error**: `src/components/DatePicker.tsx` saves dates in UTC, causing them to appear one day behind for Bangladeshi users (GMT+6).
3.  **Dead Buttons/Links**:
    - `src/pages/CandidateDetails.tsx`: Hardcoded to "Nargis Akter".
    - `src/pages/VoteCenter.tsx`: "Search" button ignores input and always shows the same result.
    - `src/components/EligibilityCard.tsx`: "Check Result" button dead.
    - `src/pages/Course.tsx` & `src/pages/PastResults.tsx`: Call-to-actions are non-functional.

## 3. Code Quality & Maintenance

### ⚠️ Type Safety
- **Extensive use of `any`**: Almost all complex data types (User, Candidate, Updates) are typed as `any`, determining the purpose of TypeScript. `src/lib/api.ts` is the biggest offender.
- **Lint Errors**: 69+ problems found (mostly `no-explicit-any` and unused variables).

### 🏗 Architecture
- **Hardcoded Data**:
    - `src/pages/CandidateList.tsx`: Party colors and lists are hardcoded.
    - `src/pages/Dashboard.tsx`: Hardcoded election date (2026-02-12).
    - `src/context/LanguageContext.tsx`: Translation function `t()` is broken/placeholder.
- **Performance**:
    - `src/pages/AdminCandidates.tsx` loads ALL candidates at once (no pagination).
    - Client-side filtering used for Search in `RumorCheck` and `CandidateList`, which won't scale.

## 4. Statistics
- **Total Files Documented**: 60+
- **Build Status**: ✅ Passed (`npm run build` succeeds)
- **Lint Status**: ❌ Failed (69 errors)

## 5. Next Steps
1.  **Security Patches**: Immediately implement password hashing and session persistence.
2.  **Backend Integration**: Connect dead forms (Contact, Report, Volunteer) to real API endpoints.
3.  **Refactoring**: Replace hardcoded data with dynamic API calls (Candidates, Vote Centers).
4.  **Type Cleanup**: Define interfaces in `src/lib/types.ts` and remove `any`.
