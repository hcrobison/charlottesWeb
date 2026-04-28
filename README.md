# Charlotte Portfolio + Chatbot Backend

This project has:
- A static frontend hosted on GitHub Pages.
- A TypeScript Node.js chatbot backend hosted on Vercel.

## Frontend Files

- `index.html` - Charlotte portfolio homepage + chat widget
- `achievements.html` - second page for multi-page navigation and JS filter testing
- `styles.css` - shared styles
- `script.js` - pet counter, achievements filter, and chat API client
- `.github/workflows/pages.yml` - GitHub Pages deployment workflow

## Backend Files (`backend/`)

- `api/chat.ts` - Vercel serverless endpoint (`POST /api/chat`)
- `src/chat/intentRouter.ts` - message-to-intent detection
- `src/chat/replies.ts` - rule-based Charlotte responses
- `src/types/chat.ts` - TypeScript request/response types
- `src/config/cors.ts` - CORS allowlist helpers
- `tsconfig.json` - TypeScript config
- `vercel.json` - Vercel function runtime config
- `.env.example` - backend environment variable template

## Chat API Contract

- Endpoint: `POST /api/chat`
- Request JSON:
  - `{ "message": "string", "sessionId": "optional-string" }`
- Success JSON:
  - `{ "reply": "string", "intent": "string", "timestamp": "iso-string" }`
- Error JSON:
  - `{ "error": "string" }`

## Deploy Frontend (GitHub Pages)

1. Push this repository to GitHub on branch `main`.
2. Open **Settings > Pages** in GitHub.
3. Set **Source** to **GitHub Actions**.
4. Run or re-run workflow **Deploy static site to GitHub Pages**.
5. Confirm:
   - `/` and `/achievements.html` load correctly.
   - Existing JS interactions still work.

## Deploy Backend (Vercel)

1. Create a new Vercel project and set the project root to `backend/`.
2. Add environment variable:
   - `FRONTEND_ORIGIN=https://<your-github-username>.github.io`
3. Deploy and copy your Vercel URL:
   - `https://<your-vercel-project>.vercel.app`
4. Test:
   - `POST https://<your-vercel-project>.vercel.app/api/chat`

## Connect Frontend to Backend

1. In `index.html`, update meta tag `chat-api-base-url` to your backend URL.
2. Redeploy the frontend via GitHub Pages workflow.
3. Open the homepage and verify chat replies are returned.

## Local Backend Commands

Run from the `backend/` directory:

1. `npm install`
2. `npm run typecheck`
3. `npx vercel@latest dev --listen 3001`
