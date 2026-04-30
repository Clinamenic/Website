import { QuartzComponentConstructor, QuartzComponent } from "./types"
import type { QuartzPluginData } from "../plugins/vfile"
import "./styles/authorname.scss"

interface AuthorNameOptions {
  showAuthor?: (fileData: QuartzPluginData) => boolean
}

const defaultOptions: AuthorNameOptions = {
  showAuthor: () => true,
}

export default ((opts?: AuthorNameOptions) => {
  const AuthorName: QuartzComponent = ({ fileData }) => {
    const showAuthor = opts?.showAuthor ?? defaultOptions.showAuthor
    const author = fileData.frontmatter?.author

    if (!showAuthor(fileData)) {
      return null
    }

    if (author) {
      return <div className="author-name quartz-author-name">By {author}</div>
    }

    return null
  }

  return AuthorName
}) satisfies QuartzComponentConstructor<AuthorNameOptions>