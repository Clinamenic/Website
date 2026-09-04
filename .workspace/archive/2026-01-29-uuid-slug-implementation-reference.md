# UUID-Based Slug Implementation Reference

## Overview

This document provides a complete reference for the UUID-based slug system implementation in Quartz. This feature allows pages to use UUIDs (Universally Unique Identifiers) from frontmatter as URL slugs instead of file path-based slugs, providing permanent, linkrot-resistant URLs.

**Status**: This implementation is currently pending in git. The vanilla file path slug system should remain as the default.

## Architecture Summary

The implementation adds a configurable slug generation strategy that:
1. Reads UUIDs from frontmatter (`uuid:` field)
2. Validates UUID format (UUID v4)
3. Uses UUID as slug when strategy is "uuid" and UUID is available
4. Falls back to file path slugs when UUID is missing or invalid
5. Maintains a mapping from file path slugs to actual slugs for link resolution
6. Updates internal links to use UUID slugs automatically

## Files Modified

### 1. Configuration Files

#### `.quartz/quartz/cfg.ts`
- **Change**: Added `slugStrategy` option to `GlobalConfiguration` interface
- **Location**: Lines 68-74
- **Details**:
  ```typescript
  /**
   * Method for generating URL slugs from content files
   * - "filepath": Use file path-based slugs (default, existing behavior)
   * - "uuid": Use UUID from frontmatter when available, fall back to file path
   * @default "filepath"
   */
  slugStrategy?: "filepath" | "uuid"
  ```

#### `.quartz/quartz.config.ts`
- **Change**: Add `slugStrategy: "uuid"` to configuration object (if using UUID strategy)
- **Example**:
  ```typescript
  const config: QuartzConfig = {
    configuration: {
      // ... other config ...
      slugStrategy: "uuid", // Optional: defaults to "filepath"
    },
    // ... rest of config ...
  }
  ```

### 2. Core Utility Functions

#### `.quartz/quartz/util/path.ts`
- **Changes**:
  1. Added `uuidToSlug()` function (lines 91-111)
  2. Added `generateSlug()` function (lines 113-148)
  3. Modified `TransformOptions` interface (line 271)
  4. Modified `transformLink()` function (lines 274-330)

**New Function: `uuidToSlug()`**
```typescript
/**
 * Validates and normalizes a UUID string for use as a slug
 * @param uuid - UUID string from frontmatter (may be any type)
 * @returns FullSlug if valid UUID, undefined if invalid
 */
function uuidToSlug(uuid: string | unknown): FullSlug | undefined {
  if (typeof uuid !== "string") {
    return undefined
  }
  
  // UUID v4 regex: 8-4-4-4-12 hex digits with hyphens
  // Version digit must be 4, variant must be 8, 9, a, or b
  const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  
  const normalized = uuid.trim().toLowerCase()
  if (UUID_V4_REGEX.test(normalized)) {
    return normalized as FullSlug
  }
  
  return undefined
}
```

**New Function: `generateSlug()`**
```typescript
/**
 * Generates a slug based on the configured strategy
 * @param frontmatter - Frontmatter data containing optional uuid field
 * @param filePath - File path as fallback
 * @param strategy - Slug generation strategy ("filepath" | "uuid")
 * @returns FullSlug (UUID if strategy is "uuid" and UUID is available, otherwise file path slug)
 */
export function generateSlug(
  frontmatter: { uuid?: string | unknown } | undefined,
  filePath: FilePath,
  strategy: "filepath" | "uuid" = "filepath",
): FullSlug {
  // First, check if this is the index page - always use "index" for index pages
  const filePathSlug = slugifyFilePath(filePath)
  if (filePathSlug === "index" || filePathSlug.endsWith("/index")) {
    // Always use "index" for index pages, never UUID or directory prefix
    return "index" as FullSlug
  }

  // If strategy is "filepath", use file path
  if (strategy === "filepath") {
    return filePathSlug
  }

  // Strategy is "uuid" - try to use UUID from frontmatter
  if (frontmatter?.uuid) {
    const uuidSlug = uuidToSlug(frontmatter.uuid)
    if (uuidSlug) {
      // Use UUID without directory prefix (flat structure)
      return uuidSlug
    }
  }

  // Fallback to file path slug (UUID missing or invalid)
  return filePathSlug
}
```

