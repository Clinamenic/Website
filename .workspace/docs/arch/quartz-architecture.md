# Quartz Architecture (ssc-vault/website)

Site-specific technical reference for the customized Quartz fork that builds this site. Prefer this document over generic Quartz essays when changing structure, plugins, layouts, or content-type behavior.

**Last reviewed:** 2026-09-08  
**Upstream base:** Quartz 4.x (fork labeled `meridian-quartz` in `.quartz/package.json`; `package.json.original` records upstream `4.5.1`)  
**Live host:** `https://www.ssc.studio` (Tekhnema)

Related:

- Local rules: `.cursor/rules/quartz.mdc`, `.cursor/rules/website_publish.mdc`
- UUID permalinks: `.workspace/docs/features/uuid-permalink-system.md`
- Arweave notes: `.workspace/docs/ref/quartz/quartz-arweave-index.md`
- Architecture/build review (findings): `.workspace/docs/reports/2026-09-03-quartz-architecture-build-review.md`

---

## 1. Repository layout

Content lives at the website repo root (Obsidian-friendly). The framework is nested under `.quartz/` and is **tracked in git** (customized fork, not a disposable install).

```
website/                          # content root; build input (-d ..)
├── index.md, about.md, …
├── writing/, zettelgarten/, projects/, services/, …
├── bibliography.bib              # Citations plugin input (may be empty)
├── package.json                  # thin wrapper + SemVer; scripts delegate to .quartz
├── .meridian/                    # Meridian tooling/data (not Quartz ignorePatterns today)
│   └── data/archive.json         # Arweave archive metadata (intended for ArweaveIndex)
└── .quartz/                      # Quartz fork
    ├── quartz.config.ts          # site config + plugin wiring
    ├── quartz.layout.ts          # shared + per-type page layouts
    ├── package.json              # dependencies and quartz CLI scripts
    ├── quartz/                   # framework source
    │   ├── build.ts              # build orchestration
    │   ├── contentType.ts        # frontmatter type → UI/search profile
    │   ├── bootstrap-cli.mjs
    │   ├── components/           # Preact components (+ custom site chrome)
    │   ├── plugins/              # transformers, filters, emitters
    │   ├── processors/           # parse, filter, emit
    │   └── static/               # copied to public/static
    └── public/                   # build output (gitignored)
```

Root scripts:

| Script | Behavior |
|--------|----------|
| `npm run build` | `cd .quartz && npm run build` → `tsx ./quartz/bootstrap-cli.mjs build -d .. -o public` |
| `npm run serve` | Same with `--serve` |
| `npm run quartz` | Raw CLI via bootstrap |
| `npm run deploy:tekhnema` | Tekhnema `deploy-website.sh` (build + rsync; not on git push) |

Node: `>=22`. Dependencies install under `.quartz/node_modules`.

---

## 2. Build pipeline

Entry: `.quartz/quartz/bootstrap-cli.mjs` → esbuild-transpiles `quartz/build.ts` → runs the builder.

### 2.1 Phases

1. **Clean** — rimraf contents of `argv.output` (`public/`).
2. **Glob** — `**/*.*` under content root (`-d ..`), with:
   - `configuration.ignorePatterns` from `quartz.config.ts`
   - `gitignore: true` (root `.gitignore` also applies)
3. **Parse** — markdown → unified/mdast/hast via transformers (`processors/parse.ts`). Uses `workerpool` when file count warrants (chunk heuristic ~128).
4. **Filter** — `RemoveDrafts`, then `ExplicitPublish` (`publish: true` required).
5. **Emit** — each configured emitter writes outputs under `public/`.
6. **Serve (optional)** — HTTP + WebSocket reload; watches the content directory (skips `.quartz`, `public`, `node_modules`, `.git`).

### 2.2 Emit order (configured)

From `quartz.config.ts`:

1. `AliasRedirects` — aliases, permalink, **UUID** → HTML meta-refresh pages  
2. `ComponentResources` — bundled CSS/JS from all registered layout components  
3. `ContentPage` — one HTML page per published note (layout from content type)  
4. `FolderPage` / `TagPage` — list pages  
5. `ContentIndex` — `sitemap.xml`, `index.xml` (RSS), `static/searchIndex.json`, `static/contentIndex.json`  
6. `Assets` — non-markdown files from content tree  
7. `Static` — copy `quartz/static/` → `public/static/`  
8. `NotFoundPage` — 404

