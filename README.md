# Muskaan Clinic — Next.js

This is the Next.js (App Router) conversion of the original Vite + Express "Muskaan Clinic" project.

## What changed vs. the original

- **Frontend**: The original single Vite `App.tsx` + components are now client components under `src/components/`, rendered from `src/app/page.tsx`.
- **Backend**: The Express `server.ts` (appointments, feedback, and Gemini-powered `/api/chat`) has been reimplemented as Next.js Route Handlers:
  - `src/app/api/appointments/route.ts`
  - `src/app/api/feedback/route.ts`
  - `src/app/api/chat/route.ts`
  - Shared in-memory data lives in `src/lib/server/store.ts` (resets on server restart — swap in a real database for production).
- **Styling**: Tailwind v4 theme (`slate-teal`, `seafoam`, `linen`, `charcoal`, custom fonts) moved into `src/app/globals.css`.

## Run locally

1. Install dependencies:
   ```
   npm install
   ```
2. (Optional) Add your Gemini API key to enable the AI Guide chat — copy `.env.local.example` to `.env.local` and fill in `GEMINI_API_KEY`. Without it, `/api/chat` returns a friendly fallback response.
3. Start the dev server:
   ```
   npm run dev
   ```
4. Open http://localhost:3000

## Build for production

```
npm run build
npm start
```

# drmuskaanclinic
