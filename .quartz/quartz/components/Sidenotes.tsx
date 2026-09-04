import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { resolveRelative, simplifySlug } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Root, Element } from "hast"
import { visit } from "unist-util-visit"
import style from "./styles/sidenotes.scss"
// @ts-ignore
import script from "./scripts/sidenotes.inline"
import { FullSlug } from "../util/path"

interface SidenotesOptions {
  enabled?: boolean
  maxTileHeight?: string
  tileStyle?: "card" | "minimal"
  showOnMobile?: boolean
  forceRightOnly?: boolean
  showSidenotes?: (fileData: QuartzPluginData) => boolean
}

const defaultOptions: SidenotesOptions = {
  enabled: true,
  maxTileHeight: "200px",
  tileStyle: "card", 
  showOnMobile: false,
  forceRightOnly: false,
  showSidenotes: () => true,
}

interface BlockReference {
  blockId: string
  element: Element
  position: number
}

interface SidenoteData {
  blockId: string
  referencingNotes: QuartzPluginData[]
  position: number
  side: "left" | "right"
}

function extractBlockReferences(tree: Root): BlockReference[] {
  const blockRefs: BlockReference[] = []
  let position = 0

  visit(tree, "element", (node: Element) => {
    position++

    if (node.properties?.id && typeof node.properties.id === "string") {
      const blockId = node.properties.id as string
      if (/^[a-zA-Z0-9-_]+$/.test(blockId)) {
        blockRefs.push({
          blockId,
          element: node,
          position,
        })
      }
    }
  })

  return blockRefs
}

function slugBasename(slug: string): string {
  return slug.split("/").pop() ?? slug
}

function slugsMatch(dataSlug: string | undefined, currentSlug: FullSlug): boolean {
  if (!dataSlug) return false
  if (dataSlug === currentSlug) return true

  const normalize = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-")

  if (normalize(dataSlug) === normalize(currentSlug)) return true
  return normalize(slugBasename(dataSlug)) === normalize(slugBasename(currentSlug))
}

function hrefMatchesBlockId(href: string, blockId: string): boolean {
  const escaped = blockId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`#\\^?${escaped}$`).test(href)
}

function findReferencingNotes(blockId: string, currentSlug: FullSlug, allFiles: QuartzPluginData[]): QuartzPluginData[] {
  const referencingNotes: QuartzPluginData[] = []
  
  for (const file of allFiles) {
    if (file.slug === currentSlug) continue

    if (file.frontmatter?.type !== "zettel") {
      continue
    }
    
    if (file.htmlAst && file.htmlAst.children) {
      let foundBlockReference = false
      
      const searchForBlockLinks = (node: any): void => {
        if (node.type === "element" && node.tagName === "a" && node.properties?.href) {
          const href = node.properties.href as string
          const dataSlug = node.properties["data-slug"] as string
          
          if (hrefMatchesBlockId(href, blockId) && slugsMatch(dataSlug, currentSlug)) {
            foundBlockReference = true
            return
          }
        }
        
        if (node.children) {
          node.children.forEach(searchForBlockLinks)
        }
      }
      
      file.htmlAst.children.forEach(searchForBlockLinks)
      
      if (foundBlockReference) {
        referencingNotes.push(file)
      }
    }
  }
  
  return referencingNotes
}

function organizeSidenotes(
  blockRefs: BlockReference[], 
  allFiles: QuartzPluginData[], 
  currentSlug: FullSlug,
  forceRightOnly: boolean = false
): SidenoteData[] {
  const sidenotes: SidenoteData[] = []
  
  for (const blockRef of blockRefs) {
    const referencingNotes = findReferencingNotes(blockRef.blockId, currentSlug, allFiles)
    
    if (referencingNotes.length > 0) {
      // Assign sides based on alternating pattern
      referencingNotes.forEach((note, index) => {
        let side: "left" | "right"
        if (forceRightOnly) {
          side = "right"
        } else {
          side = index % 2 === 0 ? "left" : "right"
        }
        
        sidenotes.push({
          blockId: blockRef.blockId,
          referencingNotes: [note], // Each note gets its own tile
          position: blockRef.position,
          side
        })
      })
    }
  }
  
  return sidenotes
}

function renderSidenoteContent(note: QuartzPluginData): JSX.Element {
  // Process the HTML AST to properly render tags and other content
  if (note.htmlAst && note.htmlAst.children) {
    return (
      <div class="sidenote-text">
        {renderSidenoteAst(note.htmlAst.children)}
      </div>
    )
  } else if (note.text) {
    return (
      <div class="sidenote-text">
        {note.text}
      </div>
    )
  }
  return <div class="sidenote-text"></div>
}

