import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface ArticleTitleOptions {
  showTitle?: (frontmatter: Frontmatter) => boolean
}

interface Frontmatter {
  title?: string
  quartzShowTitle?: boolean
  // ... other frontmatter properties
}

const defaultOptions: ArticleTitleOptions = {
  showTitle: (frontmatter: Frontmatter) => frontmatter.quartzShowTitle ?? true,
}

export default ((opts?: ArticleTitleOptions) => {
  const ArticleTitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const showTitle = opts?.showTitle ?? defaultOptions.showTitle
    const title = fileData.frontmatter?.title

    if (!showTitle || !showTitle(fileData.frontmatter) || !title) {
      return null
    }

    return <h1 class={classNames(displayClass, "article-title")}>{title}</h1>
  }

  ArticleTitle.css = `
  .article-title {
    font-family: 'GeistMono', monospace;
    font-weight: 300;
    font-size: 1.5rem;
    max-width: var(--pageContentWidth);
    line-height: 1.3;
    padding: 1.5rem 4rem;
    margin-top: 0rem;
    text-align: center;
    @media all and (max-width: calc(750px + 2rem)) { 
      padding: 1.5rem 1rem 1rem 1rem;
    }
  }
  `

  return ArticleTitle
}) satisfies QuartzComponentConstructor