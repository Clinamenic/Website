---
title: Quartz Architecture and Build Process Review
date: 2026-09-03
type: report
status: findings
scope: ssc-vault/website (.quartz fork, build pipeline, content contracts)
audience: maintainers
---

# Quartz Architecture and Build Process Review

**Date:** 2026-09-03  
**Scope:** `ssc-vault/website` Quartz fork under `.quartz/`, root content layout, local build (`npm run build` → `.quartz/public`), and deploy handoff to Tekhnema.  
**Method:** Static inspection of config, plugins, components, indexes, docs, and git hygiene. No Quartz source edits were made for this report.

## Executive summary

The site is a customized Quartz 4.x fork (branded Meridian-Quartz) with a strong content-type profile system, UUID permalinks, and Tekhnema publish path. The live architecture works, but several layers have drifted: Meridian README claims, the long architecture reference doc, ignore patterns, content-type registration, search/sitemap gating, and Arweave archive wiring. The highest-impact fixes are ignore-pattern tightening, decoupling sitemap from `searchable`, registering or profiling the dominant `zettel` type, and replacing or retiring the broken Arweave index data path. The highest-impact streamlining is shrinking the ~6.5 MB dual full-text indexes and pruning dead components/deps/docs.

| Severity | Count (approx.) | Themes |
|----------|-----------------|--------|
| P0 / fix now | 3 | Sitemap omits homepage; Arweave archive path missing; ignorePatterns underspecified |
| P1 / should fix | 6 | Unregistered content types; identical layout templates; index bloat; lockfile ignored; stale architecture doc; Meridian claims false |
| P2 / streamline | 8+ | Dead components/deps; empty stubs; hardcoded deploy path; empty bibliography; dual package surface |

---

## 1. Current architecture (as implemented)

### 1.1 Repository shape

```
website/                          # content root (Obsidian-friendly)
├── *.md, writing/, zettelgarten/, …
├── package.json                  # thin wrapper (SemVer 3.0.0)
├── .quartz/                      # Quartz fork (tracked; ~193 git paths)
│   ├── quartz.config.ts
│   ├── quartz.layout.ts
│   ├── package.json              # meridian-quartz deps + scripts
│   ├── quartz/                   # framework source
│   └── public/                   # build output (gitignored; ~37 MB)
└── .meridian/data/archive.json   # Arweave archive metadata (not wired into build)
```

**Build entry:** root `npm run build` → `cd .quartz && npm run build` →  
`tsx ./quartz/bootstrap-cli.mjs build -d .. -o public`

**Publish:** `npm run deploy:tekhnema` → Tekhnema `deploy-website.sh` (hardcoded Mac path in root `package.json`).

### 1.2 Pipeline (actual)

1. **Bootstrap** (`bootstrap-cli.mjs`): esbuild-transpile `build.ts`, CLI via yargs.  
2. **Clean** output `public/*`.  
3. **Glob** `**/*.*` from content root (`-d ..`) with `ignorePatterns` + `gitignore: true`.  
4. **Parse** markdown (workerpool when file count warrants; chunk size 128).  
5. **Filter** `RemoveDrafts` then `ExplicitPublish` (`publish: true` required).  
6. **Emit** AliasRedirects → ComponentResources → ContentPage → FolderPage → TagPage → ContentIndex → Assets → Static → NotFoundPage.

This matches stock Quartz more closely than the prior narrative that lived in `quartz-architecture.md` (see §5; that doc now lives under `arch/` and is site-specific).

### 1.3 Customization surface (what makes this fork local)

| Area | Location | Role |
|------|----------|------|
| Content-type profiles | `quartz/contentType.ts` | Maps `frontmatter.type` → show*/searchable flags |
| Layout resolution | `quartz.layout.ts` + `emitters/contentPage.tsx` | Per-type layout selection |
| UUID redirects | `emitters/aliases.ts` | UUID (+ permalink/aliases) → HTML meta-refresh |
| Search vs graph indexes | `emitters/contentIndex.ts` | `searchIndex.json` vs `contentIndex.json` |
| SEO Head | `components/Head.tsx` | Rich OG/Twitter/JSON-LD from frontmatter |
| Site chrome | Banner, AuthorName, PublishDate, CitationGenerator, Sidenotes, PermalinkButton, ArweaveIndex, DownloadMarkdown, FlexContainer | Custom components |
| Theme / analytics | `quartz.config.ts` | SSC palette, Umami, `baseUrl: www.ssc.studio` |