**Modified Interface: `TransformOptions`**
```typescript
export interface TransformOptions {
  strategy: "absolute" | "relative" | "shortest"
  allSlugs: FullSlug[]
  filePathSlugToActualSlug?: Map<FullSlug, FullSlug> // Added this field
}
```

**Modified Function: `transformLink()`**
- Added logic to use `filePathSlugToActualSlug` mapping (lines 284-300)
- Tries exact match first, then filename match for relative links
- Uses actual slug (UUID) if mapping exists, otherwise uses original logic

### 3. Build Context

#### `.quartz/quartz/util/ctx.ts`
- **Change**: Added `filePathSlugToActualSlug` to `BuildCtx` interface (line 21)
- **Details**:
  ```typescript
  export interface BuildCtx {
    buildId: string
    argv: Argv
    cfg: QuartzConfig
    allSlugs: FullSlug[]
    filePathSlugToActualSlug?: Map<FullSlug, FullSlug> // Added this field
  }
  ```

### 4. Parsing Process

#### `.quartz/quartz/processors/parse.ts`
- **Changes**:
  1. Import `generateSlug` (line 10)
  2. Update slug assignment after frontmatter processing (lines 101-105)

**Key Changes**:
```typescript
import { FilePath, QUARTZ, slugifyFilePath, generateSlug } from "../util/path"

// ... in createFileParser function ...

// Initial slug assignment (line 96) - kept for early plugin access
file.data.slug = slugifyFilePath(file.data.relativePath)

// Process markdown and frontmatter
const ast = processor.parse(file)
const newAst = await processor.run(ast, file)

// Get slug strategy from config (defaults to "filepath")
const slugStrategy = cfg.configuration.slugStrategy ?? "filepath"

// Update slug based on configured strategy (lines 101-105)
file.data.slug = generateSlug(file.data.frontmatter, file.data.relativePath, slugStrategy)
```

**Why Two Slug Assignments?**
- Initial assignment (line 96) ensures slug exists early for plugins that may need it
- Final assignment (line 105) updates slug based on UUID strategy after frontmatter is processed

### 5. Build Process

#### `.quartz/quartz/build.ts`
- **Changes**:
  1. Update `ctx.allSlugs` from parsed content (line 84)
  2. Build `filePathSlugToActualSlug` mapping (lines 87-94)
  3. Call `updateLinksInParsedContent()` (line 97)
  4. Update rebuild logic to rebuild mapping (lines 431-436)

**Key Changes**:
```typescript
const parsedFiles = await parseMarkdown(ctx, filePaths)

// Update allSlugs from actual parsed content (may include UUID slugs)
ctx.allSlugs = parsedFiles.map(([_tree, vfile]) => vfile.data.slug!)

// Build mapping from file path slugs to actual slugs for link resolution
ctx.filePathSlugToActualSlug = new Map()
for (const [_tree, vfile] of parsedFiles) {
  const filePathSlug = slugifyFilePath(vfile.data.relativePath!)
  const actualSlug = vfile.data.slug!
  if (filePathSlug !== actualSlug) {
    ctx.filePathSlugToActualSlug.set(filePathSlug, actualSlug)
  }
}

// Update links in parsed content using mapping (post-processing step)
const updatedParsedFiles = updateLinksInParsedContent(parsedFiles, ctx)
```

**Rebuild Logic** (lines 431-436):
```typescript
// Rebuild mapping for fast rebuilds
ctx.filePathSlugToActualSlug = new Map()
for (const [_tree, vfile] of rebuildContent) {
  const filePathSlug = slugifyFilePath(vfile.data.relativePath!)
  const actualSlug = vfile.data.slug!
  if (filePathSlug !== actualSlug) {
    ctx.filePathSlugToActualSlug.set(filePathSlug, actualSlug)
  }
}
```

