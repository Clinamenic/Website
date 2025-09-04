# Custom Quartz Framework for GitHub Pages Deployment

## Overview

This document outlines the custom modifications made to the Quartz static site generator framework to enable deployment from a `.quartz/` subdirectory while building from markdown files in the root project directory and outputting to `.quartz/public/` for GitHub Pages deployment.

## Quick Reference

**Repository**: https://github.com/RareCompute/website  
**Live Site**: https://rarecompute.github.io/website  
**Build Command**: `npm run build` (from root)  
**Output Directory**: `.quartz/public/`

## Architecture Overview

```
website/
├── .quartz/                    # Quartz framework installation
│   ├── quartz.config.ts        # Custom configuration
│   ├── package.json           # Quartz dependencies
│   ├── public/                # Build output directory
│   └── quartz/                # Quartz core framework
├── .github/workflows/          # GitHub Actions deployment
│   └── deploy.yml             # Custom deployment workflow
├── *.md                       # Source markdown files (root level)
└── package.json               # Root project configuration
```

## Key Modifications

### 1. Quartz Configuration (`quartz.config.ts`)

**Location**: `.quartz/quartz.config.ts`

**Key Changes**:

- **Base URL Configuration**: Set to `https://rarecompute.github.io/website` for GitHub Pages
- **Content Source**: Configured to read from parent directory (`..`) instead of current directory
- **Output Directory**: Set to `public/` within the `.quartz/` directory
- **Ignore Patterns**: Custom patterns to exclude development files and infrastructure

```typescript
const config: QuartzConfig = {
  configuration: {
    baseUrl: "https://rarecompute.github.io/website",
    // ... other config
  },
  // Build command: tsx ./quartz/bootstrap-cli.mjs build -d .. -o public
};
```

### 2. Build Script Configuration

**Location**: `.quartz/package.json`

**Key Changes**:

- **Build Command**: `tsx ./quartz/bootstrap-cli.mjs build -d .. -o public`
  - `-d ..`: Source directory (parent directory containing markdown files)
  - `-o public`: Output directory (within `.quartz/`)

```json
{
  "scripts": {
    "build": "tsx ./quartz/bootstrap-cli.mjs build -d .. -o public",
    "serve": "tsx ./quartz/bootstrap-cli.mjs build -d .. -o public --serve"
  }
}
```

### 3. Root Project Configuration

**Location**: `package.json` (root level)

**Key Changes**:

- **Build Script**: Delegates to `.quartz/` directory
- **Minimal Dependencies**: No duplicate dependencies - all managed in `.quartz/`
- **Clean Architecture**: Root only contains essential scripts

```json
{
  "name": "rarecompute-website",
  "version": "1.0.0",
  "description": "RareCompute website built with custom Quartz framework",
  "type": "module",
  "engines": {
    "node": ">=22",
    "npm": ">=10.9.2"
  },
  "scripts": {
    "build": "cd .quartz && npm run build",
    "serve": "cd .quartz && npm run serve",
    "quartz": "cd .quartz && tsx ./quartz/bootstrap-cli.mjs"
  }
}
```

### 4. GitHub Actions Workflow

**Location**: `.github/workflows/deploy.yml`

**Key Features**:

- **Submodule Handling**: Initially configured for submodules, later simplified
- **Dependency Installation**: Installs from `.quartz/` directory
- **Build Process**: Runs build from root, which delegates to `.quartz/`
- **Output Path**: Deploys from `.quartz/public/` directory

```yaml
- name: Install Dependencies
  run: cd .quartz && npm install
- name: Build Quartz
  run: npm run build
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: .quartz/public
```

## Deployment Process Flow

### 1. Source Content

- Markdown files are stored in the root directory of the repository
- Files like `index.md`, `About Us.md`, `Contact.md`, etc. are processed

### 2. Build Process

1. GitHub Actions checks out the repository
2. Sets up Node.js 22 environment
3. Installs dependencies from `.quartz/package.json`
4. Runs `npm run build` (root level)
5. Root build script executes `cd .quartz && npm run build`
6. Quartz processes markdown files from parent directory (`..`)
7. Generates static HTML files in `.quartz/public/`

### 3. Deployment