### 1.4 Content inventory (approx., excluding scaffolding)

| Metric | Value |
|--------|-------|
| Markdown under content tree | ~375 |
| `publish: true` | ~231 |
| Built HTML pages (indexes) | 231 in `contentIndex`; 230 in `searchIndex` |
| Dominant published types | `zettel` (113), `writing` (40), `text` (39), … |

---

## 2. Findings — fix

### P0.1 Homepage missing from sitemap (and RSS)

**Where:** `contentIndex.ts` gates sitemap/RSS emission on `profile.searchable`.  
**Evidence:** `index` is the only slug in `contentIndex` but not `searchIndex`; `sitemap.xml` has 230 URLs and does **not** include `https://www.ssc.studio` / index.  
**Cause:** `type: homepage` sets `searchable: false` (reasonable for search UX) but that flag is reused for sitemap/RSS.  
**Fix:** Split concerns — e.g. `searchable` vs `includeInSitemap` / always include non-draft published pages in sitemap; optionally keep homepage out of FlexSearch only.

### P0.2 ArweaveIndex data path is broken

**Where:** `components/ArweaveIndex.tsx` does `require("../../data/archive.json")`, resolving to `.quartz/data/archive.json`.  
**Evidence:** That path does not exist. Canonical data is at `.meridian/data/archive.json` (and a copy under `.meridian/exports/`).  
**Effect:** Archive UI silently no-ops (`catch` → warn → `null`) for all writing pages where `showArchive: true`.  
**Fix:** Point at Meridian data (copy/symlink into the Quartz tree at build time, or change require/import path and ensure the file is available to the bundler). Update `.workspace/docs/ref/quartz/quartz-arweave-index.md` to match.

### P0.3 `ignorePatterns` too narrow for a content-at-root layout

**Config today:**

```ts
ignorePatterns: ["private", "templates", ".obsidian"]
```

**Gaps:** Does not list `.workspace`, `.quartz`, `.meridian`, `.cursor`, `node_modules` (partially covered by `gitignore: true`), archive history trees, etc.  
**Evidence:** Approx. **416** markdown paths are glob candidates; ~39 live under `.workspace` (plans, archive history). `ExplicitPublish` prevents publishing them (none had `publish: true` in spot-check), but they still inflate parse work and risk accidental publish.  
**Meridian README claims** automatic `.meridian/` ignore and Meridian plugins — **neither is present** (`plugins/` dir empty; no Meridian ignore entries).  
**Fix:** Expand ignorePatterns to scaffolding dirs; align README with reality or restore Meridian integration intentionally.

### P1.1 Most published content types are unregistered

**Registered profiles:** `writing`, `text`, `homepage`, `site-page`, `publication`, `service`.  
**Published but unregistered (fall through to `defaultProfile`):** `zettel` (**113**), missing type (15), `resource` (2), `project` (1), `pre-spec` (1).  
**Effect:** Zettels get the “everything on” default (graph, citations, flex/license, etc.) whether or not that matches intent. Docs in `contentType.ts` still describe obsolete slug-based homepage branching that is **not implemented** (homepage works only because `index.md` uses `type: homepage`).  
**Fix:** Register `zettel` (and optionally `project` / `resource`) with explicit profiles; delete or implement slug-branching comments; consider failing CI on unknown `type` values for `publish: true` pages.

### P1.2 Layout templates are duplicates

In `quartz.layout.ts`, `default`, `writing`, `site-page`, and `homepage` templates are **identical** component lists. Differentiation is almost entirely via per-component `show*` callbacks from profiles — not structure.  
**Effect:** `ContentPage.getQuartzComponents()` walks all templates, increasing complexity without layout variety; homepage still mounts explorer/backlinks/TOC slots that return null.  
**Fix:** Either collapse to one template + profile flags, or make homepage/site-page layouts structurally different (omit slots entirely).

### P1.3 Dual full-text indexes are large and redundant

