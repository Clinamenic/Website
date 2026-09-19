import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types"

const svgLink =
  '<svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke="var(--dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke="var(--dark)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>'

const PermalinkButton: QuartzComponent = ({ fileData, cfg }: QuartzComponentProps) => {
  const uuid = fileData.frontmatter?.uuid
  const hasUuid = typeof uuid === "string" && uuid.trim().length > 0

  // Construct permalink URL if UUID exists
  let permalink = ""
  if (hasUuid) {
    const baseUrl = cfg.baseUrl ?? ""
    const cleanBaseUrl = baseUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
    const cleanUuid = uuid.trim().toLowerCase()
    permalink = `https://${cleanBaseUrl}/${cleanUuid}`
  }

  return (
    <button
      className="permalink-copy-button"
      aria-label={hasUuid ? "Copy UUID Permalink" : "This page has no permalink"}
      title={hasUuid ? "Copy UUID Permalink" : "This page has no permalink"}
      data-permalink={permalink}
      data-has-uuid={hasUuid ? "true" : "false"}
      disabled={!hasUuid}
      type="button"
      dangerouslySetInnerHTML={{ __html: svgLink }}
    />
  )
}

PermalinkButton.css = `
.permalink-copy-button {
  background: transparent;
  border: 0;
  padding: 2px 0px 0px 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
}

.permalink-copy-button:focus {
  outline: none;
}

.permalink-copy-button:disabled {
  cursor: not-allowed;
  opacity: 1;
}

.permalink-copy-button:disabled svg path {
  stroke: red;
}

.permalink-copy-button svg {
  display: block;
  width: 22px;
  height: 22px;
  fill: none;
}
`

PermalinkButton.afterDOMLoaded = `
function createLinkIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path1.setAttribute('d', 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71')
  path1.setAttribute('stroke', 'var(--dark)')
  path1.setAttribute('stroke-width', '1.5')
  path1.setAttribute('stroke-linecap', 'round')
  path1.setAttribute('stroke-linejoin', 'round')
  path1.setAttribute('fill', 'none')

  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path2.setAttribute('d', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71')
  path2.setAttribute('stroke', 'var(--dark)')
  path2.setAttribute('stroke-width', '1.5')
  path2.setAttribute('stroke-linecap', 'round')
  path2.setAttribute('stroke-linejoin', 'round')
  path2.setAttribute('fill', 'none')

  svg.appendChild(path1)
  svg.appendChild(path2)
  return svg
}

function createCheckIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('width', '24')
  svg.setAttribute('height', '24')
  svg.setAttribute('viewBox', '0 0 24 24')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('d', 'M20 6L9 17l-5-5')
  path.setAttribute('stroke', 'rgb(63, 185, 80)')
  path.setAttribute('stroke-width', '1.5')
  path.setAttribute('stroke-linecap', 'round')
  path.setAttribute('stroke-linejoin', 'round')
  path.setAttribute('fill', 'none')

  svg.appendChild(path)
  return svg
}

document.addEventListener("nav", () => {
  const button = document.querySelector('.permalink-copy-button')
  if (!button) return

  const hasUuid = button.dataset.hasUuid === "true"
  const permalink = button.dataset.permalink

  if (!hasUuid || !permalink) return

  function onClick() {
    if (button.disabled) return

    navigator.clipboard.writeText(permalink).then(
      () => {
        button.blur()
        button.innerHTML = ''
        button.appendChild(createCheckIcon())
        setTimeout(() => {
          button.innerHTML = ''
          button.appendChild(createLinkIcon())
        }, 2000)
      },
      (error) => console.error('Failed to copy permalink:', error),
    )
  }

  button.addEventListener('click', onClick)
  window.addCleanup(() => button.removeEventListener('click', onClick))
})
`

export default (() => PermalinkButton) satisfies QuartzComponentConstructor