1. GitHub Actions uploads `.quartz/public/` as deployment artifact
2. Deploys to GitHub Pages
3. Site becomes available at `https://rarecompute.github.io/website`

## Key Technical Decisions

### 1. Directory Structure Choice

**Decision**: Keep Quartz framework in `.quartz/` subdirectory

**Rationale**:

- Maintains separation between framework and content
- Allows for easy framework updates
- Keeps root directory clean for content files

### 2. Build Command Configuration

**Decision**: Use `-d ..` and `-o public` parameters

**Rationale**:

- Enables building from parent directory while outputting locally
- Maintains standard Quartz output structure
- Compatible with GitHub Pages deployment

### 3. Dependency Management

**Decision**: Install dependencies only in `.quartz/` directory

**Rationale**:

- Keeps framework dependencies isolated
- Maintains standard npm workflow
- Avoids conflicts with root-level dependencies
- Eliminates duplicate dependencies and reduces repository size
- Single source of truth for all Quartz framework dependencies

### 4. GitHub Actions Simplification

**Decision**: Remove submodule complexity and caching

**Rationale**:

- Submodules caused deployment issues
- Caching had path resolution problems
- Simpler configuration is more reliable

## Troubleshooting History

### Issue 1: Submodule Problems

**Problem**: `.quartz/` was configured as a git submodule

**Solution**: Converted to regular directory by removing `.git` and re-adding files

### Issue 2: Cache Path Issues

**Problem**: GitHub Actions couldn't resolve cache dependency paths

**Solution**: Removed cache configuration to simplify workflow

### Issue 3: Lockfile Compatibility

**Problem**: `npm ci` failed due to lockfile version incompatibility

**Solution**: Changed to `npm install` for better compatibility

### Issue 4: Duplicate Dependencies

**Problem**: Root and `.quartz/` directories both contained identical dependencies

**Solution**: Removed all dependencies from root `package.json`, keeping only essential scripts

## Troubleshooting Solutions Applied

| Issue                  | Solution                                |
| ---------------------- | --------------------------------------- |
| Submodule errors       | Converted .quartz/ to regular directory |
| Cache path errors      | Removed cache configuration             |
| Lockfile compatibility | Changed npm ci to npm install           |
| Build path issues      | Used -d .. and -o public parameters     |
| Duplicate dependencies | Removed root dependencies, kept only in .quartz/ |

## Benefits of This Architecture

1. **Separation of Concerns**: Framework and content are clearly separated
2. **Easy Maintenance**: Framework can be updated independently
3. **Standard Deployment**: Uses standard GitHub Pages workflow
4. **Flexible Content**: Markdown files can be organized in root directory
5. **Version Control**: All files are tracked in single repository
6. **Efficient Dependencies**: No duplicate dependencies, single source of truth
7. **Smaller Repository**: Reduced size by eliminating duplicate node_modules

## Maintenance Notes

- **Framework Updates**: Modify files in `.quartz/` directory
- **Content Updates**: Edit markdown files in root directory
- **Deployment**: Automatic via GitHub Actions on push
- **Local Testing**: Run `npm run serve` from root directory

## Future Considerations

1. **Framework Updates**: Consider how to handle Quartz framework updates
2. **Content Organization**: May want to add content-specific ignore patterns
3. **Performance**: Could re-enable caching once path issues are resolved
4. **Customization**: Framework modifications are documented for future reference

## Files Modified

- `.quartz/quartz.config.ts` - Base URL and build configuration
- `.quartz/package.json` - Build script parameters and all dependencies
- `package.json` - Minimal root configuration with script delegation only
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow
- `.gitignore` - Updated to include/exclude appropriate files

## Conclusion

This architecture successfully enables Quartz to build from a subdirectory while maintaining clean separation between framework and content, resulting in a reliable GitHub Pages deployment. The custom modifications allow for:

- Building from markdown files in the root directory
- Outputting to `.quartz/public/` for GitHub Pages compatibility
- Maintaining framework isolation in the `.quartz/` subdirectory
- Automated deployment via GitHub Actions

The setup provides a robust foundation for maintaining and updating both the Quartz framework and website content independently while ensuring reliable deployment to GitHub Pages.
