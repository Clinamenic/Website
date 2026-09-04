# Custom-Quartz to Website Sync Plan

**Date:** 2025-10-15
**Status:** Planning
**Type:** Content Synchronization

## Overview

Synchronize content from the `custom-quartz` repository (development/editing environment) to the `website` repository (build/deployment environment) while preserving build infrastructure and configuration.

## Context & Requirements

### Current State

**custom-quartz** (`/Users/gideon/Desktop/custom-quartz/`)
- **Purpose:** Content development and editing workspace
- **Structure:** Content files at root level
- **Quartz:** Installed in `.quartz/` (gitignored)
- **Package.json:** Simple wrapper pointing to `.quartz`
- **Content:** Markdown files, zettelgarten/, writing/, projects/, resources/
- **Scaffolding:** .cursor/, .workspace/, .obsidian/ (gitignored)

**website** (`/Users/gideon/Hub/public/website/`)
- **Purpose:** Build and deployment repository
- **Structure:** Content in `content/` subdirectory
- **Quartz:** Full framework in `quartz/` (committed to repo)
- **Package.json:** Complete with 100+ dependencies
- **Build artifacts:** public/, node_modules/ (gitignored)
- **Config files:** quartz.config.ts, quartz.layout.ts, tsconfig.json at root

### Goals

1. Sync all content changes from custom-quartz to website/content/
2. Preserve website's build infrastructure (quartz/, package.json, configs)
3. Maintain both repos' scaffolding directories independently
4. Enable safe commits to website repo after sync
5. Establish repeatable sync process for future updates

### Constraints

- Cannot disrupt website's build configuration
- Must preserve git history in website repo
- Must respect .gitignore patterns in both repos
- Should not sync gitignored content (private/, .quartz/, etc.)
- Must maintain separate .cursor/, .workspace/ configurations

## Baseline Knowledge

### Repository Structures

**custom-quartz root directory:**
```
custom-quartz/
├── .git/                    # Git repo
├── .gitignore              # Ignores: .quartz/, private/, .cursor/, etc.
├── .cursor/                # Cursor IDE config (gitignored)
├── .workspace/             # Workspace tools (gitignored)
├── .obsidian/              # Obsidian config (gitignored)
├── .quartz/                # Quartz installation (gitignored)
├── private/                # Private content (gitignored)
├── package.json            # Simple wrapper
├── CNAME                   # Domain config
├── bibliography.bib        # Citations
├── index.md                # Homepage
├── about.md, design.md, gallery.md, typography.md
├── services.md, service.xml
├── writing.md, zettelgarten.md
├── projects/               # Project pages
├── resources/              # Resources including specs/
├── writing/                # Writing content
└── zettelgarten/           # Zettel notes
    └── r/                  # Numbered zettels
```

**website root directory:**
```
website/
├── .git/                   # Git repo
├── .gitignore             # Similar patterns
├── .cursor/               # Cursor config (gitignored)
├── .workspace/            # Workspace tools (gitignored)
├── .obsidian/             # Obsidian config (gitignored)
├── content/               # CONTENT DIRECTORY (synced from custom-quartz)
│   ├── about.md, design.md, gallery.md
│   ├── projects/, resources/, writing/, zettelgarten/
│   └── ... (mirrors custom-quartz root content)
├── private/               # Private content (gitignored)
├── quartz/                # Quartz framework source (COMMITTED)
│   ├── components/
│   ├── plugins/
│   ├── util/
│   └── ... (full framework)
├── public/                # Build output (gitignored)
├── node_modules/          # Dependencies (gitignored)
├── package.json           # Full dependency list
├── package-lock.json      # Lock file (gitignored in custom-quartz, committed in website)
├── quartz.config.ts       # Quartz configuration
├── quartz.layout.ts       # Layout configuration
├── tsconfig.json          # TypeScript config
├── CNAME                  # Domain config
├── bibliography.bib       # Citations
└── ... (other config files)
```

### Key Differences

| Aspect | custom-quartz | website |
|--------|---------------|---------|
| Content location | Root directory | `content/` subdirectory |
| Quartz location | `.quartz/` (gitignored) | `quartz/` (committed) |
| Package.json | Minimal wrapper | Full dependencies |
| Build artifacts | None | `public/` directory |
| Config files | None | quartz.config.ts, quartz.layout.ts |

### Files to Sync

**Content files** (custom-quartz root → website/content/):
- All .md files at root (index.md, about.md, design.md, etc.)
- projects/ directory
- resources/ directory (including specs/)
- writing/ directory
- zettelgarten/ directory
- robots.txt
- service.xml
- bibliography.bib

