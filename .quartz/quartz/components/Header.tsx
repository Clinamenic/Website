import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header>
    <nav class="header-nav" aria-label="Site navigation">
      {children}
    </nav>
  </header> : null
}

Header.css = `
header {
  box-sizing: border-box;
  position: fixed;
  height: 3.5rem;
  top: 0;
  left: calc((100vw - 750px) / 2);
  right: calc((100vw - 750px) / 2);
  margin-left: auto;
  margin-right: auto;
  z-index: 1000;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

header svg {
  fill: var(--dark);
}

.flex-component {
width: 100%;
justify-content: space-between !important;
}

header h1 {
  margin: 0;
  flex: auto;
}

.header-nav {
  padding: 0.75rem 1.5rem;
  margin: 0rem 1rem 0.5rem 1rem;
  background-color: var(--light);
  border: 1px solid var(--lightgray);
  border-top: none;
  border-bottom-left-radius: var(--border-radius-normal);
  border-bottom-right-radius: var(--border-radius-normal);
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  & h2 {
    font-size: 1rem;
    font-weight: 400;
  }
}
`

Header.afterDOMLoaded = `
  const header = document.getElementById('quartz-header')
  const content = document.querySelector('.container') // Adjust this selector to match your content container

  function adjustHeader() {
    if (header && content) {
      const rect = content.getBoundingClientRect()
      header.style.left = rect.left + 'px'
      header.style.right = (window.innerWidth - rect.right) + 'px'
      header.style.width = rect.width + 'px'
    }
  }

  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 0) {
        header.classList.add('scrolled')
      } else {
        header.classList.remove('scrolled')
      }
    })

    window.addEventListener('resize', adjustHeader)
    adjustHeader() // Initial adjustment
  }
`

export default (() => Header) satisfies QuartzComponentConstructor