function renderSidenoteAst(children: any[]): JSX.Element[] {
  const elements: JSX.Element[] = []
  
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    
    if (child.type === 'text') {
      elements.push(<span key={i}>{child.value}</span>)
    } else if (child.type === 'element') {
      if (child.tagName === 'a' && child.properties?.className?.includes('tag-link')) {
        // This is a tag link - extract the full tag from the URL
        let fullTag = child.children?.[0]?.value || ''
        
        // Try to get the full tag from the URL if available
        if (child.properties?.href) {
          const href = child.properties.href as string
          // URL format is typically "/tags/tag/path" or similar
          const tagMatch = href.match(/\/tags\/(.+)$/)
          if (tagMatch) {
            fullTag = tagMatch[1].replace(/-/g, '/') // Convert slugified back to original format
          }
        }
        
        elements.push(
          <span key={i} class="sidenote-tag">
            #{fullTag}
          </span>
        )
      } else if (child.tagName === 'p') {
        // Render paragraph content
        elements.push(
          <p key={i}>
            {child.children ? renderSidenoteAst(child.children) : ''}
          </p>
        )
      } else if (child.tagName === 'blockquote') {
        // Render blockquote content
        elements.push(
          <blockquote key={i}>
            {child.children ? renderSidenoteAst(child.children) : ''}
          </blockquote>
        )
      } else if (child.tagName === 'strong') {
        elements.push(
          <strong key={i}>
            {child.children ? renderSidenoteAst(child.children) : ''}
          </strong>
        )
      } else if (child.tagName === 'em') {
        elements.push(
          <em key={i}>
            {child.children ? renderSidenoteAst(child.children) : ''}
          </em>
        )
      } else if (child.children) {
        // Generic element with children
        elements.push(
          <span key={i}>
            {renderSidenoteAst(child.children)}
          </span>
        )
      }
    }
  }
  
  return elements
}

const Sidenotes: QuartzComponent = ({ fileData, allFiles, tree, cfg }: QuartzComponentProps) => {
  const options = { 
    ...defaultOptions, 
    ...(cfg as any)?.sidenotes,
    ...(fileData.frontmatter as any)?.["sidenote-config"]
  }
  
  if (!options.enabled || !tree || !allFiles || !fileData.slug) {
    return null
  }

  const blockRefs = extractBlockReferences(tree as Root)
  const sidenotes = organizeSidenotes(blockRefs, allFiles, fileData.slug, options.forceRightOnly)

  if (sidenotes.length === 0) {
    return null
  }

  // Group sidenotes by side
  const leftSidenotes = sidenotes.filter(s => s.side === "left").sort((a, b) => a.position - b.position)
  const rightSidenotes = sidenotes.filter(s => s.side === "right").sort((a, b) => a.position - b.position)

  const renderSidenote = (sidenote: SidenoteData, index: number) => {
    const note = sidenote.referencingNotes[0] // Each sidenote has one note
    const noteUrl = resolveRelative(fileData.slug!, note.slug!)
    
    return (
      <div 
        key={`${sidenote.blockId}-${index}`}
        class={`sidenote-tile ${options.tileStyle}`}
        data-block-id={sidenote.blockId}
        data-side={sidenote.side}
        style={{ maxHeight: options.maxTileHeight }}
      >
        <div class="sidenote-header">
          <a href={noteUrl} class="sidenote-title">
            {note.frontmatter?.title || note.slug}
          </a>
        </div>
        <div class="sidenote-content">
          {renderSidenoteContent(note)}
        </div>
      </div>
    )
  }

  return (
    <div class="sidenotes-container">
      {/* Left sidebar */}
      {leftSidenotes.length > 0 && (
        <div class="sidenotes-left" data-display-class="desktop-only">
          <div class="sidenotes-stack">
            {leftSidenotes.map(renderSidenote)}
          </div>
        </div>
      )}
      
      {/* Right sidebar */}
      {rightSidenotes.length > 0 && (
        <div class="sidenotes-right" data-display-class="desktop-only">
          <div class="sidenotes-stack">
            {rightSidenotes.map(renderSidenote)}
          </div>
        </div>
      )}
    </div>
  )
}

Sidenotes.css = style
Sidenotes.afterDOMLoaded = script

export default ((opts?: Partial<SidenotesOptions>) => {
  const options = { ...defaultOptions, ...opts }
  const WrappedSidenotes: QuartzComponent = (props: QuartzComponentProps) => {
    if (!options.showSidenotes?.(props.fileData)) {
      return null
    }

    return <Sidenotes {...props} />
  }

  WrappedSidenotes.css = Sidenotes.css
  WrappedSidenotes.afterDOMLoaded = Sidenotes.afterDOMLoaded

  return WrappedSidenotes
}) satisfies QuartzComponentConstructor<Partial<SidenotesOptions>>