### 6. Link Processing

#### `.quartz/quartz/plugins/transformers/links.ts`
- **Changes**:
  1. Pass `filePathSlugToActualSlug` to `transformLink()` (line 51)
  2. Added `updateLinksInParsedContent()` function (lines 170-245)

**New Function: `updateLinksInParsedContent()`**
```typescript
/**
 * Updates links in already-parsed content using the filePathSlugToActualSlug mapping.
 * This is called after all files are parsed and the mapping is built.
 * 
 * @param content - Array of parsed content (AST + file data)
 * @param ctx - Build context containing the mapping
 * @returns Updated content with links transformed to use UUID slugs
 */
export function updateLinksInParsedContent(
  content: ProcessedContent[],
  ctx: BuildCtx,
): ProcessedContent[] {
  // If no mapping or mapping is empty, no updates needed
  if (!ctx.filePathSlugToActualSlug || ctx.filePathSlugToActualSlug.size === 0) {
    return content
  }

  // Get link resolution strategy from CrawlLinks plugin config
  const crawlLinksPlugin = ctx.cfg.plugins.transformers.find(
    (p) => p.name === "LinkProcessing",
  )
  const strategy =
    ((crawlLinksPlugin as any)?.options?.markdownLinkResolution as TransformOptions["strategy"]) ||
    "absolute"

  const transformOptions: TransformOptions = {
    strategy,
    allSlugs: ctx.allSlugs,
    filePathSlugToActualSlug: ctx.filePathSlugToActualSlug,
  }

  return content.map(([tree, file]) => {
    // Clone the tree to avoid mutating the original
    const updatedTree = JSON.parse(JSON.stringify(tree)) as Root

    visit(updatedTree, "element", (node: Element) => {
      // Update links in <a> tags
      if (node.tagName === "a" && node.properties && typeof node.properties.href === "string") {
        const href = node.properties.href as string
        const isInternal = !(isAbsoluteUrl(href) || href.startsWith("#"))

        if (isInternal) {
          // Transform link using mapping
          const newHref = transformLink(file.data.slug!, href, transformOptions)
          node.properties.href = newHref

          // Update data-slug attribute to match new href
          const curSlug = simplifySlug(file.data.slug!)
          const url = new URL(newHref, "https://base.com/" + stripSlashes(curSlug, true))
          const canonicalDest = url.pathname
          let [destCanonical, _destAnchor] = splitAnchor(canonicalDest)
          if (destCanonical.endsWith("/")) {
            destCanonical += "index"
          }
          const full = decodeURIComponent(stripSlashes(destCanonical, true)) as FullSlug
          node.properties["data-slug"] = full
        }
      }

      // Update links in <img>, <video>, <audio>, <iframe> tags
      if (
        ["img", "video", "audio", "iframe"].includes(node.tagName) &&
        node.properties &&
        typeof node.properties.src === "string"
      ) {
        const src = node.properties.src as string
        if (!isAbsoluteUrl(src)) {
          const newSrc = transformLink(file.data.slug!, src, transformOptions)
          node.properties.src = newSrc
        }
      }
    })

    return [updatedTree, file] as ProcessedContent
  })
}
```

**Why Post-Processing?**
- HTML plugins (including `CrawlLinks`) run during `processor.run()` in the parsing phase
- The `filePathSlugToActualSlug` mapping is built *after* all files are parsed
- Therefore, a post-processing step is needed to update links using the complete mapping

### 7. Frontmatter Type Definitions

#### `.quartz/quartz/plugins/transformers/frontmatter.ts`
- **Change**: Extended `DataMap` interface to include `uuid?: string` (if needed)
- **Note**: This may not be explicitly required if frontmatter is typed as `{ [key: string]: unknown }`

## How It Works

### Build Flow

