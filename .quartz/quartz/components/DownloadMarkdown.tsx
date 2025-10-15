import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"

const DownloadMarkdown: QuartzComponent = ({
  fileData,
  displayClass,
}: QuartzComponentProps) => {
  const downloadable = fileData.frontmatter?.downloadable === true

  if (!downloadable) {
    return null
  }

  const reconstructMarkdown = () => {
    let content = '---\n'
    for (const [key, value] of Object.entries(fileData.frontmatter)) {
      content += `${key}: ${JSON.stringify(value)}\n`
    }
    content += '---\n\n'
    
    // Add the main content
    if (fileData.content) {
      content += fileData.content
    } else if (fileData.htmlAst) {
      content += convertHtmlAstToMarkdown(fileData.htmlAst)
    }
    
    return content
  }

  const convertHtmlAstToMarkdown = (htmlAst) => {
    // This is a simplified conversion. You might need to expand this based on your specific needs.
    let markdown = ''
    const traverse = (node) => {
      if (node.type === 'text') {
        markdown += node.value
      } else if (node.type === 'element') {
        if (node.tagName === 'div') {
          markdown += '\n<div'
          for (const [attr, value] of Object.entries(node.properties || {})) {
            markdown += ` ${attr}="${value}"`
          }
          markdown += '>\n'
        } else if (node.tagName === 'p') {
          markdown += '\n'
        }
        node.children?.forEach(traverse)
        if (node.tagName === 'div') {
          markdown += '</div>\n'
        } else if (node.tagName === 'p') {
          markdown += '\n'
        }
      }
    }
    htmlAst.children.forEach(traverse)
    return markdown
  }

  const downloadMarkdownScript = `
    function downloadMarkdown() {
      console.log("Download function called");
      const content = ${JSON.stringify(reconstructMarkdown())};
      console.log("Content to be downloaded:", content);
      const filename = "${fileData.slug!.split('/').pop()}.md";
      const blob = new Blob([content], { type: 'text/markdown' });
      const url = URL.createObjectURL(blob);
      
      const tempLink = document.createElement('a');
      tempLink.href = url;
      tempLink.setAttribute('download', filename);
      tempLink.setAttribute('target', '_blank');
      document.body.appendChild(tempLink);
      tempLink.click();
      document.body.removeChild(tempLink);
      
      setTimeout(() => {
        URL.revokeObjectURL(url);
        console.log("Download initiated");
      }, 100);
    }
  `

  return (
    <div class={classNames(displayClass, "download-markdown-container")}>
      <button 
        class="download-markdown-button" 
        onclick="downloadMarkdown(); return false;"
      >
        Download Markdown
      </button>
      <script dangerouslySetInnerHTML={{ __html: downloadMarkdownScript }} />
    </div>
  )
}

DownloadMarkdown.css = `
  .download-markdown-container {
    margin-top: 1rem;
  }
  .download-markdown-button {
    padding: 0.5rem 1rem;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
  }
  .download-markdown-button:hover {
    background-color: #e0e0e0;
  }
`

export default (() => DownloadMarkdown) satisfies QuartzComponentConstructor