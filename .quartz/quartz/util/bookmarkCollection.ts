import type { FilePath } from "./path"

export interface BookmarkCorpusConfig {
  path: string
  glob: string
  /** Path to bookmark-index.json relative to Quartz content root */
  indexPath?: string
  /** Content-root stamp file touched when the index is rebuilt */
  stampPath?: string
}

export interface BookmarkRecord {
  filePath: FilePath
  title: string
  source: string
  tags: string[]
  description: string
  llmDescription: string
  llmDescriptionAuthor: string
  imageUri: string
  indexed: Date | null
  needsEnrichment: boolean
}

export type TagsMatchMode = "any" | "all"
export type CollectionLayoutVariant = "grid" | "list"
export type DescriptionSource = "llm" | "clipper" | "both"
export type CollectionSort =
  | "indexed-desc"
  | "indexed-asc"
  | "title-asc"
  | "title-desc"

export interface BookmarkCollectionFilters {
  tags?: string[]
  tagsMatch?: TagsMatchMode
  needsEnrichment?: boolean
  titleContains?: string
  domain?: string
}

export interface BookmarkCollectionLayout {
  variant: CollectionLayoutVariant
  columns?: number
  cardStyle?: "image-forward" | "compact" | "text-only"
  descriptionSource?: DescriptionSource
}

export interface BookmarkCollectionSpec {
  filters: BookmarkCollectionFilters
  layout: BookmarkCollectionLayout
  sort: CollectionSort
}

function coerceStringArray(input: unknown): string[] {
  if (input === undefined || input === null) return []
  if (Array.isArray(input)) {
    return input
      .filter((v) => typeof v === "string" || typeof v === "number")
      .map((v) => String(v).trim())
      .filter(Boolean)
  }
  if (typeof input === "string") {
    return input
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  }
  return []
}

