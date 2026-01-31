# Turso Database Setup Guide for Amar Ballot

Turso is a distributed database based on SQLite. This guide connects it to your React app.

## Prerequisites
- Node.js installed
- Turso CLI installed (or use web dashboard)

## Step 1: Install Turso CLI
Open your terminal (PowerShell) and run:
```powershell
# Windows (via Scoop)
scoop install turso

# OR MacOS/Linux
curl -sSfL https://get.tur.so/install.sh | bash
```
*If you don't have Scoop, you can install it or just use the [Turso Web Dashboard](https://turso.tech).*

## Step 2: Login & Create Database
1.  **Login:**
    ```bash
    turso auth login
    ```
    This opens your browser to authenticate.

2.  **Create Database:**
    ```bash
    turso db create amar-ballot-db
    ```

3.  **Get Connection URL:**
    ```bash
    turso db show amar-ballot-db
    ```
    Copy the URL starting with `libsql://`.

4.  **Create Auth Token:**
    ```bash
    turso db tokens create amar-ballot-db
    ```
    Copy the long JWT string.

## Step 3: Install SDK
In your project folder (`amar-ballot-web`), run:
```bash
npm install @libsql/client
```

## Step 4: Configure Environment Variables
Create or update your `.env` file in the project root:

```env
VITE_TURSO_DB_URL=libsql://your-database-name.turso.io
VITE_TURSO_DB_TOKEN=your-turso-auth-token-here
```
*(Make sure to prefix with `VITE_` if using in frontend code, though usually DB access should be server-side or via edge functions. For a client-side only app, be careful exposing tokens).*

> **Review:** Since this is a React app, direct DB access exposes your token. It is recommended to use:
> 1. A backend (Node/Express/Next.js API routes).
> 2. Or Turso's embedded replica feature if meant for local-first (read only public data).
> 3. Or a serverless function (Vercel/Netlify functions).

## Step 5: Verify Connection (Example Code)
Create a service file `src/services/db.ts`:

```typescript
import { createClient } from "@libsql/client/web";

export const turso = createClient({
  url: import.meta.env.VITE_TURSO_DB_URL!,
  authToken: import.meta.env.VITE_TURSO_DB_TOKEN!,
});

export async function checkConnection() {
  try {
    const rs = await turso.execute("SELECT 1");
    console.log("Connected to Turso!", rs);
    return true;
  } catch (e) {
    console.error("Turso connection failed:", e);
    return false;
  }
}
```
