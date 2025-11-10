## Quick context for AI coding agents

- This is a small Next.js (App Router) web app generated from v0.app. The app lives under `app/` (App Router) not `pages/`.
- Next version: 16 — see `next.config.mjs`. TypeScript and ESLint build errors are ignored in config (so builds may succeed even with type/lint issues).
- Language/locale: Hebrew (RTL). Global layout sets `<html lang="he" dir="rtl">` in `app/layout.tsx` which affects UI and copy direction.

## How to run / build (project-specific)
- Preferred package manager: pnpm (there is `pnpm-lock.yaml`). Common commands from `package.json`:
  - Install deps: `pnpm install` (or `npm install` if pnpm unavailable)
  - Dev server: `pnpm dev` → runs `next dev`
  - Build: `pnpm build` → runs `next build` (note: lint/type errors are ignored during build by config)
  - Start (production): `pnpm start` → `next start`

## Key architectural notes (big picture)
- App Router structure: UI + routes under `app/` (see `app/page.tsx` and `app/layout.tsx`).
- Client components dominate interactive parts: look for `"use client"` at top of files (e.g. `app/page.tsx`, `components/*`).
- API routes are implemented as route handlers under `app/api/*` (e.g. `app/api/send-rating-email/route.ts`). These are server-only code paths.
- Thin frontend: components are small and local-state driven (no global store). Interactions are simple fetch calls to internal API routes.

## Important files to reference
- `app/layout.tsx` — global HTML, fonts, RTL, and analytics (`@vercel/analytics/next`).
- `app/page.tsx` — main page UI; shows how `RatingDialog` is opened and how share/redirect behavior is implemented.
- `components/rating-dialog.tsx` — the rating modal (client component). Uses `forwardRef` + native `<dialog>` and POSTs to `/api/send-rating-email`.
- `components/star-rating.tsx` — small stateless star selector used by `rating-dialog`.
- `app/api/send-rating-email/route.ts` — server handler that sends email via the `resend` package. Env vars required: `RESEND_API_KEY` and `RECIPIENT`.
- `lib/utils.ts` — helper `cn()` that wraps `clsx` + `tailwind-merge` (use for composing className values).

## Project-specific conventions & patterns
- Client components: any interactive UI file uses `"use client"`. Follow existing style (functional components, props typed in TSX).
- Styling: Tailwind CSS classes are used inline heavily (e.g. `w-[min(420px,92vw)]`) and `tw-merge` is used via `cn()` in `lib/utils.ts`.
- Dialog pattern: `RatingDialog` uses the native `<dialog>` element + `forwardRef<HTMLDialogElement>`; open with `ref.current?.showModal()` (see `app/page.tsx`).
- API shape: `/api/send-rating-email` expects JSON body { ratings, average } where `ratings` is an object { q1..q5 } and `average` is a number.
- Languages and copy: strings are in Hebrew and components/layout assume RTL — keep direction & copy in mind when modifying UI or adding pages.

## Integration & secrets
- Email sending: `app/api/send-rating-email/route.ts` uses `new Resend(process.env.RESEND_API_KEY)` and sends to `process.env.RECIPIENT`. Set these in local `.env` or your deployment environment.
- Analytics: `app/layout.tsx` imports `@vercel/analytics/next` — ensure Vercel analytics is enabled if you depend on it.

## Debugging tips specific to this repo
- Dev server logs: server-side console.logs (e.g. email send success/errors) appear in the terminal running `pnpm dev`.
- Network: when testing rating flow, watch the network tab for POST `/api/send-rating-email` and inspect JSON payload.
- Dialogs: the code uses native `dialog.showModal()` APIs which are not available in some test runners; use a browser for end-to-end testing.

## Small examples (copy/paste friendly)
- Example POST payload sent by `RatingDialog`:

```json
{ "ratings": { "q1": 5, "q2": 4, "q3": 5, "q4": 4, "q5": 5 }, "average": 4.6 }
```

- Required env vars for email flow:
  - `RESEND_API_KEY` — API key for Resend
  - `RECIPIENT` — address that receives the rating emails

## Safety/guardrails for AI edits
- Preserve `dir="rtl"` and Hebrew copy in `app/layout.tsx` and components unless explicitly asked to change language direction.
- Avoid removing `"use client"` from interactive components — that changes rendering/runtime behavior.
- Don't assume TypeScript/ESLint will block builds: `next.config.mjs` currently ignores build-time checks.

---
If anything above is unclear or you want the instructions to emphasize testing, CI, or deployment specifics (Vercel envs, pnpm vs npm), tell me which area to expand and I will iterate. 