```
content root
    → glob + ignore
    → parse (transformers)
    → filters (draft / publish)
    → emitters
    → .quartz/public
    → deploy-website.sh → Tekhnema /srv/website
```

### 2.3 Plugin interfaces (actual)

Three plugin kinds, as used in this tree:

| Kind | Role | Key hooks |
|------|------|-----------|
| Transformer | Text/AST/metadata | `textTransform`, `markdownPlugins`, `htmlPlugins`, `externalResources` |
| Filter | Publish gate | `shouldPublish(ctx, content)` |
| Emitter | Write files / declare UI | `emit`, optional `getDependencyGraph`, `getQuartzComponents` |

There is no separate PluginManager / ErrorRecovery / Jest harness layer in this fork. Those belong to outdated narrative docs, not this codebase.

---

## 3. Configuration

**File:** `.quartz/quartz.config.ts`

### 3.1 Site configuration (current)

| Key | Value / notes |
|-----|----------------|
| `pageTitle` | `"Index"` (also used in RSS title / some OG fallbacks) |
| `baseUrl` | `www.ssc.studio` (must match live host) |
| `enableSPA` / `enablePopovers` | `true` |
| `analytics` | Umami → `https://stats.clinamenic.com` (hostname-specific website id) |
| `locale` | `en-US` |
| `ignorePatterns` | `private`, `templates`, `.obsidian` only (scaffolding dirs like `.workspace` are **not** listed; rely partly on gitignore + ExplicitPublish) |
| `theme` | IBM Plex Mono via Google Fonts; SSC light/dark palette |
| Citations | `bibliographyFile: "../bibliography.bib"` |
| Latex | KaTeX |

### 3.2 Transformers (order)

FrontMatter → CreatedModifiedDate → SyntaxHighlighting → ObsidianFlavoredMarkdown → GitHubFlavoredMarkdown → TableOfContents → CrawlLinks (`shortest`) → Description → Latex (katex) → Citations.

### 3.3 Filters

- `RemoveDrafts` — drops `draft: true`
- `ExplicitPublish` — requires `publish: true` (or truthy publish flag)

### 3.4 Path utilities

Branded path types and helpers live in `quartz/util/path.ts` (`FullSlug`, `SimpleSlug`, `FilePath`, `slugifyFilePath`, `resolveRelative`, etc.). Emitters and SPA navigation rely on these.

---

## 4. Content-type system

**File:** `.quartz/quartz/contentType.ts`  
**API:** `getContentTypeProfile(input)` → `ContentTypeProfile`

Legacy per-page `quartzShow*` / `quartzSearch` frontmatter was replaced by a single `type:` field. Profiles drive show/hide of chrome and whether a page is searchable.

### 4.1 Profile fields

`layout`, `searchable`, `showExplorer`, `showBacklinks`, `showTOC`, `showTitle`, `showSubtitle`, `showAuthor`, `showDate`, `showBanner`, `showGraph`, `showFlex`, `showCitation`, `showLicenseInfo`, `showSidenotes`, `showArchive`.

### 4.2 Registered types

| `frontmatter.type` | Layout key | Notable flags |
|--------------------|------------|---------------|
| `writing` | `writing` | Full chrome; sidenotes; archive on; searchable |
| `text` | `default` | Reference texts (`zettelgarten/ref/`); sidenotes on; **`searchable: false`** (still in sitemap + graph) |
| `homepage` | `homepage` | Side/meta chrome off; searchable |
| `site-page` | `site-page` | Marketing/inner pages; author/date/banner off; flex/citation off |
| `publication` | `site-page` (serviceLike) | Graph off; citation/license on |
| `service` | `site-page` (serviceLike) | Same as publication |

Unknown or missing `type` → **`defaultProfile`** (most chrome on, sidenotes/archive off, searchable).

Homepage is selected by **`type: homepage`** on `index.md`. There is **no** slug-based special case in `getContentTypeProfile` (comments that mention slug branching for `site-page` + `index` are outdated).

### 4.3 Types in content that are not registered