1. **File Discovery**: Build process discovers all `.md` files
2. **Initial Parsing**: Each file is parsed, frontmatter is extracted
3. **Slug Generation**: 
   - Initial slug assigned from file path (for early plugin access)
   - After frontmatter processing, slug is updated based on strategy
   - If strategy is "uuid" and valid UUID exists, use UUID
   - Otherwise, use file path slug
4. **Mapping Creation**: After all files parsed, build mapping:
   - `filePathSlug` → `actualSlug` (UUID if different)
   - Only includes entries where file path slug differs from actual slug
5. **Link Resolution**: Post-processing step updates all internal links:
   - Uses mapping to resolve file path references to UUID slugs
   - Handles exact matches and filename-only matches
6. **Content Emission**: Files emitted using actual slugs (UUIDs or file paths)

### Special Cases

1. **Homepage (`index.md`)**: Always uses `"index"` slug, never UUID
2. **Missing UUID**: Falls back to file path slug
3. **Invalid UUID**: Falls back to file path slug (invalid format)
4. **Relative Links**: Filename matching handles links that only include filename

### UUID Validation

- **Format**: UUID v4 (8-4-4-4-12 hex digits with hyphens)
- **Version**: Must have "4" in version position
- **Variant**: Must have 8, 9, a, or b in variant position
- **Case**: Normalized to lowercase
- **Whitespace**: Trimmed before validation

## Configuration

### Enable UUID Strategy

In `.quartz/quartz.config.ts`:
```typescript
const config: QuartzConfig = {
  configuration: {
    // ... other config ...
    slugStrategy: "uuid", // Use UUID slugs
  },
  // ... rest of config ...
}
```

### Add UUIDs to Frontmatter

In markdown files:
```markdown
---
uuid: 2c052cbc-a0fe-4585-86d5-7d6477db9eac
title: My Article
---

# My Article
```

### Disable UUID Strategy (Use File Paths)

In `.quartz/quartz.config.ts`:
```typescript
const config: QuartzConfig = {
  configuration: {
    // ... other config ...
    slugStrategy: "filepath", // or omit (defaults to "filepath")
  },
  // ... rest of config ...
}
```

## Reverting to Vanilla System

To revert to the vanilla file path slug system:

1. **Remove Configuration**: Remove or comment out `slugStrategy: "uuid"` in `quartz.config.ts`
2. **Default Behavior**: System defaults to `"filepath"` strategy
3. **No Code Changes Needed**: All code supports both strategies via configuration

The implementation is designed to be backward compatible. When `slugStrategy` is `"filepath"` or undefined, the system behaves exactly as the vanilla Quartz implementation.

## Key Design Decisions

1. **Post-Processing for Links**: Links are updated after all files are parsed because the mapping is only complete at that point
2. **Homepage Special Case**: Homepage always uses `"index"` slug for clean base domain URL
3. **Flat UUID Structure**: UUIDs are used without directory prefixes (e.g., `/uuid` not `/writing/uuid`)
4. **Graceful Fallback**: System always falls back to file path slugs if UUID is missing or invalid
5. **Mapping Efficiency**: Only stores mappings where file path slug differs from actual slug

## Testing Checklist

When implementing or reverting:

- [ ] Homepage loads at base domain (`/`)
- [ ] Pages with UUIDs use UUID slugs in URLs
- [ ] Pages without UUIDs use file path slugs
- [ ] Internal links resolve correctly to UUID slugs
- [ ] Relative links (filename-only) resolve correctly
- [ ] Image/media links resolve correctly
- [ ] Invalid UUIDs fall back to file path slugs
- [ ] Missing UUIDs fall back to file path slugs
- [ ] Build completes without errors
- [ ] Fast rebuild works correctly

## Related Documentation

- **Planning Document**: `.workspace/docs/temp/2026-01-29-quartz-uuid-slug-implementation.md`
- **Feature Report**: `.workspace/docs/features/uuid-based-slugs.md`
- **Dual URL Evaluation**: `.workspace/docs/temp/2026-01-29-dual-url-system-evaluation.md`

