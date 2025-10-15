// @ts-ignore: this is safe, we don't want to actually make darkmode.inline.ts a module as
// modules are automatically deferred and we don't want that to happen for critical beforeDOMLoads
// see: https://v8.dev/features/modules#defer
// toltip for darkmode <title>{i18n(cfg.locale).components.themeToggle.darkMode}</title>
// tooltip for lightmode <title>{i18n(cfg.locale).components.themeToggle.lightMode}</title>
import darkmodeScript from "./scripts/darkmode.inline"
import styles from "./styles/darkmode.scss"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import { classNames } from "../util/lang"

const Darkmode: QuartzComponent = ({ displayClass, cfg }: QuartzComponentProps) => {
  return (
    <div class="theme-toggle" role="toolbar" aria-label="Theme toggle">
      <button class={classNames(displayClass, "darkmode")} id="darkmode" aria-label={i18n(cfg.locale).components.themeToggle.darkMode}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          id="dayIcon"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          aria-hidden="true"
        >
          
          <g
            fill="none"
            stroke="var(--dark)"
            stroke-width="1.75"
            stroke-linecap="round"
          >

            <circle cx="12" cy="12" r="5" />
      
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </g>
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          id="nightIcon"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          style="enable-background:new 0 0 100 100"
          xmlSpace="preserve"
          aria-hidden="true"
        >
          
          <path d="M96.76,66.458c-0.853-0.852-2.15-1.064-3.23-0.534c-6.063,2.991-12.858,4.571-19.655,4.571  C62.022,70.495,50.88,65.88,42.5,57.5C29.043,44.043,25.658,23.536,34.076,6.47c0.532-1.08,0.318-2.379-0.534-3.23  c-0.851-0.852-2.15-1.064-3.23-0.534c-4.918,2.427-9.375,5.619-13.246,9.491c-9.447,9.447-14.65,22.008-14.65,35.369  c0,13.36,5.203,25.921,14.65,35.368s22.008,14.65,35.368,14.65c13.361,0,25.921-5.203,35.369-14.65  c3.872-3.871,7.064-8.328,9.491-13.246C97.826,68.608,97.611,67.309,96.76,66.458z"></path>
        </svg>
        <span class="sr-only">{i18n(cfg.locale).components.themeToggle.darkMode}</span>
      </button>
    </div>
  )
}

Darkmode.css = `
${styles}

.theme-toggle {
  display: flex;
  align-items: center;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`

Darkmode.beforeDOMLoaded = darkmodeScript

export default (() => Darkmode) satisfies QuartzComponentConstructor