**Root-level shared files** (custom-quartz root → website root):
- CNAME (domain configuration)
- bibliography.bib (also copy to content/)

**Files to EXCLUDE from sync:**
- .git/, .gitignore
- .cursor/, .workspace/, .obsidian/ (repo-specific scaffolding)
- .quartz/, node_modules/, public/ (build artifacts)
- private/ (keep separate in each repo)
- package.json, package-lock.json (different structures)
- quartz/, quartz.config.ts, quartz.layout.ts (website only)

## Implementation Approach

### Phase 1: Pre-Sync Safety Checks

1. **Verify both repositories are clean**
   - Check git status in both repos
   - Ensure no uncommitted changes that might be lost
   - Create safety backup if needed

2. **Verify website build infrastructure intact**
   - Confirm quartz/ directory exists
   - Confirm package.json has full dependencies
   - Confirm config files present

3. **Document current state**
   - List files in website/content/
   - Note any website-specific content files that don't exist in custom-quartz

### Phase 2: Content Sync Strategy

**Option A: Rsync-based sync** (Recommended)
- Use rsync with careful exclusions
- Preserve file timestamps
- Show detailed changes before applying
- Can be scripted for future use

**Option B: Manual directory replacement**
- Delete website/content/ entirely
- Copy custom-quartz root content to website/content/
- More risky, harder to track changes

**Option C: Git-based sync**
- Use git to track differences
- Cherry-pick content changes
- Most traceable but most complex

### Phase 3: Sync Execution (Rsync Approach)

**Step 1: Sync content directory**
```bash
rsync -av --delete \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='.cursor' \
  --exclude='.workspace' \
  --exclude='.obsidian' \
  --exclude='.quartz' \
  --exclude='node_modules' \
  --exclude='public' \
  --exclude='private' \
  --exclude='package.json' \
  --exclude='package-lock.json' \
  --exclude='.DS_Store' \
  --exclude='*.log' \
  /Users/gideon/Desktop/custom-quartz/ \
  /Users/gideon/Hub/public/website/content/
```

**Step 2: Sync root-level shared files**
```bash
# Copy CNAME to website root
cp /Users/gideon/Desktop/custom-quartz/CNAME \
   /Users/gideon/Hub/public/website/CNAME

# Copy bibliography.bib to website root
cp /Users/gideon/Desktop/custom-quartz/bibliography.bib \
   /Users/gideon/Hub/public/website/bibliography.bib
```

**Step 3: Handle private directory**
```bash
# Decision needed: Sync private/ or keep separate?
# Option 1: Sync (if they should match)
rsync -av --delete \
  /Users/gideon/Desktop/custom-quartz/private/ \
  /Users/gideon/Hub/public/website/private/

# Option 2: Skip (if they serve different purposes)
# Do nothing
```

### Phase 4: Post-Sync Verification

1. **Check website/content/ structure**
   ```bash
   cd /Users/gideon/Hub/public/website
   ls -la content/
   ```
   - Verify all expected directories present
   - Verify key files copied correctly

2. **Verify git status**
   ```bash
   cd /Users/gideon/Hub/public/website
   git status
   ```
   - Review changed files
   - Ensure no unintended deletions
   - Ensure website infrastructure files unchanged

3. **Test build**
   ```bash
   cd /Users/gideon/Hub/public/website
   npm run build
   ```
   - Ensure build completes successfully
   - Check for broken links or missing files

4. **Review diff**
   ```bash
   git diff
   ```
   - Verify changes make sense
   - Look for unexpected modifications

### Phase 5: Git Commit

1. **Stage changes**
   ```bash
   cd /Users/gideon/Hub/public/website
   git add content/
   git add CNAME bibliography.bib  # If changed
   ```

2. **Commit with descriptive message**
   ```bash
   git commit -m "sync: Update content from custom-quartz

   - Sync all content files from custom-quartz repository
   - Update writing, zettelgarten, projects, resources
   - Update root pages (index, about, design, etc.)
   - Preserve website build infrastructure
   
   Source: custom-quartz @ $(cd /Users/gideon/Desktop/custom-quartz && git rev-parse --short HEAD)"
   ```

3. **Review before push**
   ```bash
   git log -1 --stat
   git show --stat
   ```

## Alternative Approaches

### Option 1: Symlink Strategy
- Create symlink from website/content/ to custom-quartz/
- **Pros:** Automatic sync, single source of truth
- **Cons:** Breaks website repo independence, complicates build, not git-friendly

### Option 2: Git Submodule
- Make custom-quartz a submodule of website
- **Pros:** Version-locked content, clear separation
- **Cons:** Complex workflow, submodule management overhead

