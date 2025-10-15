# Quartz Framework Migration Plan

## Overview

Migration from traditional Quartz structure (in `/website`) to new subdirectory structure (in `/custom-quartz`) where Quartz framework resides in `.quartz/` subdirectory instead of root.

**Source:** `/Users/gideon/Hub/public/website`  
**Target:** `/Users/gideon/Desktop/custom-quartz`

## Structural Changes

### Old Structure (website/)
```
website/
├── quartz/               # Quartz framework
├── content/              # Content files
├── quartz.config.ts      # Config at root
├── quartz.layout.ts      # Layout at root
└── package.json          # Dependencies at root
```

### New Structure (custom-quartz/)
```
custom-quartz/
├── .quartz/              # Quartz framework (isolated)
│   ├── quartz/           # Core framework
│   ├── quartz.config.ts  # Config in .quartz/
│   ├── quartz.layout.ts  # Layout in .quartz/
│   └── package.json      # Framework dependencies
├── content/              # Content files (at root)
└── package.json          # Minimal wrapper scripts
```

## Migration Status

### ✅ Already Migrated

1. **Core Components** (all custom components transferred)
   - ArticleSubtitle.tsx
   - ArticleTitle.tsx
   - ArweaveIndex.tsx
   - AuthorName.tsx
   - Banner.tsx
   - CitationGenerator.tsx (with CitationHelpers.ts, CitationStyles.ts, CitationExports.ts)
   - DownloadMarkdown.tsx
   - FlexContainer.tsx
   - FlexContainer2.tsx
   - ImageModal.tsx
   - LicenseInfo.tsx
   - PublishDate.tsx
   - Sidenotes.tsx

2. **Component Styles**
   - All custom SCSS files in `quartz/components/styles/`
   - Custom CSS (giscusCustom.css)

3. **Component Scripts**
   - All inline scripts in `quartz/components/scripts/`

4. **Plugins**
   - All transformers, filters, and emitters
   - Custom citations plugin

5. **Core Styles**
   - base.scss
   - callouts.scss
   - custom.scss
   - syntax.scss
   - variables.scss

6. **Utilities**
   - All utility files in `quartz/util/`

7. **Configuration Files**
   - quartz.config.ts (copied to .quartz/)
   - quartz.layout.ts (copied to .quartz/)

### ✅ Fixed Issues

#### 1. Missing Dependencies (FIXED)
**Issue:** Missing `chalk` package causing module not found error

**Solution Applied:** ✅ Added missing dependencies to `.quartz/package.json`:
- chalk ^5.3.0
- arweave ^1.15.5
- @types/react ^18.3.5
- @types/react-dom ^18.3.0
- react ^18.3.1
- react-dom ^18.3.1
- rimraf ^6.0.1
- @types/cytoscape ^3.21.7
- @types/d3-force ^3.0.10
- glob ^10.3.10

**Status:** ✅ Dependencies installed successfully with `npm install`

#### 2. Bibliography Path (FIXED)
**Issue:** Bibliography file path incorrect after moving config to `.quartz/` subdirectory

**Solution Applied:** ✅ 
- Created `bibliography.bib` at root of custom-quartz
- Updated path in `quartz.config.ts` from `./bibliography.bib` to `../bibliography.bib`

**Status:** ✅ Build now processes files without bibliography errors

#### 3. File Watcher Issue (FIXED)
**Issue:** `EMFILE: too many open files` error on macOS when running serve

**Root Cause:** Chokidar watching all files including node_modules (thousands of files)

**Solution Applied:** ✅ Added ignore patterns to chokidar config in `handlers.js`:
- Ignoring `**/node_modules/**`
- Ignoring `**/.git/**`

**Status:** ✅ File watcher now excludes problematic directories

### ❌ Remaining Tasks

#### 1. Content Migration
**Status:** Content files need to be copied/linked from website to custom-quartz

**Source Content:** `/Users/gideon/Hub/public/website/content/`  
**Target Location:** `/Users/gideon/Desktop/custom-quartz/content/` (or root)

**Content Structure:**
- about.md
- design.md
- gallery.md
- index.md
- projects/ (Autoglypha.md, Jasper.md, Runique.md)
- resources/ (multiple files and subdirectories)
- services.md
- typography.md
- writing/ (39 files)
- zettelgarten/ (127 files in r/ subdirectory)
- robots.txt
- service.xml

#### 3. Static Assets
**Status:** Need to verify if static assets are properly configured

**Files to Check:**
- Images in content
- Custom fonts
- Any static files referenced by components

#### 4. Configuration Alignment
**Status:** Need to verify config files point to correct paths

**Files to Review:**
- bibliography.bib location (referenced in quartz.config.ts)
- Content directory path
- Output directory path (currently set to `public`)

### 🔄 Migration Steps

#### Phase 1: Fix Critical Dependencies ✅ COMPLETED
1. ✅ Add missing dependencies to `.quartz/package.json`
   - Added chalk ^5.3.0
   - Added other missing packages from website/package.json
2. ✅ Run `npm install` in `.quartz/` directory
3. ✅ Fix bibliography path (./bibliography.bib → ../bibliography.bib)
4. ✅ Fix file watcher to exclude node_modules
5. ✅ Test build/serve commands - SERVER RUNNING SUCCESSFULLY

#### Phase 2: Content Migration
1. Copy or symlink content directory
2. Copy bibliography.bib if used
3. Verify CNAME if deploying to custom domain
4. Copy any other root-level content files

#### Phase 3: Configuration Verification
1. Update paths in quartz.config.ts if needed
2. Verify plugin configurations
3. Test all custom components
4. Verify static asset paths

