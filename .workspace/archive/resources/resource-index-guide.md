# GFEL Resource Indexing Guide

This document describes the pipeline for managing and displaying resource tiles across the GFEL digital garden.

## Overview

The resource indexing system allows for dynamic display of curated resources across any page in the digital garden. The system consists of three main components:

1. **URL Processing** (`url_processor.py`)

   - Reads URLs from `resource-input.md`
   - Processes each URL to extract metadata (title, description, banner image)
   - Stores entries in `dashboard.json`
   - Preserves existing entries and tags
   - Only processes new URLs not already in the dashboard
   - Assigns unique 5-digit IDs (e.g., "00001") to each entry

2. **Dashboard Storage** (`dashboard.json`)

   - Central storage for all resource metadata
   - Each entry contains:
     - `entryID`: Unique 5-digit identifier (e.g., "00001")
     - `url`: Resource URL
     - `title`: Resource title
     - `description`: Resource description
     - `banner`: Banner image URL (or null)
     - `status`: Resource status
     - `tags`: Array of freeform tags

3. **Dynamic Display** (`dashboardTiles.ts` transformer)
   - Transforms tile placeholders into full HTML during site build
   - Supports both standalone tiles and tile grids
   - Automatically styles tiles with CSS grid layout
   - Handles hover effects and responsive design

## Usage

### Adding New Resources

1. Add URLs to `resource-input.md`, one per line:

   ```
   https://example.com/resource1
   https://example.com/resource2
   ```

2. Run the URL processor:
   ```bash
   python3 url_processor.py
   ```

### Displaying Resources

To display resource tiles in any markdown file, you have two options:

1. **Single Tile**:

   ```html
   <div class="project-tile" data-entry-id="00001"></div>
   ```

2. **Grid of Tiles**:
   ```html
   <div class="dashboard-tiles">
     <div class="project-tile" data-entry-id="00001"></div>
     <div class="project-tile" data-entry-id="00002"></div>
     <div class="project-tile" data-entry-id="00003"></div>
   </div>
   ```

The transformer will automatically:

- Find these placeholders in any markdown file
- Look up the corresponding entries in dashboard.json
- Replace the placeholders with full HTML including title, description, and banner image

### Tile Styling

Tiles are styled using CSS with:

- Responsive grid layout
- Hover effects showing description
- Banner images with fallback colors
- Title overlays
- Smooth transitions

## File Locations

- `/internal/resources/`

  - `resource-input.md` - Input URLs
  - `dashboard.json` - Resource metadata
  - `url_processor.py` - URL processing script
  - `resource-index-guide.md` - This documentation

- `/quartz/plugins/transformers/`

  - `dashboardTiles.ts` - Transformer plugin

- `/quartz/styles/`
  - `custom.scss` - Tile styling

## Technical Details

### URL Processing

The URL processor:

1. Reads URLs from resource-input.md
2. For each new URL:
   - Fetches the webpage
   - Extracts metadata (title, description, banner)
   - Generates a unique ID
   - Adds entry to dashboard.json

### Transformer Plugin

The transformer:

1. Loads dashboard.json at build time
2. Finds tile placeholders in markdown files
3. Looks up entries by ID
4. Generates HTML for each tile
5. Preserves grid structure when multiple tiles are used

### CSS Structure

The styling uses:

```scss
.dashboard-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.project-tile {
  position: relative;
  aspect-ratio: 3/2;
  // ... hover effects and transitions
}
```

## Development Notes

- The system is non-destructive - existing entries and tags are preserved
- Resource tiles can be placed anywhere in the digital garden
- The transformer runs at build time, ensuring fast page loads
- CSS is optimized for responsive layouts
- Hover effects provide a clean way to show additional information