Published notes commonly use `zettel`, and sometimes `project`, `resource`, `pre-spec`, or omit `type`. Those fall through to `defaultProfile`. Register new types in `registeredProfiles` when behavior should differ from default.

### 4.4 Consumers

| Consumer | Use of profile |
|----------|----------------|
| `quartz.layout.ts` | `show*` callbacks on Banner, Explorer, Graph, etc. |
| `emitters/contentPage.tsx` | `resolveContentPageLayout(type, slug)` |
| `emitters/contentIndex.ts` | `searchable` gates **searchIndex only**; sitemap/RSS use all published pages |
| `transformers/toc.ts` | `showTOC` |
| `CitationGenerator`, `ArweaveIndex` | `showCitation` / `showArchive` |

---

## 5. Layout system

**File:** `.quartz/quartz.layout.ts`

### 5.1 Shared layout (`sharedPageComponents`)

- **head:** `Head` (SEO / OG / Twitter / JSON-LD from frontmatter)
- **header:** Darkmode, PermalinkButton, Search
- **afterBody:** Sidenotes, TagList, FlexContainer (LicenseInfo + CitationGenerator), ArweaveIndex, DownloadMarkdown, Graph, ImageModal
- **footer:** Footer (GitHub / Twitter links)

### 5.2 Content page templates

`contentPageLayoutTemplates`: `default` | `writing` | `site-page` | `homepage`.

Each template currently uses the **same** slot lists (`beforeBody` / `left` / `right`). Visible differences come from profile `show*` flags, not from different component trees. List pages use `defaultListPageLayout` (title + explorer/backlinks/TOC).

`ContentPage` resolves layout via `resolveContentPageLayout(frontmatter.type, slug)` and still collects components from **all** templates for `ComponentResources` bundling.

---

## 6. Custom emitters and indexes

### 6.1 UUID / alias redirects (`AliasRedirects`)

For each published file, emit redirect HTML for:

- `frontmatter.aliases` (resolved relative to the file’s directory)
- `frontmatter.permalink` (if string)
- `frontmatter.uuid` (trimmed, lowercased) as a root-level slug

Primary readable URLs remain path-based; UUID URLs are permanent redirects. See `features/uuid-permalink-system.md`.

### 6.2 Dual content indexes (`ContentIndex`)

| Output | Role |
|--------|------|
| `static/contentIndex.json` | Lean graph corpus: `title`, `links`, `tags`, `type?`, `date?` (no body text) for all published pages |
| `static/searchIndex.json` | Search corpus with full-text `content` for `profile.searchable` only (`type: text` / `zettelgarten/ref/` excluded) |
| `sitemap.xml` | All published pages with content (not gated on `searchable`) |
| `index.xml` | RSS from the same published set (limit default 10) |

Graph never needs body text. Search omits reference books so clients avoid multi-megabyte FlexSearch payloads.

### 6.3 Component resources

`ComponentResources` gathers `css` / `beforeDOMLoaded` / `afterDOMLoaded` from every component returned by emitters’ `getQuartzComponents`, minifies JS (esbuild), processes CSS (lightningcss), and emits hashed static assets. SPA router and popover scripts are injected when enabled in config. Analytics snippets (Umami here) are injected from config.

---

## 7. Component map

Rendering uses **Preact** (`preact-render-to-string` on the server). Components are functions with optional `.css`, `.beforeDOMLoaded`, `.afterDOMLoaded` strings.

### 7.1 Stock (upstream-style)

Content, TagContent, FolderContent, 404, ArticleTitle, Darkmode, Head (customized), PageTitle, ContentMeta, Spacer, TableOfContents, Explorer, TagList, Graph (Pixi client script), Backlinks, Search, Footer, DesktopOnly / MobileOnly, RecentNotes, Breadcrumbs, Comments, Body, Header, PageList, Date.

### 7.2 Site-specific

| Component | Role |
|-----------|------|
| AuthorName, PublishDate, ArticleSubtitle, Banner | Article chrome gated by profile |
| LicenseInfo, CitationGenerator, FlexContainer | License / cite strip |
| Sidenotes | Heading/block annotation UI (writing / text) |
| PermalinkButton | Copy UUID permalink |
| ArweaveIndex | Version history UI when `showArchive` + uuid + archive JSON |
| DownloadMarkdown | Markdown download control (wired in layout) |
| ImageModal | Lightbox behavior |
| FlexContainer2 | Present in exports; **not** used in `quartz.layout.ts` |

