import { QuartzComponentConstructor, QuartzComponent, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

interface FlexContainerOptions {
  components: QuartzComponent[]
  showFlex?: (frontmatter: Frontmatter) => boolean
}

interface Frontmatter {
  quartzShowFlex?: boolean
  // ... other frontmatter properties
}

const defaultOptions: FlexContainerOptions = {
  components: [],
  showFlex: (frontmatter: Frontmatter) => frontmatter?.quartzShowFlex ?? false,
}

export default ((opts?: FlexContainerOptions) => {
  const FlexContainer: QuartzComponent = ({ displayClass, cfg, fileData }: QuartzComponentProps) => {
    const showFlex = opts?.showFlex ?? defaultOptions.showFlex
    
    if (showFlex && !showFlex(fileData.frontmatter)) {
      return null;
    }

    if (!opts?.components?.length) {
      return null;
    }

    return (
      <div className={classNames(displayClass, "flex-container")}>
        <div className="flex-content">
          {opts.components.map((Component, index) => (
            <div key={index} className="flex-item">
              <div className="flex-item-inner">
                <Component {...{ displayClass, cfg, fileData }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  FlexContainer.css = `
    .flex-container {
      width: 100%;
      max-width: var(--pageContentWidth);
      margin: 1rem 0;
    }

    .flex-content {
      display: flex;
      gap: 1rem;
      justify-content: space-between;
      box-sizing: border-box;
      min-height: 144px;
    }

    .flex-item {
      flex: 1;
      min-width: 300px;
      display: flex;
      box-sizing: border-box;
    }

    .flex-item-inner {
      width: 100%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      
      & > div {
        box-sizing: border-box;
        flex: 1;
        margin: 0 !important;
        display: flex;
      }

      & > div > * {
        box-sizing: border-box;
        flex: 1;
        margin: 0;
      }

      & > div > .quartz-license-info {
        padding: 0.75rem 1rem;
      }
    }

    @media (max-width: 768px) {
      .flex-content {
        flex-direction: column;
        min-height: auto;
      }
      
      .flex-item {
        width: 100%;
        min-width: 100%;
      }
    }
  `

  return FlexContainer;
}) satisfies QuartzComponentConstructor;