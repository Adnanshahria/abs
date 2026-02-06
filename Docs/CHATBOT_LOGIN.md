# Chatbot Login Requirement

The chatbot (`/chat` route) requires user authentication. Unauthenticated visitors see a login prompt popup instead of the chat interface.

---

## Implementation Details

### How It Works

In `Chat.tsx`, the component checks `isLoggedIn` from `AuthContext`:
- **Logged in** → Shows the full chat interface
- **Not logged in** → Shows a login prompt with:
  - Description of the chatbot features (in Bengali)
  - List of what users can ask about
  - Login button linking to `/sign-up`

### Key Code

```tsx
const { isLoggedIn } = useAuth();

if (!isLoggedIn) {
    return (
        // Login prompt popup
    );
}

return (
    // Full chat interface
);
```

---

## User Flow

1. User navigates to `/chat`
2. If **not logged in** → sees login prompt popup
3. Clicks "লগইন করুন" → goes to `/sign-up`
4. After login → full chat interface is accessible