export function normalizeTag(tag: string): string {
  return tag.trim().replace(/^#+/, "").toLowerCase()
}

export function parseBookmarkCollectionSpec(raw: unknown, filePath: string): BookmarkCollectionSpec {
  if (!raw || typeof raw !== "object") {
    throw new Error(
      `Collection page at ${filePath} is missing required frontmatter "bookmarkCollection".`,
    )
  }

  const spec = raw as Record<string, unknown>
  const filtersRaw = spec.filters
  if (!filtersRaw || typeof filtersRaw !== "object") {
    throw new Error(
      `Collection page at ${filePath} has invalid bookmarkCollection.filters (expected object).`,
    )
  }

  const filtersObj = filtersRaw as Record<string, unknown>
  const tagsMatchRaw = filtersObj.tagsMatch
  const tagsMatch: TagsMatchMode =
    tagsMatchRaw === "all" ? "all" : tagsMatchRaw === "any" ? "any" : "any"

  const layoutRaw = spec.layout
  if (!layoutRaw || typeof layoutRaw !== "object") {
    throw new Error(
      `Collection page at ${filePath} has invalid bookmarkCollection.layout (expected object).`,
    )
  }

  const layoutObj = layoutRaw as Record<string, unknown>
  const variantRaw = layoutObj.variant
  const variant: CollectionLayoutVariant =
    variantRaw === "list" ? "list" : variantRaw === "grid" ? "grid" : "grid"

  const columnsRaw = layoutObj.columns
  let columns = 3
  if (typeof columnsRaw === "number" && columnsRaw >= 2 && columnsRaw <= 4) {
    columns = Math.floor(columnsRaw)
  }

  const cardStyleRaw = layoutObj.cardStyle
  const cardStyle =
    cardStyleRaw === "compact" || cardStyleRaw === "text-only"
      ? cardStyleRaw
      : "image-forward"

  const descriptionSourceRaw = layoutObj.descriptionSource
  const descriptionSource: DescriptionSource =
    descriptionSourceRaw === "clipper" || descriptionSourceRaw === "both"
      ? descriptionSourceRaw
      : "llm"

  const sortRaw = spec.sort
  const sort: CollectionSort =
    sortRaw === "indexed-asc" ||
    sortRaw === "title-asc" ||
    sortRaw === "title-desc" ||
    sortRaw === "indexed-desc"
      ? sortRaw
      : "indexed-desc"

  const needsEnrichmentRaw = filtersObj["needs-enrichment"] ?? filtersObj.needsEnrichment
  let needsEnrichment: boolean | undefined
  if (needsEnrichmentRaw === true || needsEnrichmentRaw === "true") {
    needsEnrichment = true
  } else if (needsEnrichmentRaw === false || needsEnrichmentRaw === "false") {
    needsEnrichment = false
  }

  return {
    filters: {
      tags: coerceStringArray(filtersObj.tags).map(normalizeTag),
      tagsMatch,
      needsEnrichment,
      titleContains:
        typeof filtersObj.titleContains === "string"
          ? filtersObj.titleContains.trim()
          : undefined,
      domain: typeof filtersObj.domain === "string" ? filtersObj.domain.trim() : undefined,
    },
    layout: {
      variant,
      columns,
      cardStyle,
      descriptionSource,
    },
    sort,
  }
}

function bookmarkDomain(source: string): string {
  try {
    return new URL(source).hostname.replace(/^www\./, "").toLowerCase()
  } catch {
    return ""
  }
}

function matchesTags(record: BookmarkRecord, filterTags: string[], mode: TagsMatchMode): boolean {
  if (filterTags.length === 0) return true
  const recordTags = new Set(record.tags.map(normalizeTag))
  if (mode === "all") {
    return filterTags.every((t) => recordTags.has(normalizeTag(t)))
  }
  return filterTags.some((t) => recordTags.has(normalizeTag(t)))
}

export function filterBookmarks(
  records: BookmarkRecord[],
  spec: BookmarkCollectionSpec,
): BookmarkRecord[] {
  const { filters } = spec

  return records.filter((record) => {
    if (!matchesTags(record, filters.tags ?? [], filters.tagsMatch ?? "any")) {
      return false
    }

    if (filters.needsEnrichment === false && record.needsEnrichment) {
      return false
    }
    if (filters.needsEnrichment === true && !record.needsEnrichment) {
      return false
    }

    if (filters.titleContains) {
      const needle = filters.titleContains.toLowerCase()
      if (!record.title.toLowerCase().includes(needle)) {
        return false
      }
    }

    if (filters.domain) {
      const domainNeedle = filters.domain.replace(/^www\./, "").toLowerCase()
      const recordDomain = bookmarkDomain(record.source)
      if (!recordDomain.includes(domainNeedle)) {
        return false
      }
    }

    return true
  })
}

export function sortBookmarks(
  records: BookmarkRecord[],
  sort: CollectionSort,
): BookmarkRecord[] {
  const sorted = [...records]
  sorted.sort((a, b) => {
    switch (sort) {
      case "indexed-asc": {
        const ta = a.indexed?.getTime() ?? 0
        const tb = b.indexed?.getTime() ?? 0
        return ta - tb
      }
      case "title-asc":
        return a.title.localeCompare(b.title, undefined, { sensitivity: "base" })
      case "title-desc":
        return b.title.localeCompare(a.title, undefined, { sensitivity: "base" })
      case "indexed-desc":
      default: {
        const ta = a.indexed?.getTime() ?? 0
        const tb = b.indexed?.getTime() ?? 0
        return tb - ta
      }
    }
  })
  return sorted
}

export function resolveBookmarkDescription(
  record: BookmarkRecord,
  source: DescriptionSource,
): string {
  const clipper = record.description.trim()
  const llm = record.llmDescription.trim()

  switch (source) {
    case "clipper":
      return clipper
    case "both":
      if (clipper && llm) return `${clipper} ${llm}`.trim()
      return clipper || llm
    case "llm":
    default:
      return llm || clipper
  }
}

/**
 * Human-readable summary of collection filters for page intro and SEO meta.
 * Example: "Bookmarks filtered by #at-proto OR #atproto OR #at-protocol"
 */
export function formatCollectionFilterDescription(
  filters: BookmarkCollectionFilters,
): string {
  const tags = (filters.tags ?? []).map(normalizeTag).filter(Boolean)
  const clauses: string[] = []

  if (tags.length > 0) {
    const joiner = filters.tagsMatch === "all" ? " AND " : " OR "
    clauses.push(tags.map((t) => `#${t}`).join(joiner))
  }

  const titleContains = filters.titleContains?.trim()
  if (titleContains) {
    clauses.push(`title containing "${titleContains}"`)
  }

  const domain = filters.domain?.trim()
  if (domain) {
    clauses.push(`domain ${domain}`)
  }

  if (clauses.length === 0) {
    return "Bookmarks collection"
  }

  return `Bookmarks filtered by ${clauses.join("; ")}`
}

/** Shared glyph-grid banner when a bookmark has no image or the remote image fails. */
export const BOOKMARK_FALLBACK_BANNER = "/assets/banners/fallback-bookmark.png"
