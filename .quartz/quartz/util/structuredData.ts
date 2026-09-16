import { GlobalConfiguration } from "../cfg"
import { QuartzPluginData } from "../plugins/vfile"
import { getDate } from "../components/Date"

export type JsonLdObject = Record<string, unknown>

const THIN_TYPES = new Set(["zettel", "text"])

function firstString(value: unknown): string | undefined {
  if (typeof value === "string" && value.trim() !== "") return value.trim()
  if (Array.isArray(value)) {
    const first = value.find((v) => typeof v === "string" && v.trim() !== "")
    return typeof first === "string" ? first.trim() : undefined
  }
  return undefined
}

export function normalizeAuthor(frontmatter: Record<string, unknown>): {
  name?: string
  url?: string
} {
  const name = firstString(frontmatter.author)
  const url = firstString(frontmatter.authorURL)
  return { name, url }
}

export function deepMerge(
  base: JsonLdObject,
  override: JsonLdObject,
): JsonLdObject {
  const result: JsonLdObject = { ...base }
  for (const [key, value] of Object.entries(override)) {
    if (value === undefined) continue
    const existing = result[key]
    if (
      value !== null &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      existing !== null &&
      typeof existing === "object" &&
      !Array.isArray(existing)
    ) {
      result[key] = deepMerge(existing as JsonLdObject, value as JsonLdObject)
    } else {
      result[key] = value
    }
  }
  return result
}

function toIsoDate(d: Date | undefined): string | undefined {
  if (!d || Number.isNaN(d.getTime())) return undefined
  return d.toISOString()
}

function publisherOrg(siteUrl: string, logoUrl: string): JsonLdObject {
  return {
    "@type": "Organization",
    name: "Clinamenic LLC",
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: logoUrl,
    },
  }
}

function parseFrontmatterDate(value: unknown): Date | undefined {
  if (typeof value !== "string" && typeof value !== "number") return undefined
  const d = new Date(value)
  return Number.isNaN(d.getTime()) ? undefined : d
}

export interface BuildStructuredDataArgs {
  cfg: GlobalConfiguration
  fileData: QuartzPluginData
  frontmatter: Record<string, unknown>
  title: string
  description: string
  canonicalUrl: string
  ogImagePath?: string
  constructAbsoluteUrl: (baseUrl: string, path: string) => string
}

export function buildStructuredData(args: BuildStructuredDataArgs): JsonLdObject | undefined {
  const {
    cfg,
    fileData,
    frontmatter,
    title,
    description,
    canonicalUrl,
    ogImagePath,
    constructAbsoluteUrl,
  } = args

  const baseUrl = cfg.baseUrl ?? ""
  if (!baseUrl) return undefined

  const siteUrl = `https://${baseUrl.replace(/\/$/, "")}`
  const logoUrl = constructAbsoluteUrl(baseUrl, "static/icon.png")
  const slug = fileData.slug ?? ""
  const rawType = frontmatter.type
  const contentType =
    typeof rawType === "string" && rawType.trim() !== "" ? rawType.trim() : undefined

  if (contentType && THIN_TYPES.has(contentType)) {
    return undefined
  }

  const isHomepage = contentType === "homepage" || slug === "index" || slug === "/"
  const publisher = publisherOrg(siteUrl, logoUrl)

  if (isHomepage) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          name: cfg.pageTitle,
          url: siteUrl,
          description,
          publisher: { "@id": `${siteUrl}/#organization` },
        },
        {
          ...publisher,
          "@id": `${siteUrl}/#organization`,
        },
      ],
    }
  }

  if (contentType === "writing" || contentType === "publication") {
    const { name: authorName, url: authorUrl } = normalizeAuthor(frontmatter)
    const published =
      toIsoDate(getDate(cfg, fileData)) ??
      toIsoDate(parseFrontmatterDate(frontmatter.date))
    const modified =
      toIsoDate(fileData.dates?.modified) ?? published

    const posting: JsonLdObject = {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: title,
      description,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": canonicalUrl,
      },
      publisher,
    }

    if (ogImagePath) posting.image = ogImagePath
    if (published) posting.datePublished = published
    if (modified) posting.dateModified = modified
    if (authorName) {
      const author: JsonLdObject = {
        "@type": "Person",
        name: authorName,
      }
      if (authorUrl) author.url = authorUrl
      posting.author = author
    }

    const publicationUrl = firstString(frontmatter["publication-url"])
    if (
      publicationUrl &&
      (publicationUrl.startsWith("http://") || publicationUrl.startsWith("https://"))
    ) {
      posting.isBasedOn = publicationUrl
    }

    return posting
  }

  if (contentType === "service") {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      description,
      url: canonicalUrl,
      provider: publisher,
    }
  }

  // site-page and other indexable types
  if (
    contentType === "site-page" ||
    contentType === "project" ||
    contentType === "resource" ||
    contentType === "pre-spec" ||
    contentType === "contact" ||
    contentType === "journal-entry" ||
    !contentType
  ) {
    // Skip unknown empty thin pages without a registered type only if they look like tag/folder
    // Default: emit WebPage for remaining published content that is not thin
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: title,
      description,
      url: canonicalUrl,
      publisher,
    }
  }

  // Unregistered types that are not thin: still emit WebPage
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
    publisher,
  }
}

export function defaultOgType(
  contentType: string | undefined,
  slug: string | undefined,
): string {
  if (contentType === "homepage" || slug === "index" || slug === "/") {
    return "website"
  }
  if (contentType === "writing" || contentType === "publication") {
    return "article"
  }
  if (contentType === "site-page" || contentType === "service") {
    return "website"
  }
  return "article"
}

export function resolveStructuredData(
  auto: JsonLdObject | undefined,
  structuredDataRaw: unknown,
): JsonLdObject | undefined {
  if (structuredDataRaw == null) {
    return auto
  }

  let override: JsonLdObject | undefined
  if (typeof structuredDataRaw === "string") {
    try {
      const parsed = JSON.parse(structuredDataRaw) as unknown
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        override = parsed as JsonLdObject
      }
    } catch (e) {
      console.error("Error parsing frontmatter structuredData JSON:", e)
      return auto
    }
  } else if (
    structuredDataRaw &&
    typeof structuredDataRaw === "object" &&
    !Array.isArray(structuredDataRaw)
  ) {
    override = structuredDataRaw as JsonLdObject
  }

  if (!override) {
    return auto
  }

  return deepMerge(auto ?? {}, override)
}
