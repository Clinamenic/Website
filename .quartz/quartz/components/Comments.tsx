import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
// @ts-ignore
import script from "./scripts/comments.inline"

type Options = {
  provider: "giscus"
  options: {
    repo: `${string}/${string}`
    repoId: string
    category: string
    categoryId: string
    mapping?: "url" | "title" | "og:title" | "specific" | "number" | "pathname"
    strict?: boolean
    theme?: string
    reactionsEnabled?: boolean
    inputPosition?: "top" | "bottom"
  }
  showComments?: (frontmatter: Frontmatter) => boolean
}

interface Frontmatter {
  hideComments?: boolean
  // ... other frontmatter properties
}

const defaultOptions: Options = {
  provider: "giscus",
  options: {
    repo: "",
    repoId: "",
    category: "",
    categoryId: "",
    mapping: "url",
    strict: true,
    theme: "https://github.com/Clinamenic/Zettelgarten/blob/v4/quartz/components/styles/giscusCustom.css",
    reactionsEnabled: false,
    inputPosition: "bottom",
  },
  showComments: (frontmatter: Frontmatter) => !frontmatter.hideComments,
}

function boolToStringBool(b: boolean): string {
  return b ? "1" : "0"
}

export default ((opts: Options) => {
  const Comments: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const showComments = opts.showComments ?? defaultOptions.showComments

    if (showComments && !showComments(fileData.frontmatter)) {
      return null
    }
    return (
      <div
        class={classNames(displayClass, "giscus")}
        style={{
          // Add more styles as needed
        }}
        data-repo={opts.options.repo}
        data-repo-id={opts.options.repoId}
        data-category={opts.options.category}
        data-category-id={opts.options.categoryId}
        data-mapping={opts.options.mapping ?? defaultOptions.options.mapping}
        data-strict={boolToStringBool(opts.options.strict ?? defaultOptions.options.strict)}
        data-reactions-enabled={boolToStringBool(opts.options.reactionsEnabled ?? defaultOptions.options.reactionsEnabled)}
        data-input-position={opts.options.inputPosition ?? defaultOptions.options.inputPosition}
        data-theme={opts.options.theme ?? defaultOptions.options.theme}
      ></div>
    )
  }

  Comments.afterDOMLoaded = script

  return Comments
}) satisfies QuartzComponentConstructor<Options>