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
}

const defaultOptions: SidenotesOptions = {
  enabled: true,
  maxTileHeight: "200px",
  tileStyle: "card", 
  showOnMobile: false,
  forceRightOnly: false,
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
  let totalElements = 0

  console.log(`[Sidenotes] Starting block reference extraction`)
  console.log(`[Sidenotes] Tree type:`, tree.type)
  console.log(`[Sidenotes] Tree children count:`, tree.children?.length)

  visit(tree, "element", (node: Element) => {
    totalElements++
    position++
    
    if (node.type === "element") {
      // Log every element we visit for debugging
      if (totalElements <= 20) { // Only log first 20 to avoid spam
        console.log(`[Sidenotes] Element ${totalElements}:`, {
          tagName: node.tagName,
          properties: node.properties,
          hasId: !!node.properties?.id,
          idValue: node.properties?.id
        })
      }
      
      // Look for elements with id attributes that look like block references
      if (node.properties?.id && typeof node.properties.id === "string") {
        const blockId = node.properties.id as string
        console.log(`[Sidenotes] Found element with ID "${blockId}" on tag <${node.tagName}>`)
        
        // Check if this looks like a block reference (alphanumeric, dashes, underscores)
        if (/^[a-zA-Z0-9-_]+$/.test(blockId)) {
          console.log(`[Sidenotes] Block ID "${blockId}" matches pattern, adding to block references`)
          blockRefs.push({
            blockId,
            element: node,
            position
          })
        } else {
          console.log(`[Sidenotes] Block ID "${blockId}" does not match pattern`)
        }
      }
    }
  })

  console.log(`[Sidenotes] Visited ${totalElements} total elements`)
  console.log(`[Sidenotes] Found ${blockRefs.length} block references:`, blockRefs.map(b => b.blockId))
  return blockRefs
}

function findReferencingNotes(blockId: string, currentSlug: FullSlug, allFiles: QuartzPluginData[]): QuartzPluginData[] {
  console.log(`[Sidenotes] Looking for notes referencing block "${blockId}" in file "${currentSlug}"`)
  
  const referencingNotes: QuartzPluginData[] = []
  
  for (const file of allFiles) {
    if (file.slug === currentSlug) continue // Don't include self-references
    
    // Only include notes with type: zettel in their frontmatter
    if (file.frontmatter?.type !== 'zettel') {
      continue
    }
    
    // Search the htmlAst for link elements that reference our exact block
    if (file.htmlAst && file.htmlAst.children) {
      let foundBlockReference = false
      
      const searchForBlockLinks = (node: any): void => {
        if (node.type === 'element' && node.tagName === 'a' && node.properties?.href) {
          const href = node.properties.href as string
          const dataSlug = node.properties['data-slug'] as string
          
          // Check if this link points to our current file with the EXACT block ID
          // href format: './Sample-Text#203341' or similar
          // Use a more precise regex to match the exact block ID at the end of the href
          const blockPattern = new RegExp(`#${blockId}$`)
          if (blockPattern.test(href)) {
            // Normalize the data-slug and current slug for comparison
            const normalizedDataSlug = dataSlug?.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
            const normalizedCurrentSlug = currentSlug.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
            
            if (normalizedDataSlug === normalizedCurrentSlug || dataSlug === currentSlug) {
              console.log(`[Sidenotes] Found exact block reference link in zettel "${file.slug}": href="${href}", dataSlug="${dataSlug}"`)
              foundBlockReference = true
              return
            }
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
  
  console.log(`[Sidenotes] Found ${referencingNotes.length} referencing zettel notes for block "${blockId}"`)
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
        
        console.log(`[Sidenotes] Tag link found: text="${child.children?.[0]?.value}", href="${child.properties?.href}", extracted="${fullTag}"`)
        
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

  // Debug logging for all files to understand patterns
  console.log(`[Sidenotes] Processing file: "${fileData.slug}"`)
  console.log(`[Sidenotes] File title: "${fileData.frontmatter?.title}"`)
  console.log(`[Sidenotes] Tree type: ${tree.type}, children: ${(tree as Root).children?.length || 0}`)
  
  // Special debug for sample-text
  if (fileData.slug === 'sample-text') {
    console.log(`[Sidenotes] *** SAMPLE-TEXT DETAILED DEBUG ***`)
    console.log(`[Sidenotes] Tree:`, tree)
    console.log(`[Sidenotes] Tree children:`, (tree as Root).children)
    if ((tree as Root).children && (tree as Root).children.length > 0) {
      console.log(`[Sidenotes] First few children:`, (tree as Root).children.slice(0, 5))
    }
  }

  const blockRefs = extractBlockReferences(tree as Root)
  console.log(`[Sidenotes] Found ${blockRefs.length} block references:`, blockRefs.map(b => b.blockId))
  
  const sidenotes = organizeSidenotes(blockRefs, allFiles, fileData.slug, options.forceRightOnly)
  console.log(`[Sidenotes] Generated ${sidenotes.length} sidenotes`)
  
  if (sidenotes.length === 0) {
    console.log(`[Sidenotes] No sidenotes to display for ${fileData.slug}`)
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
  return Sidenotes
}) satisfies QuartzComponentConstructor 