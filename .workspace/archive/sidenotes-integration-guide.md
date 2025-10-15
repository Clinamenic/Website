# Sidenotes Component Integration Guide

This guide explains how to integrate the newly created Sidenotes component into your Quartz site.

## Component Files Created

- `quartz/components/Sidenotes.tsx` - Main component logic
- `quartz/components/styles/sidenotes.scss` - Styling
- `quartz/components/scripts/sidenotes.inline.ts` - Interactive behavior

## Integration Steps

### 1. Add to Layout Configuration

Add the Sidenotes component to your Quartz layout configuration (typically in `quartz.layout.ts`):

```typescript
import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// Add to shared or page layout
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  footer: Component.Footer({
    links: {
      // your footer links
    },
  }),
}

export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.Breadcrumbs(),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Search(),
    Component.Darkmode(),
    Component.DesktopOnly(Component.Explorer()),
  ],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    Component.Sidenotes(), // Add here for bilateral sidebar layout
  ],
}
```

### 2. Global Configuration

Configure sidenotes globally in your `quartz.config.ts`:

```typescript
import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    // ... other config
    sidenotes: {
      enabled: true,
      maxTileHeight: "200px",
      tileStyle: "card",
      showOnMobile: false,
      forceRightOnly: false,
    },
  },
  plugins: {
    // ... your existing plugins
  },
}

export default config
```

### 3. Page-Level Configuration

Override sidenotes settings for individual pages using frontmatter:

```yaml
---
title: "Your Page Title"
sidenote-config:
  enabled: true
  max-tile-height: "300px"
  tile-style: "minimal"
  force-right-only: false
---
```

## Usage

### 1. Create Block References

Add block references to your content using the `^blockid` syntax:

```markdown
This is a paragraph with important content that I want to annotate. ^important-paragraph

This is another paragraph with a different block reference. ^another-block
```

### 2. Reference Blocks from Notes

Create notes that reference specific blocks:

```markdown
---
title: "My Analysis Note"
---

[[Your Page#^important-paragraph]]

This note provides additional context about the important paragraph.
It will automatically appear as a sidenote next to the referenced block.
```

## Features

### Automatic Detection

- Scans content for block reference markers (`^blockid`)
- Uses Quartz's existing backlink system to find referencing notes
- No manual sidenote markup required

### Bilateral Layout

- First note referencing a block → left sidebar
- Second note → right sidebar
- Additional notes alternate left/right
- Creates balanced visual layout

### Interactive Behavior

- Hover over sidenote → highlights referenced block
- Smooth scrolling to referenced content if not visible
- Always-visible sidenotes (not toggle-based)

### Responsive Design

- Desktop: Full bilateral layout
- Smaller screens: Right sidebar only
- Mobile: Hidden (can be extended to show footnotes)

## Styling Options

### Card Style (Default)

```scss
.sidenote-tile.card {
  padding: 12px;
  background: var(--light);
  border: 1px solid var(--lightgray);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
```

### Minimal Style

```scss
.sidenote-tile.minimal {
  padding: 8px;
  background: transparent;
  border: 1px solid var(--lightgray);
  box-shadow: none;
}
```

## Custom CSS Variables

The component uses Quartz's existing CSS variables:

- `--light` / `--dark` - Background colors
- `--gray` / `--darkgray` - Text colors
- `--lightgray` - Border colors
- `--secondary` - Accent colors
- `--highlight` - Highlight color for referenced blocks

## Troubleshooting

### Sidenotes Not Appearing

1. Check that block references use correct syntax: `^blockid`
2. Verify referencing notes contain `[[filename#^blockid]]` links
3. Ensure component is added to layout configuration
4. Check browser console for JavaScript errors

### Positioning Issues

1. Verify CSS variables are properly imported
2. Check for conflicting CSS rules
3. Ensure `position: fixed` elements don't interfere

### Performance Considerations

- Component only processes pages with block references
- JavaScript uses throttled scroll handlers (16ms/60fps)
- Minimal DOM queries with efficient caching

## Example Implementation

See `content/sample-text.md` and `content/sample-note.md` for working examples of the block reference system.
