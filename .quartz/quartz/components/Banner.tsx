import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
import type { QuartzPluginData } from "../plugins/vfile"

interface BannerOptions {
  showBanner?: (fileData: QuartzPluginData) => boolean
}

const defaultOptions: BannerOptions = {
  showBanner: () => true,
}

export default ((opts?: BannerOptions) => {
  function Banner({ fileData }: QuartzComponentProps) {
    const showBanner = opts?.showBanner ?? defaultOptions.showBanner
    const bannerURI = fileData.frontmatter?.bannerURI

    if (!showBanner(fileData)) {
      return null
    }

    if (!bannerURI) {
      return null
    }

    return (
      <div className="banner" style="width: calc(100% - 2px);">
        <img
          src={bannerURI}
          alt="Banner"
          style="width: 100%; max-width: var(--pageContentWidth); margin-top: 0rem; border-radius: 10px; border: 1px solid var(--dark)"
        />
      </div>
    )
  }

  return Banner
}) satisfies QuartzComponentConstructor<BannerOptions>