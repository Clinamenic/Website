import { pathToRoot, slugTag } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const TagList: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
  const tags = fileData.frontmatter?.tags
  const baseDir = pathToRoot(fileData.slug!)
  if (tags && tags.length > 0) {
    return (
      <div className={classNames(displayClass, "tags-container")}>
        <ul className="tags">
          {tags.map((tag) => {
            const linkDest = baseDir + `/tags/${slugTag(tag)}`
            return (
              <li>
                <a href={linkDest} className="internal tag-link">
                  {tag}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  } else {
    return null
  }
}

TagList.css = `
.tags-container {
  overflow-x: auto;
  padding: 0.5rem 0;
  margin: 0rem 0rem 1rem 0rem;
}

.tags {
  font-size: 0.75rem;
  list-style: none;
  display: flex;
  padding-left: 0;
  gap: 0.4rem;
  margin: 0;
  flex-wrap: nowrap;
  width: max-content;
}

.tags > li {
  display: inline-block;
  white-space: nowrap;
  margin: 0;
}

a.internal.tag-link {
  border-radius: 8px;
  background-color: var(--highlight);
  padding: 0.2rem 0.4rem;
  margin: 0 0.1rem;
}

/* For Webkit browsers like Chrome/Safari */
.tags-container::-webkit-scrollbar {
  height: 4px;
}

.tags-container::-webkit-scrollbar-thumb {
  background-color: var(--gray);
  border-radius: 2px;
}

/* For Firefox */
.tags-container {
  scrollbar-width: thin;
  scrollbar-color: var(--gray) transparent;
}
`

export default (() => TagList) satisfies QuartzComponentConstructor