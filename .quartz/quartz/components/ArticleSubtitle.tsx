import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface ArticleSubtitleOptions {
  showSubtitle?: (frontmatter: Frontmatter) => boolean
}

interface Frontmatter {
  subtitle?: string
  quartzShowSubtitle?: boolean
  // ... other frontmatter properties
}

const defaultOptions: ArticleSubtitleOptions = {
  showSubtitle: (frontmatter: Frontmatter) => frontmatter.quartzShowSubtitle ?? true,
}

export default ((opts?: ArticleSubtitleOptions) => {
  const ArticleSubtitle: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const showSubtitle = opts?.showSubtitle ?? defaultOptions.showSubtitle
    const subtitle = fileData.frontmatter?.subtitle

    if (!showSubtitle || !showSubtitle(fileData.frontmatter) || !subtitle) {
      return null
    }

    return <h2 class={classNames(displayClass, "article-subtitle")}><em>{subtitle}</em></h2>
  }

  ArticleSubtitle.css = `
  .article-subtitle {
    max-width: 750px !important;
    color: var(--dark);
    line-height: 1.6 !important;
    margin: -0.5rem 4rem 1.75rem 4rem !important;
    font-size: 0.9rem;
    text-align: center;
    transition: color 0.5s ease;
    font-family: 'GeistMono', monospace;
    font-weight: 200;
    @media all and (max-width: calc(750px + 2rem)) { 
      padding: 0rem;
      margin: -0.5rem 0rem 1.75rem 0rem !important;
    }
  }
  `

  return ArticleSubtitle
}) satisfies QuartzComponentConstructor