| File | Size | Keys |
|------|------|------|
| `static/contentIndex.json` | ~6.5 MB | 231 |
| `static/searchIndex.json` | ~6.5 MB | 230 |

Average `content` field length ≈ **27 KB** per page. Difference is essentially only the homepage. Clients download multi-megabyte JSON for search and graph.  
**Fix:** Truncate or omit body text in graph index; keep a lean search corpus; consider compression / splitting; exclude or shorten very long `text` reference pages.

### P1.4 Reproducible installs undermined

Root `.gitignore` ignores **all** `package-lock.json`, including `.quartz/package-lock.json`. Lockfile exists on disk (~334 KB) but is not a reliable git artifact.  
**Fix:** Track `.quartz/package-lock.json` (narrow the ignore rule); keep root lockfile ignored if root has no deps.

### P1.5 Architecture reference doc is not authoritative — addressed 2026-09-03

`.workspace/docs/arch/quartz-architecture.md` (moved from `ref/quartz/`) was previously a long, generic/aspirational Quartz treatise (fictional PluginManager, NavigationManager, Jest harness, ErrorRecovery, etc.).  
**Status:** Replaced with a site-specific architecture reference (pipeline, plugins, content-type table, layouts, emitters, deploy, known gaps) and relocated under `arch/`. `quartz.mdc` / `AGENTS.md` point at the new path.

### P1.6 v3 restructure docs contradict git reality

`arch/v3-restructuring.md` says `.quartz/` is gitignored local tooling. In practice **~193 paths under `.quartz/` are tracked** (correct for a customized fork). Treat v3 doc as historical; update context docs so assistants do not “re-gitignore” the framework.

---

## 3. Findings — streamline

### Dead or misleading code

| Item | Notes |
|------|--------|
| `DownloadMarkdown` | Comment in `components/index.ts` says unused, but **wired in** `quartz.layout.ts` `afterBody` — fix the comment or remove the component |
| `FlexContainer2` | Exported, never used in layout |
| `.quartz/plugins/` | Empty directory; README promises `plugins/meridian/` |
| `package.json.original`, `quartz.config.ts.original` | Upstream snapshots cluttering the fork |
| `bibliography.bib` | **0-byte** file still referenced by Citations plugin |

### Dependency weight vs use

Runtime rendering is **Preact**. `package.json` still lists `react`, `react-dom`, `satori`, `arweave` (npm). Graph uses **pixi.js** (and historically d3). KaTeX is selected; MathJax remains a transitive/option dep via the Latex transformer.  
**Streamline:** Audit and drop unused packages; prefer one math engine; confirm whether `arweave` npm is needed given Meridian/arkb workflows.

### ComponentResources / global JS

All components from all layout templates contribute CSS/JS to the global bundle. With identical templates this is mostly harmless, but unused components (`FlexContainer2`, Comments if unused, etc.) still risk inclusion if referenced from `getQuartzComponents`. Keep the component graph minimal.

### Build / DX

| Item | Suggestion |
|------|------------|
| Root `deploy:tekhnema` absolute path | Use env/`WEBSITE_ROOT`-relative invocation or document `tekhnema-remote` as the only entry |
| `npm run check` in `.quartz` | Exists (`tsc --noEmit` + quartz update check) but not exposed from root scripts |
| Google Fonts CDN | `fontOrigin: "googleFonts"` + `cdnCaching: true` — fine for garden; self-host if privacy/perf hardening wanted |
| `pageTitle: "Index"` | Feeds RSS channel title and some OG fallbacks — prefer “Clinamenic” / site brand |
| Serve watcher | Ignores `.quartz` and `public` under content root — good; still watches scaffolding md unless ignorePatterns expanded |

### Content frontmatter debt

- `zettelgarten.md` still documents legacy `quartzShow*` keys (one leftover mention site-wide after strip script).  
- `strip-quartz-frontmatter` script is good; ensure docs match type-based profiles.  
- SEO fields in Head are solid; keep `headDescription` / `keywords` coverage for marketing pages.

---

## 4. Build process map (quick reference)

