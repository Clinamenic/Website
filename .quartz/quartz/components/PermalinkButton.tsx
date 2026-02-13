import { QuartzComponent, QuartzComponentProps, QuartzComponentConstructor } from "./types"

const svgCopy =
    '<svg aria-hidden="true" height="24" viewBox="0 0 16 16" version="1.1" width="24" data-view-component="true"><path fill-rule="evenodd" fill="var(--dark)" d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z"></path><path fill-rule="evenodd" fill="var(--dark)" d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z"></path></svg>'

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
            dangerouslySetInnerHTML={{ __html: svgCopy }}
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

.permalink-copy-button:disabled svg {
  fill: red;
}

.permalink-copy-button svg {
  display: block;
  width: 22px;
  height: 22px;
  fill: var(--dark);
}
`

PermalinkButton.afterDOMLoaded = `
function createCopyIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('height', '24')
  svg.setAttribute('viewBox', '0 0 16 16')
  svg.setAttribute('version', '1.1')
  svg.setAttribute('width', '24')
  svg.setAttribute('data-view-component', 'true')
  
  const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path1.setAttribute('fill-rule', 'evenodd')
  path1.setAttribute('fill', 'var(--dark)')
  path1.setAttribute('d', 'M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z')
  
  const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path2.setAttribute('fill-rule', 'evenodd')
  path2.setAttribute('fill', 'var(--dark)')
  path2.setAttribute('d', 'M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z')
  
  svg.appendChild(path1)
  svg.appendChild(path2)
  return svg
}

function createCheckIcon() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('aria-hidden', 'true')
  svg.setAttribute('height', '24')
  svg.setAttribute('viewBox', '0 0 16 16')
  svg.setAttribute('version', '1.1')
  svg.setAttribute('width', '24')
  svg.setAttribute('data-view-component', 'true')
  
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
  path.setAttribute('fill-rule', 'evenodd')
  path.setAttribute('fill', 'rgb(63, 185, 80)')
  path.setAttribute('d', 'M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z')
  
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
          button.appendChild(createCopyIcon())
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

