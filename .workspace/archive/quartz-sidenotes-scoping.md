# Quartz Sidenotes Component - Scoping Document

**Project**: Quartz TypeScript component for academic sidenotes in zettelkasten
**Date**: December 2024
**Status**: Initial scoping

---

## Project Overview

### Goal

Create a TypeScript component for Quartz that enables display of academic text (e.g., Keynes' General Theory) with related zettelkasten notes appearing as sidenotes alongside specific text blocks.

### Context

- **Existing System**: Sophisticated zettelkasten with 85+ systematically named notes on Keynes' General Theory
- **Current Structure**: Hub document with detailed cross-references, mathematical equations, and extensive linking
- **Target Use Case**: Display source material with contextual annotations in sidebar format
- **Platform**: Quartz-based static site generator

---

## Requirements Analysis

### Core Functionality

1. **Automatic Block Detection**: Scan content for block reference markers (`^blockid`)
2. **Backlink Integration**: Use Quartz's existing backlink system to find referencing notes
3. **Sidebar Positioning**: Display referencing notes as tiles adjacent to their target blocks
4. **Multiple Note Handling**: Stack or group multiple notes referencing the same block
5. **Mobile Responsiveness**: Graceful degradation to expandable footnotes on smaller screens

### Content Integration

- **Source Material**: Full text of academic works (e.g., Keynes' General Theory chapters)
- **Note References**: Integration with existing note naming conventions (`r-JK-GT-###`)
- **Hub Compatibility**: Work seamlessly with existing hub structure
- **Link Preservation**: Maintain existing internal linking system

### User Experience

- **Non-intrusive**: Notes appear alongside text without disrupting reading flow
- **Contextual**: Clear visual connection between text and related notes
- **Navigable**: Easy movement between sidenotes and main content
- **Accessible**: Screen reader compatible and keyboard navigable

---

## Technical Architecture

### Component Structure

Based on Quartz's architecture, the sidenotes component will follow the standard Quartz component pattern:

```quartz/components/
├── Sidenotes.tsx                   # Main component file with JSX and logic
└── styles/
    └── sidenotes.scss              # Component-specific styling
```

**Component File Structure** (`Sidenotes.tsx`):

```typescript
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/sidenotes.scss"
// @ts-ignore
import script from "./scripts/sidenotes.inline"

interface SidenotesOptions {
  displayMode?: "full" | "summary" | "excerpt"
  maxWidth?: string
  position?: "right" | "left" | "auto"
}

const Sidenotes: QuartzComponent = ({ fileData, displayClass, cfg }: QuartzComponentProps) => {
  // Component implementation
}

Sidenotes.css = style
Sidenotes.afterDOMLoaded = script

export default ((opts?: Partial<SidenotesOptions>) => {
  return Sidenotes
}) satisfies QuartzComponentConstructor
```

**Integration Method**:

- Component registers as a Quartz transformer plugin to process markdown
- CSS and JavaScript automatically bundled by Quartz build system
- No separate utility files needed - all logic contained in single tsx file

### Data Flow

1. **Content Parsing**: Extract sidenote markers from markdown
2. **Note Resolution**: Map markers to actual note content
3. **Layout Calculation**: Position sidenotes relative to text
4. **Responsive Handling**: Adapt layout for different screen sizes

### Integration Points

- **Quartz Component System**: Register as standard `QuartzComponent` with constructor pattern
- **Transformer Plugin**: Create accompanying `QuartzTransformerPlugin` for markdown processing
- **File Resolution**: Use Quartz's existing file system access via `BuildCtx` and `QuartzPluginData`
- **Styling Integration**: Leverage Quartz's SCSS bundling system (`component.css = style`)
- **Script Integration**: Use Quartz's script loading system (`component.afterDOMLoaded = script`)
- **Layout System**: Integrate with existing `FullPageLayout` positioning (likely in `right` sidebar)

---

## Research-Based Design Decisions

### Implementation Approach

**Selected**: JavaScript-enhanced CSS solution
**Rationale**:

- Better than pure CSS for complex layouts and overlap handling
- More maintainable than heavy JavaScript frameworks
- Enables dynamic content loading and positioning

### Reference Implementations

1. **Tufte-CSS**: Right-aligned layout inspiration
2. **sidenotes.js**: Overlap detection and positioning logic
3. **Obsidian plugins**: Markdown integration patterns

### Layout Strategy

- **Desktop**: Right-aligned sidebar with connecting lines
- **Tablet**: Collapsible side panel
- **Mobile**: Expandable footnote-style popups

---

## Content Modeling

### Automatic Block Reference Detection

The sidenotes component will automatically detect and display notes that reference specific text blocks, leveraging Quartz's existing block reference system:

**Source Text with Block ID** (`sample-text.md`):

```markdown
...final paragraph of text that ends with a block reference. ^203341

Next paragraph continues here.
```

**Note Referencing Block** (`sample-note.md`):

```markdown
---
title: Sample Note
---

[[Sample Text#^203341]]

This is a sample note that references the specific block above.
```

**Result**: The note automatically appears as a sidebar tile next to the referenced block.

### Detection Logic

1. **Block ID Parsing**: Scan content for block reference markers (`^blockid`)
2. **Backlink Resolution**: Use Quartz's existing backlink system to find notes referencing each block
3. **Automatic Positioning**: Display referencing notes as sidebar tiles adjacent to their target blocks
4. **Multiple References**: Handle multiple notes referencing the same block (stack/group them)

### Integration with Existing Systems

- **Leverages Quartz Backlinks**: Uses existing `fileData.links` and backlink processing
- **No New Syntax**: Works with current `[[note#^block]]` reference system
- **Preserves Functionality**: Existing block references continue to work as clickable links
- **Zero Configuration**: No manual sidenote markup required

### Note Resolution and Display

- **Block-to-Note Mapping**: Automatically map `^blockid` markers to notes containing `[[filename#^blockid]]` references
- **Content Extraction**: Display note title and content (configurable: full, summary, or excerpt)
- **Link Preservation**: Maintain clickable functionality of existing block references
- **Tile Formatting**: Present notes as compact sidebar tiles with consistent styling

### Configuration Options

```yaml
---
sidenote-config:
  display-mode: "full" | "summary" | "excerpt"  # How much note content to show
  max-width: "300px"                           # Sidebar tile width
  position: "right" | "left" | "auto"          # Sidebar positioning
  show-empty-blocks: false                     # Show blocks with no referencing notes
  tile-style: "card" | "minimal"               # Visual presentation
---
```

---

## Implementation Phases

### Phase 1: Core Component (Week 1-2)

- [ ] Basic TypeScript component structure
- [ ] Block ID detection in content
- [ ] Backlink analysis and note resolution
- [ ] Basic CSS layout (right-aligned tiles)

### Phase 2: Dynamic Features (Week 3-4)

- [ ] Multiple note handling (stacking/grouping)
- [ ] Positioning logic and overflow handling
- [ ] Mobile responsive behavior
- [ ] Quartz plugin integration

### Phase 3: Advanced Features (Week 5-6)

- [ ] Configuration options and customization
- [ ] Performance optimization
- [ ] Accessibility enhancements
- [ ] Visual polish and animations

### Phase 4: Polish & Testing (Week 7-8)

- [ ] Comprehensive testing with real content
- [ ] Documentation and examples
- [ ] Performance benchmarking
- [ ] User feedback integration

---

## Technical Specifications

### Dependencies

- **Required**: Preact/TypeScript (Quartz framework), QuartzComponent types
- **Styling**: SCSS with Quartz's existing style system and bundling
- **Parsing**: Unified/remark plugins (integrated with Quartz transformer system)
- **Optional**: Intersection Observer API for advanced positioning
- **File Access**: Quartz's `BuildCtx` and `QuartzPluginData` for note resolution

### Browser Support

- **Modern**: Chrome 80+, Firefox 75+, Safari 14+, Edge 80+
- **Fallback**: Notes appear as inline footnotes on unsupported browsers

### Performance Targets

- **Load Time**: <100ms additional overhead
- **Memory**: <2MB additional footprint for typical page
- **Rendering**: Smooth scrolling with up to 50 sidenotes per page

---

## Content Integration Strategy

### Existing Block Reference System

```markdown
This is important text that should be referenced. ^203341

[[Sample Text#^203341]] ← Note referencing the block
```

### Automatic Sidenote Result

- Block `^203341` automatically gets sidebar tile with referencing note
- No changes to existing content structure required
- Maintains all current link functionality

### Keynes Example Integration

```markdown
The equation $U = A_1 + (G' - B') - G$ represents user cost. ^user-cost-eq

# In a separate note:

[[General Theory Analysis#^user-cost-eq]]
This equation demonstrates Keynes' fundamental approach to...
```

---

## Risk Assessment

### Technical Risks

- **Performance**: Processing many block references could impact page load
- **Complexity**: Positioning logic may be challenging across devices
- **Maintenance**: Changes to Quartz's backlink system could affect functionality

### Content Risks

- **Block ID Conflicts**: Duplicate block IDs across different files
- **Backlink Processing**: Heavy reliance on Quartz's existing systems
- **Scalability**: Performance with large numbers of block references

### Mitigation Strategies

- Leverage existing Quartz systems rather than reinventing
- Progressive enhancement approach
- Comprehensive testing with real content
- Clear documentation of dependencies

---

## Success Metrics

### Functional Metrics

- [ ] 100% accurate block-to-note mapping
- [ ] <2s page load time with 20+ sidenotes
- [ ] Zero layout shift during sidenote rendering
- [ ] Full accessibility compliance (WCAG 2.1 AA)

### User Experience Metrics

- [ ] Seamless reading flow (no jarring interruptions)
- [ ] Intuitive visual connection between blocks and notes
- [ ] Consistent behavior across device sizes
- [ ] Positive feedback from beta testing

### Content Integration Metrics

- [ ] All existing block references work correctly
- [ ] No disruption to current linking functionality
- [ ] Mathematical equations render correctly in sidenotes
- [ ] Zero migration effort required

---

## Next Steps

1. **Review & Refine**: Iterate on this scoping document based on feedback
2. **Prototype**: Create minimal viable version with basic functionality
3. **Test Integration**: Verify compatibility with existing Quartz setup
4. **Implementation**: Begin Phase 1 development

---

## Questions for Consideration

1. Should sidenotes auto-appear or require hover/click interaction?
2. How should overlapping sidenotes be handled (stack, offset, or compress)?
3. What's the preferred fallback behavior for mobile devices?
4. Should the component support multiple notes per block (grouped or individual tiles)?
5. How should very long notes be handled (truncate, scroll, or modal)?

---

_This document serves as the foundation for developing an elegant, automatic sidenotes component that enhances the existing zettelkasten workflow by leveraging Quartz's existing block reference system without requiring any content changes._

### Interaction Design

**Visibility**: Sidenotes are always visible alongside their referenced blocks
**Hover Behavior**: When user hovers over a sidenote tile, the referenced block in the main text is highlighted
**Multiple Notes**: When multiple notes reference the same block, stack them vertically as separate tiles
**Content Display**: Tiles have limited height with scrollable content (similar to Quartz's popover windows)
**Performance**: Show all sidenotes immediately when page loads

### Tile Specifications

**Height Management**:

- Maximum tile height (e.g., 200px) with scrollable overflow
- Follow Quartz's existing popover styling patterns for consistency
- Maintain readability while preventing excessive vertical space usage

**Stacking Behavior**:

- Multiple notes for same block appear as separate tiles
- Vertical stacking with consistent spacing
- Clear visual association with their target block

**Highlighting System**:

- Hover over sidenote → highlight corresponding block in main text
- Visual feedback to show connection between note and referenced content
- Smooth transitions for professional feel

### Layout Integration

**Bilateral Sidebar System**:

- Component occupies both left and right sidebars
- Notes alternate placement: 1st note → left, 2nd note → right, 3rd note → left, etc.
- Creates balanced visual layout with notes flanking the referenced content
- Each sidebar maintains its own vertical stack for multiple blocks

**Placement Algorithm**:

```
Block with N referencing notes:
- Note 1: Left sidebar
- Note 2: Right sidebar
- Note 3: Left sidebar
- Note 4: Right sidebar
- ... (continues alternating)
```

**Integration with Existing Layout**:

- Replaces or extends existing left/right sidebar components when sidenotes are present
- Maintains compatibility with other Quartz components (TOC, Explorer, etc.)
- Responsive behavior: Falls back to single column on mobile devices

### Configuration Architecture

**Global Defaults** (site-wide settings):

```yaml
# quartz.config.ts or similar
sidenotes: { enabled: true, maxTileHeight: "200px", tileStyle: "card", showOnMobile: false }
```

**Page-Level Overrides** (frontmatter):

```yaml
---
sidenote-config:
  enabled: true
  max-tile-height: "300px" # Override global setting
  tile-style: "minimal" # Override global setting
  force-right-only: false # Override bilateral behavior if needed
---
```