### 7.3 ArweaveIndex data path

Component code expects `../../data/archive.json` relative to `quartz/components/` → **`.quartz/data/archive.json`**. The maintained archive file is **`.meridian/data/archive.json`**. Until those paths are aligned (copy, symlink, or import change), archive UI no-ops at build/runtime.

---

## 8. Client runtime

- **SPA:** `enableSPA` loads micromorph-based navigation (`spa.inline`); `nav` events re-init page scripts.
- **Search:** FlexSearch over `searchIndex.json`.
- **Graph:** Pixi.js simulation over `contentIndex.json`; visibility gated by `showGraph`.
- **Popovers:** Floating UI when `enablePopovers` is true.
- **Theme:** Darkmode toggles `document.documentElement` class; persists in `localStorage`.

---

## 9. Frontmatter contract (practical)

Minimum for a public page:

```yaml
---
title: Example
publish: true
type: writing   # or site-page | text | homepage | service | publication | …
uuid: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx   # optional but recommended
---
```

Common SEO / Head fields (see `components/Head.tsx`): `headDescription`, `subtitle`, `keywords`, `bannerURI`, `headIcon`, `canonicalUrl`, `ogType`, `ogSiteName`, `twitterCard`, `twitterCreator`, `structuredData`.

Publishing gate is **ExplicitPublish**: without `publish: true`, the file is parsed (if globbed) but not emitted.

Legacy `quartzShow*` keys are obsolete; strip with `npm run strip-quartz-frontmatter` if any remain.

---

## 10. Deploy

1. Local: `npm run build` → `.quartz/public`
2. Production: `npm run deploy:tekhnema` or `tekhnema-remote/.workspace/scripts/deploy-website.sh`
3. Remote data root: `/srv/website` on Tekhnema
4. Git push does **not** publish

Ownership: content + Quartz config in this repo; nginx/Traefik/compose and deploy script in `tekhnema-remote`.

---

## 11. Extending the site

### Add or change a content type

1. Define a `ContentTypeProfile` in `contentType.ts`.
2. Register it under `registeredProfiles`.
3. If structural layout must differ, add/adjust a template in `quartz.layout.ts` (today templates are identical; prefer profile flags unless slots must change).
4. Rebuild and verify search/sitemap behavior for `searchable`.

### Add a component

1. Implement under `quartz/components/` (Preact).
2. Export from `components/index.ts`.
3. Wire into `quartz.layout.ts` (shared or template slots), gating with profile flags when appropriate.
4. Keep CSS/scripts on the component so `ComponentResources` can bundle them.

### Add a plugin

1. Follow existing transformer/filter/emitter patterns under `quartz/plugins/`.
2. Export from the appropriate `index.ts`.
3. Instantiate in `quartz.config.ts` in the correct phase order.
4. For emitters used with `--fastRebuild`, implement `getDependencyGraph` when partial rebuilds should stay correct.

---

## 12. Known gaps (do not treat as design)

Tracked in `.workspace/docs/reports/2026-09-03-quartz-architecture-build-review.md`. Highlights that affect architecture reading:

- `ignorePatterns` does not exclude `.workspace` / `.quartz` / `.meridian`; Meridian README claims are not implemented in this checkout.
- Layout template keys are duplicated; homepage chrome is mostly flag-driven.
- Arweave archive path vs `.meridian/data/archive.json` mismatch (`.meridian/` may be absent).
- Root `.gitignore` ignores all `package-lock.json` (including `.quartz` lockfile).
- Empty `.quartz/plugins/` directory and leftover `*.original` config snapshots are not part of the runtime design.

---

## 13. What this document is not

- Not a copy of upstream Quartz docs (see [quartz.jzhao.xyz](https://quartz.jzhao.xyz/)).
- Not a description of fictional managers, Jest suites, or CSP middleware that do not exist in `.quartz/`.
- Not the deploy runbook (use `website_publish.mdc` and Tekhnema scripts).

When behavior and this file disagree, **trust the code** under `.quartz/` and update this reference in the same change set.
