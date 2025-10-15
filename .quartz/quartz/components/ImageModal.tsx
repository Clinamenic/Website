import { QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import scriptContent from "./scripts/image-modal.inline"

// Ensure scriptContent is treated as string | undefined
const imageModalScript: string | undefined = typeof scriptContent === 'string' ? scriptContent : undefined;

function ImageModalComponent(props: QuartzComponentProps) {
  // This component itself doesn't render anything visible in static HTML
  // Its functionality is loaded via the script
  return null
}

ImageModalComponent.afterDOMLoaded = imageModalScript
// Styles are already defined in custom.scss

export default (() => ImageModalComponent) satisfies QuartzComponentConstructor; 