### Option 3: Automated Sync Script
- Create shell script to automate rsync process
- **Pros:** Repeatable, reduces errors, can be versioned
- **Cons:** Initial setup time, needs maintenance

## Success Criteria

### Functional Requirements
- [ ] All content from custom-quartz visible in website/content/
- [ ] Website builds successfully without errors
- [ ] No website infrastructure files modified (quartz/, package.json, etc.)
- [ ] Git history in website repo preserved
- [ ] Changes staged and ready for commit

### Content Integrity
- [ ] All markdown files synced correctly
- [ ] All subdirectories (projects/, writing/, zettelgarten/) intact
- [ ] CNAME and bibliography.bib in correct locations
- [ ] No unintended file deletions
- [ ] File permissions preserved

### Repository Health
- [ ] .git directories separate and intact
- [ ] .gitignore patterns respected
- [ ] Scaffolding directories (.cursor/, .workspace/) remain separate
- [ ] Private directories handled correctly
- [ ] No build artifacts committed

## Risks & Mitigation

### Risk 1: Accidental deletion of website-specific files
**Mitigation:** 
- Use rsync with `--dry-run` first to preview
- Verify exclusion patterns before execution
- Keep git status clean before starting

### Risk 2: Build breaks after sync
**Mitigation:**
- Test build immediately after sync
- Keep git history to enable rollback
- Verify quartz.config.ts references correct paths

### Risk 3: Private content exposure
**Mitigation:**
- Explicitly exclude private/ in rsync
- Verify .gitignore still covers private/
- Check git status before committing

### Risk 4: Overwriting website-specific content modifications
**Mitigation:**
- Review git diff carefully before committing
- Identify any website-only content files first
- Use merge strategy if content diverged

## Rollback Plan

If sync fails or introduces issues:

```bash
cd /Users/gideon/Hub/public/website
git status                    # Review changes
git restore --staged .        # Unstage if needed
git restore .                 # Restore all working directory
git clean -fd                 # Remove untracked files
```

## Future Automation

Consider creating `/Users/gideon/Desktop/custom-quartz/.workspace/scripts/sync-to-website.sh`:

```bash
#!/bin/bash
# Sync custom-quartz content to website repository

set -e  # Exit on error

CUSTOM_QUARTZ="/Users/gideon/Desktop/custom-quartz"
WEBSITE="/Users/gideon/Hub/public/website"

echo "Syncing content from custom-quartz to website..."

# Sync content directory
rsync -av --delete \
  --exclude='.git' \
  --exclude='.gitignore' \
  --exclude='.cursor' \
  --exclude='.workspace' \
  --exclude='.obsidian' \
  --exclude='.quartz' \
  --exclude='node_modules' \
  --exclude='public' \
  --exclude='private' \
  --exclude='package.json' \
  --exclude='package-lock.json' \
  --exclude='.DS_Store' \
  --exclude='*.log' \
  "$CUSTOM_QUARTZ/" \
  "$WEBSITE/content/"

# Sync root-level files
cp "$CUSTOM_QUARTZ/CNAME" "$WEBSITE/CNAME"
cp "$CUSTOM_QUARTZ/bibliography.bib" "$WEBSITE/bibliography.bib"

echo "Sync complete!"
echo "Review changes with: cd $WEBSITE && git status"
```

## Dependencies

### Required Tools
- rsync (should be pre-installed on macOS)
- git (already in use)
- Node.js and npm (already installed for website)

### Repository Access
- Read access to custom-quartz
- Write access to website
- Both repositories in clean state

## Open Questions

1. **Private directory handling:** Should private/ directories be synced or kept separate?
   - **Recommendation:** Keep separate unless they serve identical purposes

2. **Sync frequency:** How often will this sync occur?
   - **Recommendation:** Manual sync before each website deployment

3. **Conflict resolution:** What if website/content/ has been modified directly?
   - **Recommendation:** Always edit in custom-quartz, treat website as deployment target

4. **Build artifacts:** Should we rebuild after sync or just stage content?
   - **Recommendation:** Test build but don't commit public/ (it's gitignored)

## Next Steps

1. Review this plan with user
2. Confirm private/ directory handling strategy
3. Execute Phase 1: Pre-sync safety checks
4. Run rsync with `--dry-run` to preview changes
5. Execute sync if preview looks correct
6. Verify and test build
7. Commit to website repository

## Notes

- Both repositories use similar .gitignore patterns, which is good
- custom-quartz package.json is minimal by design (just wrapper)
- website package.json is comprehensive (full Quartz dependencies)
- Content structure is identical, just at different path levels
- This sync pattern suggests custom-quartz is the "source of truth" for content

