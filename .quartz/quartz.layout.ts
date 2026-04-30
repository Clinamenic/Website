import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import type { QuartzPluginData } from "./quartz/plugins/vfile"
import { ContentLayoutTemplate, getContentTypeProfile } from "./quartz/contentType"

const profileForFile = (fileData: QuartzPluginData) => getContentTypeProfile(fileData)

const banner = Component.Banner({
  showBanner: (fileData: QuartzPluginData) => profileForFile(fileData).showBanner,
})
const articleTitle = Component.ArticleTitle({
  showTitle: (_frontmatter, fileData?: QuartzPluginData) =>
    fileData ? profileForFile(fileData).showTitle : true,
})
const articleSubtitle = Component.ArticleSubtitle({
  showSubtitle: (_frontmatter, fileData?: QuartzPluginData) =>
    fileData ? profileForFile(fileData).showSubtitle : true,
})
const authorName = Component.AuthorName({
  showAuthor: (fileData: QuartzPluginData) => profileForFile(fileData).showAuthor,
})
const publishDate = Component.PublishDate({
  showDate: (fileData: QuartzPluginData) => profileForFile(fileData).showDate,
})
const explorer = Component.DesktopOnly(
  Component.Explorer({
    showExplorer: (fileData: QuartzPluginData) => profileForFile(fileData).showExplorer,
  }),
)
const backlinks = Component.DesktopOnly(
  Component.Backlinks({
    showBacklinks: (fileData: QuartzPluginData) => profileForFile(fileData).showBacklinks,
  }),
)
const tableOfContents = Component.DesktopOnly(Component.TableOfContents())
const sidenotes = Component.Sidenotes({
  showSidenotes: (fileData: QuartzPluginData) => profileForFile(fileData).showSidenotes,
})
const licenseInfo = Component.LicenseInfo({
  showLicenseInfo: (fileData: QuartzPluginData) => profileForFile(fileData).showLicenseInfo,
})

export const contentPageLayoutTemplates: Record<ContentLayoutTemplate, PageLayout> = {
  default: {
    beforeBody: [banner, articleTitle, articleSubtitle, authorName, publishDate],
    left: [explorer, backlinks],
    right: [tableOfContents],
  },
  writing: {
    beforeBody: [banner, articleTitle, articleSubtitle, authorName, publishDate],
    left: [explorer, backlinks],
    right: [tableOfContents],
  },
  "site-page": {
    beforeBody: [banner, articleTitle, articleSubtitle, authorName, publishDate],
    left: [explorer, backlinks],
    right: [tableOfContents],
  },
  homepage: {
    beforeBody: [banner, articleTitle, articleSubtitle, authorName, publishDate],
    left: [explorer, backlinks],
    right: [tableOfContents],
  },
}

export const resolveContentPageLayout = (
  type: unknown,
  slug?: QuartzPluginData["slug"],
): PageLayout => {
  const profile = getContentTypeProfile({ type, slug })
  return contentPageLayoutTemplates[profile.layout] ?? contentPageLayoutTemplates.default
}

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [
    Component.Darkmode(),
    Component.PermalinkButton(),
    Component.Search(),
  ],
  afterBody: [
    sidenotes,
    Component.TagList(),
    Component.FlexContainer({
      components: [
        licenseInfo,
        Component.CitationGenerator(undefined),
      ],
      showFlex: (fileData: QuartzPluginData) => profileForFile(fileData).showFlex,
    }),
    Component.ArweaveIndex(),
    Component.DownloadMarkdown(),
    Component.Graph({
      localGraph: undefined,
      globalGraph: undefined,
      showGraph: (fileData: QuartzPluginData) => profileForFile(fileData).showGraph,
    }),
    Component.ImageModal(),
  ],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/clinamenic",
      Twitter: "https://twitter.com/clinamenic",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = contentPageLayoutTemplates.default

// components for pages that display lists of pages (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [
    Component.ArticleTitle(),
    // Component.ContentMeta(),
  ],
  left: [
    Component.DesktopOnly(Component.Explorer()),
    Component.DesktopOnly(Component.Backlinks()),
  ],
  right: [
    Component.DesktopOnly(Component.TableOfContents()),
  ],
}

export const defaultLayout = defaultContentPageLayout