#### Phase 4: Testing
1. Test local build: `npm run build`
2. Test local serve: `npm run serve`
3. Verify all pages render correctly
4. Check custom components functionality:
   - Citation generator
   - License info
   - Arweave index
   - Download markdown
   - Image modal
   - Sidenotes
5. Verify styling matches original

#### Phase 5: Documentation
1. Document new structure in README
2. Update build/deployment scripts
3. Document custom components usage

## Custom Components Reference

### Layout Configuration (quartz.layout.ts)

**Shared Components:**
- Head (metadata)
- Darkmode toggle (header)
- Search (header)
- Sidenotes (afterBody)
- TagList (afterBody)
- FlexContainer with:
  - LicenseInfo
  - CitationGenerator (default: APA style)
- ArweaveIndex (afterBody)
- DownloadMarkdown (afterBody)
- Graph (conditional, afterBody)
- ImageModal (afterBody)
- Footer with GitHub/Twitter links

**Content Page Layout:**
- Banner (beforeBody)
- ArticleTitle with conditional display (beforeBody)
- ArticleSubtitle (beforeBody)
- AuthorName (beforeBody)
- PublishDate (beforeBody)
- Explorer (left, desktop only)
- Backlinks (left, desktop only)
- TableOfContents (right, desktop only)

**List Page Layout:**
- ArticleTitle (beforeBody)
- Explorer (left, desktop only)
- Backlinks (left, desktop only)
- TableOfContents (right, desktop only)

### Plugin Configuration (quartz.config.ts)

**Transformers:**
- FrontMatter
- CreatedModifiedDate (frontmatter → filesystem priority)
- SyntaxHighlighting (github-light/dark themes)
- ObsidianFlavoredMarkdown
- GitHubFlavoredMarkdown
- TableOfContents
- CrawlLinks (shortest path resolution)
- Description
- Latex (katex engine)
- Citations (bibliography.bib, linked citations)

**Filters:**
- RemoveDrafts
- ExplicitPublish

**Emitters:**
- AliasRedirects
- ComponentResources
- ContentPage
- FolderPage
- TagPage
- ContentIndex (sitemap + RSS)
- Assets
- Static
- NotFoundPage

## Key Differences: Old vs New

| Aspect | Old (website/) | New (custom-quartz/) |
|--------|---------------|----------------------|
| **Quartz Location** | Root `/quartz/` | Subdirectory `/.quartz/quartz/` |
| **Config Location** | Root | `/.quartz/` |
| **Dependencies** | Root package.json | `/.quartz/package.json` |
| **Build Command** | `npx quartz build` | `cd .quartz && npm run build` |
| **Content Dir** | Root `/content/` | Root (or specified with -d flag) |
| **Output Dir** | `/public/` | `/.quartz/public/` (or configured) |

## Dependencies to Add

Add to `.quartz/package.json` under `dependencies`:

```json
"chalk": "^5.3.0",
"arweave": "^1.15.5",
"react": "^18.3.1",
"react-dom": "^18.3.1",
"glob": "^10.3.10",
"rimraf": "^6.0.1",
"@types/cytoscape": "^3.21.7",
"@types/d3-force": "^3.0.10"
```

Add to `devDependencies`:
```json
"@types/react": "^18.3.5",
"@types/react-dom": "^18.3.0"
```

## Post-Migration Checklist

- [ ] All dependencies installed without errors
- [ ] Build completes successfully
- [ ] Serve runs without errors
- [ ] All custom components render correctly
- [ ] Citation generator works
- [ ] Arweave index functions
- [ ] Image modal works
- [ ] Sidenotes display properly
- [ ] Graph visualization works
- [ ] Download markdown feature works
- [ ] Styling matches original site
- [ ] All pages accessible
- [ ] Links resolve correctly
- [ ] Search works
- [ ] Dark mode toggles correctly

## Notes

1. **Package Versions:** The new structure uses slightly different versions of some packages. May need to align versions if compatibility issues arise.

2. **Build Output:** Current config outputs to `public` in `.quartz/` directory. Verify if this needs to be at root level for deployment.

3. **Bibliography:** The `bibliography.bib` file reference in quartz.config.ts may need path adjustment (currently `./bibliography.bib`).

4. **Custom Domain:** If using CNAME, ensure it's in the correct output directory.

5. **Node Version:** Both require Node 22+, ensure compatibility maintained.

## Timeline Estimate

- **Phase 1 (Dependencies):** 30 minutes
- **Phase 2 (Content):** 1-2 hours
- **Phase 3 (Config):** 1 hour
- **Phase 4 (Testing):** 2-3 hours
- **Phase 5 (Documentation):** 1 hour

**Total:** ~6-8 hours

## ✅ Completed Actions

1. ✅ Fixed missing chalk dependency (and others)
2. ✅ Ran npm install in .quartz/
3. ✅ Fixed bibliography.bib path issue
4. ✅ Fixed file watcher EMFILE issue (excluded node_modules)
5. ✅ Confirmed build/serve works - server running successfully at http://localhost:8080

## Next Immediate Actions

1. **Test the server** - Navigate to http://localhost:8080 to verify it works
2. **Copy content directory** from website to custom-quartz
3. **Copy any additional files** (CNAME, static assets, etc.)
4. **Run comprehensive tests** of all custom components
5. **Verify all pages render correctly**

## Quick Test Command

To test the current setup:
```bash
cd /Users/gideon/Desktop/custom-quartz
npm run serve
# Then navigate to http://localhost:8080
```

The server should now start without the EMFILE error!

