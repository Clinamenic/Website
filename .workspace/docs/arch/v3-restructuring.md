# v3.0.0 Architecture Restructuring

**Date:** 2025-10-15  
**Version:** 3.0.0  
**Type:** Breaking Change - Repository Restructuring

## Overview

Version 3.0.0 represents a fundamental architectural shift in the repository structure, transforming custom-quartz from a build-focused repository to a content-focused editing workspace that integrates seamlessly with Obsidian and other markdown editors.

## Key Architectural Changes

### 1. Content Location: content/ → root

**Before (v1.x-2.x):**
```
custom-quartz/
├── content/
│   ├── index.md
│   ├── about.md
│   ├── writing/
│   └── zettelgarten/
└── quartz/
    └── [framework files]
```

**After (v3.0.0):**
```
custom-quartz/
├── index.md
├── about.md
├── writing/
├── zettelgarten/
└── .quartz/
    └── [framework files]
```

**Rationale:**
- Enables direct editing in Obsidian without nested content/ directory
- Simplifies content management and file navigation
- Aligns with standard markdown vault structure
- Improves developer experience when working with content

### 2. Quartz Framework: quartz/ → .quartz/

**Before:** Quartz framework lived in `quartz/` directory at repository root

**After:** Quartz framework moved to `.quartz/` (hidden, gitignored)

**Rationale:**
- Separates build infrastructure from content
- Keeps framework out of content navigation in editors
- Follows dotfile convention for tool-specific directories
- Reduces clutter in file explorers and Obsidian sidebar
- Framework is now gitignored - treated as local build tool

### 3. Package.json Simplification

**Before:** Full package.json with 100+ dependencies

**After:** Minimal wrapper package.json
```json
{
  "name": "website",
  "version": "3.0.0",
  "scripts": {
    "build": "cd .quartz && npm run build",
    "serve": "cd .quartz && npm run serve",
    "quartz": "cd .quartz && tsx ./quartz/bootstrap-cli.mjs"
  }
}
```

**Rationale:**
- Repository focuses on content, not build tooling
- Dependencies managed in .quartz/package.json
- Cleaner git history without node_modules noise
- Faster clones and content-focused commits

## Repository Role Clarification

### custom-quartz (v3.0.0)
- **Purpose:** Content development and editing workspace
- **Primary tools:** Obsidian, markdown editors, text editors
- **Git focus:** Content changes, writing, notes
- **Structure:** Flat, Obsidian-friendly
- **Framework:** Local installation in .quartz/ (gitignored)

### website (separate repo)
- **Purpose:** Build and deployment environment
- **Primary tools:** Node.js, npm, Quartz build system
- **Git focus:** Build configuration, framework customizations
- **Structure:** content/ subdirectory + build infrastructure
- **Framework:** Committed in quartz/ directory

## Migration Impact

### Breaking Changes

1. **Repository Structure:** Complete reorganization
2. **Git History:** Content files moved from content/ to root
3. **Build Process:** Framework accessed via .quartz/ instead of quartz/
4. **Dependencies:** No longer tracked in repository root

### Compatibility

- **Obsidian:** Fully compatible, improved integration
- **Content:** No changes to markdown files themselves
- **Build:** Requires .quartz/ setup for local builds
- **Deployment:** Separate website repository handles deployment

## Setup Requirements

### For Content Editing (custom-quartz)
1. Clone repository
2. Open in Obsidian or preferred markdown editor
3. Edit content files directly at root
4. Commit and push content changes

### For Building (optional)
1. Install Quartz in .quartz/ directory
2. Run `npm run build` to build site
3. Run `npm run serve` to preview locally

### For Deployment (website repo)
1. Sync content from custom-quartz to website/content/
2. Build in website repository
3. Deploy from website repository

## Benefits

1. **Improved Content Workflow:**
   - Direct editing without nested directories
   - Better Obsidian integration
   - Cleaner file structure
   - Faster navigation

2. **Clearer Separation of Concerns:**
   - Content development vs. build/deployment
   - Writing focus vs. technical focus
   - Version control clarity

3. **Better Developer Experience:**
   - Reduced cognitive load
   - Clear repository purpose
   - Simpler git history
   - Faster operations

4. **Maintainability:**
   - Framework updates don't pollute content history
   - Content changes isolated from build changes
   - Easier collaboration on writing
   - Independent version control strategies

## Technical Implementation

### File Moves
- All content files: `content/* → *`
- Framework: `quartz/ → .quartz/`
- Package files: Simplified at root

### Gitignore Updates
- Added: `.quartz/`, `node_modules/`, `public/`
- Content files: Tracked at root level

### Script Updates
- `npm run build`: Points to `.quartz/`
- `npm run serve`: Points to `.quartz/`
- `npm run quartz`: CLI access via `.quartz/`

## Future Considerations

1. **Content Sync:** Established workflow to sync to website repository
2. **Framework Updates:** Local .quartz/ installation can be updated independently
3. **Collaboration:** Multiple editors can work on content without framework concerns
4. **Backup:** Content-focused commits make backup and versioning clearer

## Related Documentation

- [Custom-Quartz to Website Sync Plan](../temp/2025-10-15-custom-quartz-to-website-sync.md)
- [Quartz Architecture](../ref/quartz/quartz-architecture.md)

