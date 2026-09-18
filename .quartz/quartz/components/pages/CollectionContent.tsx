import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"
import style from "../styles/collectionGrid.scss"
import listPageStyle from "../styles/listPage.scss"
import {
  filterBookmarks,
  formatCollectionFilterDescription,
  parseBookmarkCollectionSpec,
  resolveBookmarkDescription,
  sortBookmarks,
  type BookmarkRecord,
} from "../../util/bookmarkCollection"
import { getCachedBookmarkCorpus } from "../../util/loadBookmarkCorpus"

function tryDomain(source: string): string {
  try {
    return new URL(source).hostname.replace(/^www\./, "")
  } catch {
    return ""
  }
}

function GridCard({
  record,
  descriptionSource,
  cardStyle,
}: {
  record: BookmarkRecord
  descriptionSource: "llm" | "clipper" | "both"
  cardStyle: "image-forward" | "compact" | "text-only"
}) {
  const description = resolveBookmarkDescription(record, descriptionSource)
  const showImage = cardStyle !== "text-only" && record.imageUri.length > 0

  return (
    <article class={`collection-card ${cardStyle}`}>
      <a
        class="collection-card-link"
        href={record.source}
        target="_blank"
        rel="noopener noreferrer"
        title={description || undefined}
      >
        {showImage && (
          <div class="collection-card-image">
            <img src={record.imageUri} alt={record.title} loading="lazy" />
          </div>
        )}
        <div class="collection-card-body">
          <h3 class="collection-card-title">{record.title}</h3>
          {description && <p class="collection-card-description">{description}</p>}
        </div>
      </a>
    </article>
  )
}

function ListItem({
  record,
  descriptionSource,
}: {
  record: BookmarkRecord
  descriptionSource: "llm" | "clipper" | "both"
}) {
  const description = resolveBookmarkDescription(record, descriptionSource)
  const domain = tryDomain(record.source)

  return (
    <li class="collection-list-item">
      <a
        href={record.source}
        target="_blank"
        rel="noopener noreferrer"
        title={description || undefined}
      >
        <p class="collection-list-title">{record.title}</p>
        {description && <p class="collection-list-description">{description}</p>}
        {domain && <p class="collection-list-domain">{domain}</p>}
      </a>
    </li>
  )
}

export default (() => {
  const CollectionContent: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, ctx } = props
    const pageType = fileData.frontmatter?.type

    if (pageType !== "collection") {
      throw new Error(
        `Component "CollectionContent" tried to render a non-collection page: ${fileData.slug}`,
      )
    }

    const spec = parseBookmarkCollectionSpec(
      fileData.frontmatter?.bookmarkCollection,
      fileData.filePath ?? fileData.slug ?? "unknown",
    )

    const corpus = getCachedBookmarkCorpus(ctx)
    if (!corpus) {
      throw new Error(
        `Bookmark corpus not loaded for collection page ${fileData.slug}. Ensure loadBookmarkCorpus runs before render.`,
      )
    }

    const matched = sortBookmarks(filterBookmarks(corpus, spec), spec.sort)
    const intro = formatCollectionFilterDescription(spec.filters)

    const cssClasses: string[] = fileData.frontmatter?.cssclasses ?? []
    const classes = ["popover-hint", "collection-listing", ...cssClasses].join(" ")
    const columns = spec.layout.columns ?? 3

    return (
      <div class={classes} data-content-type="collection">
        {intro && <article class="collection-intro"><p>{intro}</p></article>}
        <p class="collection-count">{matched.length} bookmarks</p>
        {spec.layout.variant === "list" ? (
          <ul class="collection-list">
            {matched.map((record) => (
              <ListItem
                key={record.filePath}
                record={record}
                descriptionSource={spec.layout.descriptionSource ?? "llm"}
              />
            ))}
          </ul>
        ) : (
          <div class={`collection-grid columns-${columns}`}>
            {matched.map((record) => (
              <GridCard
                key={record.filePath}
                record={record}
                descriptionSource={spec.layout.descriptionSource ?? "llm"}
                cardStyle={spec.layout.cardStyle ?? "image-forward"}
              />
            ))}
          </div>
        )}
      </div>
    )
  }

  CollectionContent.css = style + listPageStyle
  return CollectionContent
}) satisfies QuartzComponentConstructor
