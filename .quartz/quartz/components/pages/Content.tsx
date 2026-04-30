import { htmlToJsx } from "../../util/jsx"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "../types"

const Content: QuartzComponent = ({ fileData, tree }: QuartzComponentProps) => {
  const content = htmlToJsx(fileData.filePath!, tree)
  const classes: string[] = fileData.frontmatter?.cssclasses ?? []
  const classString = ["popover-hint", ...classes].join(" ")
  const contentType = typeof fileData.frontmatter?.type === "string" ? fileData.frontmatter.type : "default"
  return (
    <article class={classString} data-content-type={contentType}>
      {content}
    </article>
  )
}

export default (() => Content) satisfies QuartzComponentConstructor
