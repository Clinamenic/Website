import fs from "fs"
import path from "path"
import matter from "gray-matter"
import chalk from "chalk"
import type { BuildCtx } from "./ctx"
import type { BookmarkCorpusConfig, BookmarkRecord } from "./bookmarkCollection"
import { normalizeTag } from "./bookmarkCollection"
import { FilePath } from "./path"
import { glob } from "./glob"

const BOOKMARK_INDEX_VERSION = 2

let corpusCache: { buildId: string; records: BookmarkRecord[] } | null = null

interface BookmarkIndexRecord {
  path: string
  title: string
  source: string
  tags: string[]
  description: string
  llmDescription: string
  llmDescriptionAuthor: string
  imageUri: string
  indexed: string | null
  needsEnrichment: boolean
  mtimeMs?: number
}

interface BookmarkIndexFile {
  version: number
  generatedAt: string
  sourceFolder: string
  records: BookmarkIndexRecord[]
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

function parseIndexed(value: unknown): Date | null {
  if (value instanceof Date) return value
  if (typeof value === "string" && value.trim()) {
    const d = new Date(value)
    return Number.isNaN(d.getTime()) ? null : d
  }
  return null
}

function isPrivate(data: Record<string, unknown>): boolean {
  const v = data.private
  return v === true || v === "true"
}

function parseNeedsEnrichment(data: Record<string, unknown>): boolean {
  const v = data["needs-enrichment"] ?? data.needsEnrichment
  return v === true || v === "true"
}

function normalizeRecord(filePath: FilePath, data: Record<string, unknown>): BookmarkRecord {
  const imageUri =
    (typeof data["image-uri"] === "string" ? data["image-uri"] : "") ||
    (typeof data.imageUri === "string" ? data.imageUri : "")

  return {
    filePath,
    title: typeof data.title === "string" ? data.title.trim() : path.basename(filePath, ".md"),
    source: typeof data.source === "string" ? data.source.trim() : "",
    tags: coerceStringArray(data.tags).map(normalizeTag),
    description: typeof data.description === "string" ? data.description.trim() : "",
    llmDescription:
      typeof data["llm-description"] === "string"
        ? data["llm-description"].trim()
        : typeof data.llmDescription === "string"
          ? data.llmDescription.trim()
          : "",
    llmDescriptionAuthor:
      typeof data["llm-description-author"] === "string"
        ? data["llm-description-author"].trim()
        : typeof data.llmDescriptionAuthor === "string"
          ? data.llmDescriptionAuthor.trim()
          : "",
    imageUri: imageUri.trim(),
    indexed: parseIndexed(data.indexed),
    needsEnrichment: parseNeedsEnrichment(data),
  }
}

function defaultCorpusConfig(): BookmarkCorpusConfig {
  return {
    path: "../bookmarks",
    glob: "bookmark_*.md",
    indexPath: "../bookmarks/.workspace/cache/bookmark-index.json",
    stampPath: "collections/.corpus-stamp",
  }
}

export function resolveBookmarkCorpusPath(ctx: BuildCtx): string {
  const corpus = ctx.cfg.configuration.bookmarkCorpus
  if (!corpus?.path) {
    throw new Error("bookmarkCorpus.path is not configured in quartz.config.ts")
  }
  return path.resolve(ctx.argv.directory, corpus.path)
}

export function resolveBookmarkIndexPath(ctx: BuildCtx): string {
  const corpus = ctx.cfg.configuration.bookmarkCorpus ?? defaultCorpusConfig()
  const indexPath = corpus.indexPath ?? "../bookmarks/.workspace/cache/bookmark-index.json"
  return path.resolve(ctx.argv.directory, indexPath)
}

export function resolveCorpusStampPath(ctx: BuildCtx): string {
  const corpus = ctx.cfg.configuration.bookmarkCorpus ?? defaultCorpusConfig()
  const stampPath = corpus.stampPath ?? "collections/.corpus-stamp"
  return path.resolve(ctx.argv.directory, stampPath)
}

function isBookmarkIndexFile(value: unknown): value is BookmarkIndexFile {
  if (!value || typeof value !== "object") return false
  const obj = value as Record<string, unknown>
  return (
    obj.version === BOOKMARK_INDEX_VERSION &&
    typeof obj.generatedAt === "string" &&
    typeof obj.sourceFolder === "string" &&
    Array.isArray(obj.records)
  )
}

function indexRecordsToBookmarkRecords(
  index: BookmarkIndexFile,
  contentRoot: string,
): BookmarkRecord[] {
  const records: BookmarkRecord[] = []
  for (const entry of index.records) {
    // Index should exclude private bookmarks; skip if a private flag sneaks in
    const data = entry as unknown as Record<string, unknown>
    if (isPrivate(data)) continue

    const absolutePath = path.isAbsolute(entry.path)
      ? entry.path
      : path.resolve(contentRoot, "..", entry.path)

    records.push({
      filePath: absolutePath as FilePath,
      title: entry.title?.trim() || path.basename(entry.path, ".md"),
      source: entry.source?.trim() ?? "",
      tags: coerceStringArray(entry.tags).map(normalizeTag),
      description: entry.description?.trim() ?? "",
      llmDescription: entry.llmDescription?.trim() ?? "",
      llmDescriptionAuthor: entry.llmDescriptionAuthor?.trim() ?? "",
      imageUri: entry.imageUri?.trim() ?? "",
      indexed: parseIndexed(entry.indexed),
      needsEnrichment: Boolean(entry.needsEnrichment),
    })
  }
  return records
}

function tryLoadIndex(ctx: BuildCtx): BookmarkRecord[] | null {
  const indexPath = resolveBookmarkIndexPath(ctx)
  if (!fs.existsSync(indexPath)) return null

  try {
    const raw = fs.readFileSync(indexPath, "utf-8")
    const parsed = JSON.parse(raw) as unknown
    if (!isBookmarkIndexFile(parsed)) {
      console.log(
        chalk.yellow(
          `Bookmark corpus: index at ${indexPath} has unexpected schema; falling back to frontmatter scan.`,
        ),
      )
      return null
    }
    const records = indexRecordsToBookmarkRecords(parsed, ctx.argv.directory)
    if (ctx.argv.verbose) {
      console.log(chalk.cyan(`Bookmark corpus: loaded ${records.length} record(s) from index.`))
    }
    return records
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.log(
      chalk.yellow(
        `Bookmark corpus: failed to read index (${message}); falling back to frontmatter scan.`,
      ),
    )
    return null
  }
}

async function scanBookmarkCorpusFromFiles(ctx: BuildCtx): Promise<BookmarkRecord[]> {
  const corpusConfig: BookmarkCorpusConfig =
    ctx.cfg.configuration.bookmarkCorpus ?? defaultCorpusConfig()

  const corpusDir = path.resolve(ctx.argv.directory, corpusConfig.path)
  if (!fs.existsSync(corpusDir)) {
    throw new Error(`Bookmark corpus directory not found: ${corpusDir}`)
  }

  const relativePaths = await glob(corpusConfig.glob, corpusDir, [".workspace", "temp", "private"])
  const records: BookmarkRecord[] = []

  let skipped = 0
  for (const rel of relativePaths) {
    const filePath = path.join(corpusDir, rel) as FilePath
    const raw = fs.readFileSync(filePath, "utf-8")
    let data: Record<string, unknown>
    try {
      data = matter(raw).data as Record<string, unknown>
    } catch (err) {
      skipped += 1
      if (ctx.argv.verbose) {
        const message = err instanceof Error ? err.message : String(err)
        console.log(chalk.yellow(`Skipping bookmark with invalid frontmatter: ${filePath} (${message})`))
      }
      continue
    }
    if (isPrivate(data)) {
      continue
    }
    records.push(normalizeRecord(filePath, data))
  }

  if (skipped > 0) {
    console.log(
      chalk.yellow(
        `Bookmark corpus: skipped ${skipped} file(s) with invalid frontmatter (${records.length} loaded).`,
      ),
    )
  }

  return records
}

export async function loadBookmarkCorpus(ctx: BuildCtx): Promise<BookmarkRecord[]> {
  if (corpusCache?.buildId === ctx.buildId) {
    return corpusCache.records
  }

  let records = tryLoadIndex(ctx)
  if (records === null) {
    console.log(chalk.cyan("Bookmark corpus: index missing or unusable; scanning frontmatter."))
    records = await scanBookmarkCorpusFromFiles(ctx)
  }

  corpusCache = { buildId: ctx.buildId, records }
  return records
}

export function getCachedBookmarkCorpus(ctx: BuildCtx): BookmarkRecord[] | null {
  if (corpusCache?.buildId === ctx.buildId) {
    return corpusCache.records
  }
  return null
}
