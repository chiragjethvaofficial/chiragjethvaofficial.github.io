# Content guide

All site content lives in `content/` as Markdown with YAML frontmatter. Frontmatter is validated by the zod schemas in
[`src/content/schema.js`](../src/content/schema.js) during `npm run check` and at build time, so an invalid file fails
CI before it can be deployed.

## Projects: `content/projects/<slug>.md`

The file name is the slug and the URL (`/projects/<slug>`). Don't rename a published file, because that breaks existing links.

| Field | Required | Rules |
| --- | --- | --- |
| `title` | yes | Public app name, as on Google Play |
| `type` | yes | `Messaging` · `Dialer & Contacts` · `Gallery & Media` · `Productivity` · `Lifestyle` · `Social` |
| `status` | yes | `live` (on Google Play) · `completed` (finished, unpublished) · `in-progress` |
| `featured` | no | `true` shows the app on the home page. Keep exactly 4 featured. |
| `order` | no | Sort position within its status group (in progress → live → completed) |
| `icon` | yes | `/images/apps/<slug>.webp` (run `npm run icons` to convert a PNG) |
| `playPackage` | live apps | The `applicationId`. The Google Play URL is derived from it. |
| `developer` / `developerUrl` | no | The publishing Google Play account; written by `npm run play-meta -- <slug>` |
| `summary` | yes | One sentence, ≤ 110 characters (cards, SEO, share images) |
| `features` | yes | 3–10 user-facing bullets |
| `highlights` | yes | 2–8 technical bullets |
| `tags` | yes | 3–12 technologies. Reuse existing spellings (`Jetpack Compose`, not `Compose`). |
| `basedOn` | no | Open-source project the app derives from |
| `variants` | no | One sentence when several builds are grouped into one entry |
| `screenshots` | no | `[{ src, alt, width, height }]`; written by `npm run screenshots -- <slug>` |

The body is the case study (`## Overview`, `## How it works`, `## Architecture`, …).

**Adding an app:**

1. Save the icon as `public/images/apps/<slug>.png`, then run `npm run icons`.
2. Create `content/projects/<slug>.md`, using an existing file such as `phone-dialer-contacts-calls.md` as a template.
3. For live apps, run `npm run screenshots -- <slug>` and `npm run play-meta -- <slug>`.
4. Run `npm run check`.

**Removing an app:** delete `content/projects/<slug>.md`, `public/images/apps/<slug>.webp` and
`public/images/apps/<slug>/`. If it was featured, feature another app so that exactly 4 remain featured.

## Articles: `content/blog/<slug>.md`

| Field | Required | Rules |
| --- | --- | --- |
| `title` | yes | 5–100 characters |
| `description` | yes | 30–170 characters (meta description, cards, RSS) |
| `date` / `updated` | yes / no | `YYYY-MM-DD` |
| `tags` | yes | 1–8 |
| `relatedProjects` | no | Existing project slugs (checked) |
| `draft` | no | `true` means visible only in `npm run dev` / `build:drafts`; drafts are stripped from production bundles |

Reading time is computed automatically. Use `##` headings for sections (they build the table of contents and search
results), and link to apps as `/projects/<slug>`. The base path is added automatically.

Articles can embed Vue components from `src/components/blog/` via a `<script setup>` block, as in
`find-chirag-jethva-android-developer.md`.

## Code snippets: `content/snippets/<slug>.md`

Each file is one tab of the home page's "Modern Android, in code" showcase.

| Field | Required | Rules |
| --- | --- | --- |
| `title` | yes | Tab label, ≤ 30 characters |
| `file` | yes | File name shown in the editor bar |
| `caption` | yes | 10–140 characters |
| `order` | no | Tab order |
| `relatedProjects` | no | Up to 4 existing project slugs that really use this code (the "used in" chips) |
| `preview` | no | Interactive mock from `src/components/showcase/` (`compose-filter`) |
| `notes` | no | Up to 6 `{ line, text }` items explaining specific lines (1-based) |

The body must be **exactly one** fenced `kotlin` block of at most 30 lines. Snippets are simplified samples written for the
site, never copied production source.

## Rules

- Describe only what the app really does. Never invent downloads, ratings, users or results.
- Never publish secrets (ad unit IDs, API keys, keystore details). `npm run check` scans for common ones.
- Files in `public/` are referenced root-relative (`/images/...`). The site's base path is applied automatically.
