import { i18n } from "../i18n"
import { FullSlug, joinSegments, pathToRoot } from "../util/path"
import { JSResourceToScriptElement } from "../util/resources"
import { googleFontHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Define frontmatter interface for TypeScript
interface QuartzFrontmatter {
  title?: string
  headDescription?: string
  subtitle?: string
  description?: string
  headIcon?: string
  bannerURI?: string
  keywords?: string[] | string
  canonicalUrl?: string
  ogType?: string
  ogSiteName?: string
  ogUrl?: string
  twitterCard?: string
  twitterSite?: string
  twitterCreator?: string
  structuredData?: object | string
  umami_id?: string
}

// Helper to check if a URL is absolute
const isAbsoluteUrl = (str: string): boolean => {
  return str.startsWith('http://') || str.startsWith('https://')
}

// Helper to construct absolute URLs
const constructAbsoluteUrl = (baseUrl: string, path: string): string => {
  if (!baseUrl) return path
  baseUrl = baseUrl.replace(/\/$/, '') // Remove trailing slash
  path = path.replace(/^\//, '') // Remove leading slash
  return `https://${baseUrl}/${path}`
}

// Helper to safely stringify JSON-LD data
const safeStringifyStructuredData = (data: unknown): string => {
  try {
    // Replace potential XSS vectors
    return JSON.stringify(data)
      .replace(/</g, '\\u003c')
      .replace(/>/g, '\\u003e')
      .replace(/&/g, '\\u0026')
      .replace(/'/g, '\\u0027')
  } catch (e) {
    console.error('Error stringifying structured data:', e)
    return ''
  }
}

export default (() => {
  const Head: QuartzComponent = ({ cfg, fileData, externalResources }: QuartzComponentProps) => {
    const frontmatter = fileData.frontmatter as QuartzFrontmatter ?? {}
    const { css, js } = externalResources

    // Base URL and paths
    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const baseDir = fileData.slug === "404" ? url.pathname as FullSlug : pathToRoot(fileData.slug!)
    const defaultCanonicalUrl = constructAbsoluteUrl(cfg.baseUrl ?? "", fileData.slug ?? "")

    // Core metadata
    const title = frontmatter.title ?? i18n(cfg.locale).propertyDefaults.title
    const description = (
      frontmatter.headDescription ??
      frontmatter.subtitle ??
      fileData.description?.trim() ??
      i18n(cfg.locale).propertyDefaults.description
    )

    // Keywords
    const keywordsRaw = frontmatter.keywords
    const keywords = Array.isArray(keywordsRaw)
      ? keywordsRaw.join(', ')
      : typeof keywordsRaw === 'string'
        ? keywordsRaw
        : undefined

    // URLs and paths
    const canonicalUrl = frontmatter.canonicalUrl ?? defaultCanonicalUrl

    // Open Graph
    const ogType = frontmatter.ogType ?? (
      fileData.slug === 'index' || fileData.slug === '/'
        ? 'website'
        : 'article'
    )

    const ogSiteName = frontmatter.ogSiteName ?? cfg.pageTitle
    const ogUrl = frontmatter.ogUrl ?? canonicalUrl

    // Twitter Card
    const twitterCard = frontmatter.twitterCard ?? (
      frontmatter.bannerURI
        ? 'summary_large_image'
        : 'summary'
    )

    const twitterSite = frontmatter.twitterSite
    const twitterCreator = frontmatter.twitterCreator

    // Icon (Favicon)
    const headIconString = frontmatter.headIcon
    const iconPath = headIconString
      ? isAbsoluteUrl(headIconString)
        ? headIconString
        : joinSegments(baseDir, headIconString)
      : joinSegments(baseDir, "static/icon.png")

    // Open Graph Image
    const bannerUriString = frontmatter.bannerURI
    const ogImagePath = cfg.baseUrl && (
      bannerUriString
        ? isAbsoluteUrl(bannerUriString)
          ? bannerUriString
          : constructAbsoluteUrl(cfg.baseUrl, bannerUriString)
        : constructAbsoluteUrl(cfg.baseUrl, 'static/og-image.png')
    )

    // Structured Data
    const structuredDataRaw = frontmatter.structuredData
    const structuredDataStr = structuredDataRaw
      ? typeof structuredDataRaw === 'string'
        ? structuredDataRaw // Already a JSON string
        : safeStringifyStructuredData(structuredDataRaw)
      : undefined

    // Analytics
    const umamiId = frontmatter.umami_id

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        
        {/* Font Loading */}
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
          </>
        )}

        {/* Core SEO Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />
        <link rel="canonical" href={canonicalUrl} />
        {keywords && <meta name="keywords" content={keywords} />}
        <link rel="icon" href={iconPath} />

        {/* Open Graph Tags */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content={ogType} />
        <meta property="og:url" content={ogUrl} />
        {ogSiteName && <meta property="og:site_name" content={ogSiteName} />}
        {ogImagePath && (
          <>
            <meta property="og:image" content={ogImagePath} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
          </>
        )}

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content={twitterCard} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImagePath && <meta name="twitter:image" content={ogImagePath} />}
        {twitterSite && <meta name="twitter:site" content={twitterSite} />}
        {twitterCreator && <meta name="twitter:creator" content={twitterCreator} />}

        {/* Structured Data */}
        {structuredDataStr && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredDataStr }}
          />
        )}

        {/* Resource Loading */}
        {css.map((href) => (
          <link key={href} href={href} rel="stylesheet" type="text/css" spa-preserve />
        ))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}

        {/* Analytics */}
        {umamiId && (
          <script
            async
            defer
            src="https://umami-dashboard-sand.vercel.app/script.js"
            data-website-id={umamiId}
          />
        )}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
