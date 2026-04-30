import type { QuartzPluginData } from "./plugins/vfile"

/**
 * Profiles are inferred from legacy `quartzShow*`/`quartzSearch` frontmatter patterns:
 *
 * - `type: site-page` (inner pages): most pages mirrored about.md/writing.md/services.md
 *   explorer, backlinks, TOC, titles on; citations and flex containers off.
 * - `site-page` plus slug `index` (home): index.md suppressed sidebars/meta and disables TOC.
 * - `type: writing`: long-form essays overwhelmingly enabled every optional block
 *   (citation strip, graph, flex license row, backlinks, TOC, search).
 */
export type ContentLayoutTemplate = "default" | "writing" | "site-page" | "homepage"

export interface ContentTypeProfile {
  layout: ContentLayoutTemplate
  searchable: boolean
  showExplorer: boolean
  showBacklinks: boolean
  showTOC: boolean
  showTitle: boolean
  showSubtitle: boolean
  showAuthor: boolean
  showDate: boolean
  showBanner: boolean
  showGraph: boolean
  showFlex: boolean
  showCitation: boolean
  showLicenseInfo: boolean
  showSidenotes: boolean
  showArchive: boolean
}

const defaultProfile: ContentTypeProfile = {
  layout: "default",
  searchable: true,
  showExplorer: true,
  showBacklinks: true,
  showTOC: true,
  showTitle: true,
  showSubtitle: true,
  showAuthor: true,
  showDate: true,
  showBanner: true,
  showGraph: true,
  showFlex: true,
  showCitation: true,
  showLicenseInfo: true,
  showSidenotes: false,
  showArchive: false,
}

const writingEssayProfile: ContentTypeProfile = {
  layout: "writing",
  searchable: true,
  showExplorer: true,
  showBacklinks: true,
  showTOC: true,
  showTitle: true,
  showSubtitle: true,
  showAuthor: true,
  showDate: true,
  showBanner: true,
  showGraph: true,
  showFlex: true,
  showCitation: true,
  showLicenseInfo: true,
  showSidenotes: true,
  showArchive: true,
}

/** Inner marketing/pages (about, gallery, typography, ...) when `type` is site-page */
const sitePageInnerProfile: ContentTypeProfile = {
  layout: "site-page",
  searchable: true,
  showExplorer: true,
  showBacklinks: true,
  showTOC: true,
  showTitle: true,
  showSubtitle: true,
  showAuthor: false,
  showDate: false,
  showBanner: false,
  showGraph: true,
  showFlex: false,
  showCitation: false,
  showLicenseInfo: false,
  showSidenotes: false,
  showArchive: false,
}

/** Home page stays full width without side/meta chrome */
const homepageProfile: ContentTypeProfile = {
  layout: "homepage",
  searchable: false,
  showExplorer: false,
  showBacklinks: false,
  showTOC: true,
  showTitle: false,
  showSubtitle: false,
  showAuthor: false,
  showDate: false,
  showBanner: false,
  showGraph: true,
  showFlex: false,
  showCitation: false,
  showLicenseInfo: false,
  showSidenotes: false,
  showArchive: false,
}

/** Same column layout as site-page; formerly the separate "focused" profile (no local graph, citations on) */
const serviceLikeProfile: ContentTypeProfile = {
  layout: "site-page",
  searchable: true,
  showExplorer: true,
  showBacklinks: true,
  showTOC: true,
  showTitle: true,
  showSubtitle: true,
  showAuthor: true,
  showDate: true,
  showBanner: true,
  showGraph: false,
  showFlex: false,
  showCitation: true,
  showLicenseInfo: true,
  showSidenotes: false,
  showArchive: false,
}

/** Explicit catalogue for extension; unknown types fall back to `defaultProfile` */
const registeredProfiles: Record<string, ContentTypeProfile> = {
  writing: writingEssayProfile,
  homepage: homepageProfile,
  /** Default site-section pages (non-index) mirror about.md et al. Slug branching handles index.md */
  "site-page": sitePageInnerProfile,
  publication: serviceLikeProfile,
  service: serviceLikeProfile,
}

/** Accepts Quartz plugin data objects, contextual objects, or a bare `type` string */
export type ContentProfileInput =
  | string
  | null
  | undefined
  | QuartzPluginData
  | {
      type?: unknown
      slug?: QuartzPluginData["slug"]
      frontmatter?: { type?: unknown }
    }

export function getContentTypeProfile(input: ContentProfileInput): ContentTypeProfile {
  let parsedType: unknown

  if (typeof input === "string") {
    parsedType = input.trim() || undefined
  } else if (input && typeof input === "object") {
    if ("frontmatter" in input && input.frontmatter) {
      const ctx = input as { frontmatter?: { type?: unknown }; slug?: unknown }
      parsedType = ctx.frontmatter?.type
    } else if ("type" in input) {
      const ctx = input as { type?: unknown; slug?: unknown }
      parsedType = ctx.type
    } else {
      const fd = input as QuartzPluginData
      parsedType = fd.frontmatter?.type
    }
  }

  const normalizedType =
    parsedType !== undefined && parsedType !== null && String(parsedType).trim() !== ""
      ? String(parsedType).trim()
      : undefined

  if (!normalizedType) {
    return defaultProfile
  }

  return registeredProfiles[normalizedType] ?? defaultProfile
}

