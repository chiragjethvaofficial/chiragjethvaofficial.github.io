// `npm run check` (also runs in CI before every build).
// Validates all Markdown content against the zod schemas, then checks file names,
// image files, cross-references and code snippets, and scans for secrets.
// Field rules: docs/CONTENT.md.
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { loadPosts, loadProjects, loadSnippets, ROOT_DIR } from './content-fs.mjs'

const errors = []
const warn = []
const at = (p) => join(ROOT_DIR, p)
const KEBAB = /^[a-z0-9]+(-[a-z0-9]+)*$/

const { items: projects, errors: projectErrors } = loadProjects()
const { items: posts, errors: postErrors } = loadPosts({ includeDrafts: true })
const { items: snippets, errors: snippetErrors } = loadSnippets()
errors.push(...projectErrors, ...postErrors, ...snippetErrors)

const bySlug = new Map(projects.map((p) => [p.slug, p]))

// ── Projects ───────────────────────────────────────────────
for (const p of projects) {
  if (!KEBAB.test(p.slug)) errors.push(`projects/${p.slug}: file name must be kebab-case`)
  if (p.icon && !existsSync(at(`public${p.icon}`))) errors.push(`projects/${p.slug}: icon not found: public${p.icon}`)
  if (!p.icon) warn.push(`projects/${p.slug}: no icon (a gradient letter tile is shown)`)
  for (const s of p.screenshots ?? []) if (!existsSync(at(`public${s.src}`))) errors.push(`projects/${p.slug}: screenshot not found: public${s.src}`)
  if (p.status === 'live' && !p.screenshots?.length) warn.push(`projects/${p.slug}: live app without screenshots (run npm run screenshots -- ${p.slug})`)
  if (p.status === 'live' && !p.developer) warn.push(`projects/${p.slug}: live app without developer (run npm run play-meta -- ${p.slug})`)
  if (p.body.trim().length < 80) warn.push(`projects/${p.slug}: case study body is very short`)
}
const featured = projects.filter((p) => p.featured).length
if (featured !== 4) warn.push(`${featured} featured projects (the home page layout expects 4)`)

// ── Blog posts ─────────────────────────────────────────────
for (const p of posts) {
  if (!KEBAB.test(p.slug)) errors.push(`blog/${p.slug}: file name must be kebab-case`)
  for (const r of p.relatedProjects) if (!bySlug.has(r)) errors.push(`blog/${p.slug}: relatedProjects "${r}" does not exist`)
  if (p.draft) warn.push(`blog/${p.slug}: draft (not published)`)
}

// ── Code snippets: one Kotlin block each, notes point at real lines ──
for (const s of snippets) {
  if (!KEBAB.test(s.slug)) errors.push(`snippets/${s.slug}: file name must be kebab-case`)
  for (const r of s.relatedProjects) if (!bySlug.has(r)) errors.push(`snippets/${s.slug}: relatedProjects "${r}" does not exist`)
  const blocks = [...s.body.replace(/\r\n/g, '\n').matchAll(/```kotlin\n([\s\S]*?)\n```/g)]
  if (blocks.length !== 1) {
    errors.push(`snippets/${s.slug}: body must be exactly one kotlin code block`)
    continue
  }
  const lines = blocks[0][1].split('\n').length
  if (lines > 30) warn.push(`snippets/${s.slug}: ${lines} lines; keep snippets short (≤ 30)`)
  for (const n of s.notes) if (n.line > lines) errors.push(`snippets/${s.slug}: note on line ${n.line} but the code has ${lines} lines`)
}

// ── No secrets in content ──────────────────────────────────
const SECRETS = [
  [/ca-app-pub-\d+/, 'AdMob ad unit ID'],
  [/AIza[0-9A-Za-z_-]{20,}/, 'Google API key'],
  [/storePassword|keyPassword|storeFile\s*=/, 'keystore detail'],
]
for (const [kind, list] of [['projects', projects], ['blog', posts], ['snippets', snippets]]) {
  for (const item of list) {
    const raw = readFileSync(item.file, 'utf8')
    for (const [re, what] of SECRETS) if (re.test(raw)) errors.push(`content/${kind}/${item.slug}.md contains a ${what}; remove it`)
  }
}

// ── Report ─────────────────────────────────────────────────
for (const w of warn) console.warn(`⚠ ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`✗ ${e}`)
  console.error(`\n${errors.length} problem(s). Field rules: docs/CONTENT.md`)
  process.exit(1)
}
const count = (s) => projects.filter((p) => p.status === s).length
const published = posts.filter((p) => !p.draft).length
console.log(
  `✓ ${projects.length} projects (${count('live')} live · ${count('in-progress')} in progress · ${count('completed')} completed) · ` +
    `${published} published post(s), ${posts.length - published} draft(s) · ${snippets.length} code snippets`,
)
