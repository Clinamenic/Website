// @ts-ignore
import clipboardScript from "./scripts/clipboard.inline"
import clipboardStyle from "./styles/clipboard.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// Define OverlayNoise as a simple function returning JSX
function OverlayNoise() {
  return (
    <div className="overlay-container">
      <svg id="noiseSVG" viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <defs>
          <filter id="noiseFilterGlobal">
            <feTurbulence type="fractalNoise" baseFrequency="1" numOctaves="3" stitchTiles="stitch" seed="2"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noiseFilterGlobal)" opacity="0.25"/>
      </svg>
    </div>
  )
}

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return (
    <>
      <OverlayNoise />
      <div id="quartz-body">{children}</div>
    </>
  )
}

Body.afterDOMLoaded = clipboardScript
Body.css = clipboardStyle

export default (() => Body) satisfies QuartzComponentConstructor
