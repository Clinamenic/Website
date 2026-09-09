import { Root } from "hast"
import { GlobalConfiguration } from "../../cfg"
import { getDate } from "../../components/Date"
import { escapeHTML } from "../../util/escape"
import { FilePath, FullSlug, SimpleSlug, joinSegments, simplifySlug } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { toHtml } from "hast-util-to-html"
import { write } from "./helpers"
import { i18n } from "../../i18n"
import DepGraph from "../../depgraph"
import { getContentTypeProfile } from "../../contentType"

export type ContentIndex = Map<FullSlug, ContentDetails>
export type ContentDetails = {
  title: string
  links: SimpleSlug[]
  tags: string[]
  content?: string
  richContent?: string
  date?: Date
  description?: string
  type?: string
}

/** Graph corpus: metadata only (no full-text body). */
type GraphContentDetails = Omit<ContentDetails, "content" | "description" | "richContent">

interface Options {
  enableSiteMap: boolean
  enableRSS: boolean
  rssLimit?: number
  rssFullHtml: boolean
  includeEmptyFiles: boolean
}

const defaultOptions: Options = {
  enableSiteMap: true,
  enableRSS: true,
  rssLimit: 10,
  rssFullHtml: false,
  includeEmptyFiles: true,
}

function toGraphDetails(details: ContentDetails): GraphContentDetails {
  return {
    title: details.title,
    links: details.links,
    tags: details.tags,
    date: details.date,
    type: details.type,
  }
}

function generateSiteMap(cfg: GlobalConfiguration, idx: ContentIndex): string {
  const base = cfg.baseUrl ?? ""
  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<url>
    <loc>https://${joinSegments(base, encodeURI(slug))}</loc>
    ${content.date && `<lastmod>${content.date.toISOString()}</lastmod>`}
  </url>`
  const urls = Array.from(idx)
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .join("")
  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`
}

function generateRSSFeed(cfg: GlobalConfiguration, idx: ContentIndex, limit?: number): string {
  const base = cfg.baseUrl ?? ""

  const createURLEntry = (slug: SimpleSlug, content: ContentDetails): string => `<item>
    <title>${escapeHTML(content.title)}</title>
    <link>https://${joinSegments(base, encodeURI(slug))}</link>
    <guid>https://${joinSegments(base, encodeURI(slug))}</guid>
    <description>${content.richContent ?? content.description}</description>
    <pubDate>${content.date?.toUTCString()}</pubDate>
  </item>`

  const items = Array.from(idx)
    .sort(([_, f1], [__, f2]) => {
      if (f1.date && f2.date) {
        return f2.date.getTime() - f1.date.getTime()
      } else if (f1.date && !f2.date) {
        return -1
      } else if (!f1.date && f2.date) {
        return 1
      }

      return f1.title.localeCompare(f2.title)
    })
    .map(([slug, content]) => createURLEntry(simplifySlug(slug), content))
    .slice(0, limit ?? idx.size)
    .join("")

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
      <title>${escapeHTML(cfg.pageTitle)}</title>
      <link>https://${base}</link>
      <description>${!!limit ? i18n(cfg.locale).pages.rss.lastFewNotes({ count: limit }) : i18n(cfg.locale).pages.rss.recentNotes} on ${escapeHTML(
        cfg.pageTitle,
      )}</description>
      <generator>Quartz -- quartz.jzhao.xyz</generator>
      ${items}
    </channel>
  </rss>`
}

export const ContentIndex: QuartzEmitterPlugin<Partial<Options>> = (opts) => {
  opts = { ...defaultOptions, ...opts }
  return {
    name: "ContentIndex",
    async getDependencyGraph(ctx, content, _resources) {
      const graph = new DepGraph<FilePath>()

      for (const [_tree, file] of content) {
        const sourcePath = file.data.filePath!

        // All published pages feed the graph index and sitemap/RSS
        graph.addEdge(
          sourcePath,
          joinSegments(ctx.argv.output, "static/contentIndex.json") as FilePath,
        )
        if (opts?.enableSiteMap) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "sitemap.xml") as FilePath)
        }
        if (opts?.enableRSS) {
          graph.addEdge(sourcePath, joinSegments(ctx.argv.output, "index.xml") as FilePath)
        }

        const profile = getContentTypeProfile({
          type: file.data.frontmatter?.type,
          slug: file.data.slug,
        })
        if (profile.searchable) {
          graph.addEdge(
            sourcePath,
            joinSegments(ctx.argv.output, "static/searchIndex.json") as FilePath,
          )
        }
      }

      return graph
    },
    async emit(ctx, content, _resources) {
      const cfg = ctx.cfg.configuration
      const emitted: FilePath[] = []
      const linkIndex: ContentIndex = new Map()
      const searchIndex: ContentIndex = new Map()

      for (const [tree, file] of content) {
        const slug = file.data.slug!
        const date = getDate(ctx.cfg.configuration, file.data) ?? new Date()
        const hasContent = opts?.includeEmptyFiles || (file.data.text && file.data.text !== "")

        if (!hasContent) {
          continue
        }

        const details: ContentDetails = {
          title: file.data.frontmatter?.title!,
          links: file.data.links ?? [],
          tags: file.data.frontmatter?.tags ?? [],
          content: file.data.text ?? "",
          richContent: opts?.rssFullHtml
            ? escapeHTML(toHtml(tree as Root, { allowDangerousHtml: true }))
            : undefined,
          date: date,
          description: file.data.description ?? "",
          type: typeof file.data.frontmatter?.type === "string" ? file.data.frontmatter.type : undefined,
        }

        // Graph + sitemap/RSS: all published pages with content
        linkIndex.set(slug, details)

        const profile = getContentTypeProfile({
          type: file.data.frontmatter?.type,
          slug: file.data.slug,
        })
        // Search corpus: searchable types only (excludes type:text / zettelgarten/ref/)
        if (profile.searchable) {
          searchIndex.set(slug, details)
        }
      }

      // Sitemap and RSS from full published set (not gated on searchable)
      if (opts?.enableSiteMap) {
        emitted.push(
          await write({
            ctx,
            content: generateSiteMap(cfg, linkIndex),
            slug: "sitemap" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      if (opts?.enableRSS) {
        emitted.push(
          await write({
            ctx,
            content: generateRSSFeed(cfg, linkIndex, opts.rssLimit),
            slug: "index" as FullSlug,
            ext: ".xml",
          }),
        )
      }

      const searchFp = joinSegments("static", "searchIndex") as FullSlug
      const graphFp = joinSegments("static", "contentIndex") as FullSlug

      const leanGraphIndex = Object.fromEntries(
        Array.from(linkIndex.entries()).map(([slug, details]) => [slug, toGraphDetails(details)]),
      )

      emitted.push(
        await write({
          ctx,
          content: JSON.stringify(Object.fromEntries(searchIndex)),
          slug: searchFp,
          ext: ".json",
        }),
        await write({
          ctx,
          content: JSON.stringify(leanGraphIndex),
          slug: graphFp,
          ext: ".json",
        }),
      )

      return emitted
    },
    getQuartzComponents: () => [],
  }
}
