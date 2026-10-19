# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Robert Hut is a personal bilingual (English / Traditional Chinese) blog + portfolio + tools site. It is a Vite + React 18 + TypeScript SPA styled with Tailwind, backed by Supabase (Postgres, Auth, Storage, Edge Functions), and deployed to Vercel (`vercel.json` rewrites every path to `index.html`). It was originally scaffolded with Bolt (`.bolt/`); the Bolt prompt asks for polished, non-cookie-cutter designs using only Tailwind + `lucide-react` icons — don't add UI/icon libraries unless necessary.

## Commands

```bash
npm run dev        # Vite dev server
npm run build      # production build to dist/
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit -p tsconfig.app.json
npm run preview    # serve the built dist/
```

There is no test suite. Verify changes with `npm run typecheck`, `npm run lint`, and `npm run build`.

Required env (in `.env`, gitignored): `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. `src/lib/supabase.ts` throws at import time if either is missing.

## Architecture

### Routing and i18n (`src/App.tsx`, `src/i18n/config.ts`)
- Every route is declared twice: unprefixed under `/` (English) and under `/zh-tw` (Chinese). When adding a page, add it to **both** route trees.
- Locale comes from the URL first (`/zh-tw` prefix → `zh-TW`, otherwise `en`), then from the `preferredLocale` localStorage key, then from `navigator.language`. Auto-detection deliberately does not write to localStorage (`caches: []`); only `setPreferredLocale` (manual switch in `LanguageSwitcher`) persists a choice.
- `/` is redirected once by `RootRedirect` to `/blog` or `/zh-tw/blog` based on preferred locale. `LocaleSync` keeps i18next in sync with the path.
- Build internal links with `useLocalePath()` (or `addLocalePrefix`) so the current locale prefix is preserved.
- UI strings live in `src/i18n/locales/en.json` and `zh-TW.json`; keep both in sync. Some pages still inline `i18n.language === 'zh-TW' ? ... : ...` strings.

### Bilingual content model
The DB stores Chinese as the primary content with optional English columns: posts use `title/content/excerpt/tags` + `eng_title/eng_content/eng_excerpt/eng_tags`; bio uses `bio_title/bio_content` + `bio_title_en/bio_content_en`; useful links use `name_zh/name_en`. Pages show the English field when `i18n.language === 'en'` and it exists, else fall back to Chinese. Types are in `src/lib/supabase.ts`.

### Posts
- Post URLs are `/post/:slug`. New slugs are random 8-char `[a-z0-9]` codes, generated once when the editor opens a new post (`PostEditorPage`) or by `create-post-hut` when n8n sends no slug. Existing slugs are never regenerated — older posts have long title-based slugs and their links must keep working.
- Markdown is rendered with `react-markdown` + `remark-gfm` + `rehype-highlight`; raw HTML is intentionally not enabled. The post page and the editor preview share `components.p = MarkdownParagraph`, which turns a paragraph containing only a YouTube link into an embedded `youtube-nocookie.com` player (URL parsing in `src/lib/youtube.ts`).

### Pagination
The blog list and portfolio show 6 items per page using server-side `.range()` with `count: 'exact'`. The page number lives in the `?page=` query param via `usePageParam` (`src/hooks/usePageParam.ts`), rendered by `src/components/Pagination.tsx`; out-of-range pages redirect to the last page.

### Portfolio ordering
Projects are displayed by `order_num` **descending** (newest first). New projects get `max(order_num) + 1`; the drag-reorder list in `ProjectModal` uses the same descending order and writes `order_num = length - index`.

### Supabase data
- Tables: `roberthut_posts`, `roberthut_site_settings` (single row; holds bio, avatar, and `admin_emails` JSONB), `roberthut_projects`, `useful_links`. Storage bucket: `roberthut-blog-images`.
- Schema changes go in `supabase/migrations/` as timestamped SQL files.
- **Admin authorization is email-based**: RLS policies check `roberthut_site_settings.admin_emails ? (auth.jwt()->>'email')`. Client-side, `useAuth` reads the same `admin_emails` to compute `isAdmin`, and `ProtectedRoute` gates all `/admin*` routes. Anonymous users can only read published posts and public tables.
- `export_portfolio_to_supabase.sql`, `export_data_only.sql`, `verify_migration.sql`, and `MIGRATION_GUIDE.md` (Chinese) document migrating the whole project to a new Supabase instance.

### Edge Functions (`supabase/functions/`, Deno)
- `exchange-rates` and `fetch-og-image` are called directly from the frontend via `${VITE_SUPABASE_URL}/functions/v1/...` (Currency converter tool; portfolio thumbnails).
- `create-post-hut`, `grab-post-hut`, `update-post-hut-english` are an n8n automation API (create posts, fetch posts, write back English translations). They authenticate with an `x-n8n-api-key` header compared against the `N8N_API_KEY_ROBERT_HUT` secret and use the service role key.
- Edge Functions are not deployed by Vercel; after changing one, deploy it with `supabase functions deploy <name>`.

### Pages
Public: blog (`HomePage`), `PostDetailPage` (markdown via `react-markdown` + `remark-gfm` + `rehype-highlight`), `AboutPage`, `PortfolioPage`, `ToolsPage`. Admin: `AdminPage`, `PostEditorPage`, `BioEditorPage`, `ImageLibraryPage`. `ToolsPage` is a tab switcher over self-contained components in `src/components/tools/`; add a new tool by creating a component there and registering it in the `tools` array in `ToolsPage`.
