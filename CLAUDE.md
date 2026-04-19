# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server with Turbopack (localhost:3000)
npm run build    # Production build
npm run start    # Run production server (after build)
npm run lint     # ESLint check
```

No test framework is configured yet.

## Architecture

**Stack:** Next.js (App Router) + React 19 + TypeScript + Tailwind CSS v4 + Supabase + Framer Motion

**Data flow:** Server Components in `/app` call async functions from `/lib/data/` → those query Supabase (PostgreSQL) → data is passed as props to Client Components for interactivity.

**Key directories:**
- `/app` — Routes and page-level Server Components (App Router)
- `/components` — UI components split by domain (`/home`, `/breeds`, `/blog`, `/tools`, `/ui`, `/layout`)
- `/lib/data` — Data-fetching functions (`breeds.ts`, `articles.ts`, `pages.ts`)
- `/lib/types` — Shared TypeScript interfaces (`Page`, `Breed`, `Article`)
- `/lib/supabase.ts` — Supabase client initialization

**Supabase tables:** `breeds`, `articles`, `pages` (pages support `draft|published` status for CMS-style content at `/[slug]`).

**Note:** `lib/data/articles.ts` currently uses hardcoded mock data instead of querying Supabase.

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

## Path Alias

`@/*` maps to the project root (configured in `tsconfig.json`).

## Image Domains

Configured in `next.config.ts`: Unsplash, Google Drive, dog.ceo, Supabase storage.
