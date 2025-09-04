import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { CustomOgImagesEmitterName } from "../plugins/emitters/ogImage"

// Dark mode initialization script
const darkModeScript = `
// Always default to dark mode
const currentTheme = localStorage.getItem("theme") ?? "dark"
document.documentElement.setAttribute("saved-theme", currentTheme)

const emitThemeChangeEvent = (theme) => {
  const event = new CustomEvent("themechange", {
    detail: { theme },
  })
  document.dispatchEvent(event)
}
`

// Sticky navbar CSS
const stickyNavbarCSS = `
.page-header {
  position: sticky !important;
  top: 0 !important;
  z-index: 1000 !important;
  background-color: var(--light) !important;
  border-bottom: 1px solid var(--lightgray) !important;
  padding: 0.75rem 2rem !important;
  margin: 0 !important;
  backdrop-filter: blur(10px) !important;
  background-color: rgba(var(--light-rgb), 0.9) !important;
}

.page-header .flex-component {
  align-items: center !important;
  justify-content: space-between !important;
  max-width: calc(var(--desktop-max-width, 1200px) + 300px) !important;
  margin: 0 auto !important;
}

.page-header .page-title {
  margin: 0 !important;
  font-size: 1.5rem !important;
}

.page-header .search {
  flex: 0 1 300px !important;
  margin-left: 2rem !important;
}

@media all and (max-width: 768px) {
  .page-header {
    padding: 0.5rem 1rem !important;
  }
  
  .page-header .search {
    margin-left: 1rem !important;
    flex: 1 !important;
  }
  
  .page-header .page-title {
    font-size: 1.25rem !important;
  }
}

/* Adjust body content to account for sticky header */
#quartz-body {
  padding-top: 80px !important;
}

@media all and (max-width: 768px) {
  #quartz-body {
    padding-top: 70px !important;
  }
}
`
export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const title =
      (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    const usesCustomOgImage = ctx.cfg.plugins.emitters.some(
      (e) => e.name === CustomOgImagesEmitterName,
    )
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        {!usesCustomOgImage && (
          <>
            <meta property="og:image" content={ogImageDefaultPath} />
            <meta property="og:image:url" content={ogImageDefaultPath} />
            <meta name="twitter:image" content={ogImageDefaultPath} />
            <meta
              property="og:image:type"
              content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
            />
          </>
        )}

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  Head.beforeDOMLoaded = darkModeScript
  return Head
}) satisfies QuartzComponentConstructor
