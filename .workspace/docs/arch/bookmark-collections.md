# Bookmark Collections (Quartz)

**Last reviewed:** 2026-09-16  
**Report:** `ssc-brainmesh/.workspace/docs/reports/bookmark-collections-2026-09-16.md`

Collection pages are published site notes with `type: collection`. At build time Quartz reads the external bookmark corpus (`ssc-vault/bookmarks/`), applies frontmatter filters, and renders a grid or list layout.

## Data flow

1. Collection definition markdown lives under `website/collections/`.
2. Bookmarks stay in `../bookmarks/` (sibling to the Quartz content root).
3. The Obsidian **Bookmark Collections** plugin writes `bookmarks/.workspace/cache/bookmark-index.json` and touches `website/collections/.corpus-stamp`.
4. `loadBookmarkCorpus` prefers the index JSON; if missing or invalid, it falls back to a frontmatter glob scan.
5. `ContentPage` preloads the corpus when any collection page is published and wires stamp/index/bookmark paths into the dependency graph so `--fastRebuild` / serve refresh collection HTML when the stamp changes.
6. `CollectionContent` filters, sorts, and renders cards linking to each bookmark's `source` URL.

Private bookmarks (`private: true`) are excluded from the index and from scan fallback; they never appear on collection pages.

Bookmark files with invalid YAML frontmatter are skipped with a build warning so one malformed note does not fail the entire site build.

## Bookmark index

Path (vault-relative): `bookmarks/.workspace/cache/bookmark-index.json`  
Quartz config (content-root-relative): `../bookmarks/.workspace/cache/bookmark-index.json`

Schema version `2`:

```json
{
  "version": 2,
  "generatedAt": "ISO-8601",
  "sourceFolder": "bookmarks",
  "records": [
    {
      "path": "bookmarks/bookmark_Example.md",
      "title": "...",
      "source": "https://...",
      "tags": ["design"],
      "description": "...",
      "llmDescription": "...",
      "llmDescriptionAuthor": "gemma4:e4b",
      "imageUri": "...",
      "indexed": "ISO-8601 or null",
      "needsEnrichment": false,
      "mtimeMs": 0
    }
  ]
}
```

Rules:

- Written **only** by the Obsidian plugin (command **Rebuild bookmark index**, or debounced save of `bookmark_*.md`).
- Omits `private: true` bookmarks.
- Cache directory is gitignored; regenerate in Obsidian before builds when you care about cold-build speed.
- Deploy / CI machines without Obsidian may commit a fresh index or accept the frontmatter scan fallback (cold build still succeeds).

Corpus stamp: `website/collections/.corpus-stamp` (gitignored). Touched whenever the plugin rewrites the index. Lives under the Quartz content root so chokidar sees it without watching `../bookmarks`.

## Collection page frontmatter

```yaml
---
type: collection
publish: true
title: Page Title
headDescription: SEO description for the collection page.
ogType: CollectionPage
bookmarkCollection:
  filters:
    tags:
      - local-first
    tagsMatch: any          # optional: any (default) | all
    needs-enrichment: false # optional quality gate
    titleContains: ""       # optional substring match on title
    domain: ""              # optional hostname substring match on source URL
  layout:
    variant: grid           # grid | list
    columns: 3              # 2-4, grid only
    cardStyle: image-forward # image-forward | compact | text-only
    descriptionSource: llm  # llm | clipper | both
  sort: indexed-desc        # indexed-desc | indexed-asc | title-asc | title-desc
---

Optional intro markdown rendered above the listing.
```

Use `bookmarkCollection:` -- not portfolio asset field `collections:`.

## Site configuration

In `website/.quartz/quartz.config.ts`:

```ts
bookmarkCorpus: {
  path: "../bookmarks",
  glob: "bookmark_*.md",
  indexPath: "../bookmarks/.workspace/cache/bookmark-index.json",
  stampPath: "collections/.corpus-stamp",
}
```

Paths are relative to the Quartz content root (`website/`). Quartz does **not** expand the content watcher to the full bookmarks tree; incremental collection refresh relies on the stamp + dependency graph.

## Implementation files

| File | Role |
|------|------|
| `quartz/util/bookmarkCollection.ts` | Types, filter, sort, description resolution |
| `quartz/util/loadBookmarkCorpus.ts` | Index-first corpus load + frontmatter scan fallback |
| `quartz/components/pages/CollectionContent.tsx` | Grid/list renderer |
| `quartz/components/styles/collectionGrid.scss` | Layout styles |
| `quartz/contentType.ts` | `collection` content profile |
| `quartz/plugins/emitters/contentPage.tsx` | Corpus preload, CollectionContent body, depgraph edges |

## Authoring (Obsidian)

Use the **Bookmark Collections** plugin (`.obsidian/plugins/bookmark-collections/`):

1. Command **Create bookmark collection page** (or ribbon icon)
2. Set title, tags, layout; confirm match preview
3. Save to `website/collections/{slug}.md`
4. Command **Edit bookmark collection** when a collection note is active
5. Command **Rebuild bookmark index** after bulk bookmark changes (or rely on save debounce)

See [PLUGIN_DEV.md](../../../.obsidian/plugins/bookmark-collections/PLUGIN_DEV.md) for build and settings.

## Live pages

Published (no site nav links in Phase 4):

- https://www.ssc.studio/collections/design
- https://www.ssc.studio/collections/local-first

Deploy is user-initiated via `tekhnema-remote/.workspace/scripts/deploy-website.sh` (builds Quartz and rsyncs to Tekhnema `/srv/website`). Git push alone does not update production.
