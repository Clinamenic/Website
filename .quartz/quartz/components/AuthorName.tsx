import { QuartzComponentConstructor, QuartzComponent } from "./types"
import "./styles/authorname.scss"

const AuthorName: QuartzComponent = ({ fileData }) => {
  const author = fileData.frontmatter?.author

  if (author) {
    return <div className="author-name quartz-author-name">By {author}</div>
  }

  return null
}

export default (() => AuthorName) satisfies QuartzComponentConstructor