```
Content root (website/)
        │
        ▼
  glob **/*.*  + ignorePatterns + gitignore
        │
        ▼
  parseMarkdown (workers)
        │
        ▼
  RemoveDrafts → ExplicitPublish
        │
        ├── AliasRedirects     → /{uuid}.html redirects
        ├── ComponentResources → hashed CSS/JS
        ├── ContentPage        → per-slug HTML (layout by type)
        ├── FolderPage / TagPage
        ├── ContentIndex       → sitemap, RSS, searchIndex, contentIndex
        ├── Assets / Static
        └── NotFoundPage
        │
        ▼
  .quartz/public  ──deploy-website.sh──►  Tekhnema /srv/website
```

**Local commands**

| Command | Result |
|---------|--------|
| `npm run build` | Full static emit |
| `npm run serve` | Build + HTTP/WebSocket preview |
| `npm run quartz` | Raw CLI |
| `npm run deploy:tekhnema` | Build + rsync (not on git push) |

---

## 5. Documentation health

| Doc | Status |
|-----|--------|
| `AGENTS.md`, `website_publish.mdc`, `quartz.mdc` | Current for Tekhnema / local build |
| `features/uuid-permalink-system.md` | Matches aliases emitter behavior |
| `arch/quartz-architecture.md` | **Updated + moved 2026-09-03** — site-specific SoT under `arch/` |
| `ref/quartz/quartz-arweave-index.md` | Paths and tooling partially obsolete |
| `arch/v3-restructuring.md` | Historical; `.quartz` gitignore claim wrong |
| `.quartz/README.md` | Meridian marketing claims not true for this checkout |
| `docs/temp/*` | Old migration plans; archive or mark superseded |

---

## 6. Recommended workstreams (ordered)

### Wave A — correctness (small diffs)

1. Stop using `searchable` for sitemap/RSS; ensure homepage (and all published pages) appear in sitemap.  
2. Wire `archive.json` into ArweaveIndex or remove the component from layout until wired.  
3. Expand `ignorePatterns` (at least `.workspace`, `.quartz`, `.meridian`, `.cursor`, `**/node_modules`).  
4. Register `zettel` (and other live types) in `contentType.ts`.

### Wave B — maintainability

5. ~~Replace `quartz-architecture.md` with a concise site-specific architecture page~~ (**done** 2026-09-03).  
6. Collapse duplicate layout templates or make homepage structurally bare.  
7. Track `.quartz/package-lock.json`; delete `*.original` and empty `plugins/`.  
8. Fix DownloadMarkdown “unused” comment; drop FlexContainer2 if unused.

### Wave C — performance / size

9. Slim `contentIndex` / `searchIndex` payloads (truncate body, optional fields).  
10. Dependency prune (react/satori/arweave/mathjax if unused).  
11. Optional: expose `npm run check` at repo root; add a smoke assert that sitemap contains `/` and index UUID redirect exists.

### Wave D — product clarity

12. Align Meridian README with actual fork role (or restore Meridian plugins deliberately).  
13. Decide Arweave upload workflow SoT (Meridian vs scripts vs none).  
14. Brand `pageTitle` / RSS title.

---

## 7. Out of scope / not examined

- Live Tekhnema nginx/Traefik config beyond deploy script contract  
- Runtime browser performance profiling of Pixi graph  
- Full visual/CSS audit  
- Upstream Quartz merge/rebase feasibility (fork appears based near 4.5.1 per `package.json.original`)

---

## 8. Appendix — content-type registration gap

Published `type` values vs profiles (approx.):

| `type` | Published count | Profile |
|--------|-----------------|---------|
| zettel | 113 | **default (unregistered)** |
| writing | 40 | writing |
| text | 39 | text (reference) |
| (missing) | 15 | default |
| service | 10 | serviceLike |
| site-page | 8 | site-page |
| resource | 2 | **default** |
| homepage | 1 | homepage |
| project | 1 | **default** |
| publication | 1 | serviceLike |
| pre-spec | 1 | **default** |

---

*Report only. No changes were made under `.quartz/` or content markdown for this examination.*

---

## Addendum — 2026-09-08 (index slim)

Addressed in fork:

- Sitemap/RSS no longer gated on `profile.searchable` (P0.1 / Wave A.1).
- `type: text` (`zettelgarten/ref/`) sets `searchable: false`; pages remain in sitemap + lean graph index.
- `contentIndex.json` emits metadata only (no body); full text lives only in `searchIndex.json` for searchable types (Wave C.9).
