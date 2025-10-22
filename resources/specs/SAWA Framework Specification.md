---
aiContribution:
  aiModel:
  aiRole: generative
  aiScope: Primary content generator, working from human direction and framework
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
date: 2025-10-22
language: en
license: CC BY-NC-SA 4.0
publish: true
quartzSearch: true
quartzShowBacklinks: true
quartzShowCitation: true
quartzShowExplorer: true
quartzShowFlex: true
quartzShowGraph: true
quartzShowSubtitle: true
quartzShowTOC: true
quartzShowTitle: true
subtitle: A comprehensive development scaffolding system designed for creating permanent web applications deployed to Arweave.
title: Semantic Arweave Web App (SAWA) Framework Specification
type: spec
uuid: 567bae3f-4f72-4e79-9781-6d72b5135ffa
---

# Semantic Arweave Web App (SAWA) Framework Specification

**Version:** 0.1.0  
**Date:** 2025-10-22  
**Status:** Production Ready

## Executive Summary

The Semantic Arweave Web App (SAWA) Framework is a comprehensive development scaffolding system designed for creating permanent web applications deployed to Arweave. It integrates DOAP (Description of a Project) semantic vocabulary, Arweave permanent storage, and AI code assistant rulesets into a unified development environment.

## 1. Framework Architecture

### 1.1 Core Philosophy

The framework operates on three fundamental principles:

1. **Separation of Concerns**: Clear boundaries between project code and development scaffolding
2. **Metadata-Driven Development**: DOAP.json serves as the single source of truth for project metadata
3. **AI-Assisted Workflow**: Integrated rulesets for multiple AI assistants (Cursor, Claude) with shared automation

### 1.2 Directory Structure

```
starter-sawa/
├── .workspace/              # Assistant-agnostic shared resources
│   ├── scripts/             # Automation scripts
│   ├── config/              # Configuration files
│   ├── docs/                # Documentation (ref/, arch/, temp/)
│   └── templates/            # Reusable patterns
├── .cursor/                 # Cursor-specific rules
│   └── rules/               # MDC rulesets (001-026)
├── .claude/                 # Claude-specific guidance
├── src/                     # Application source code
├── doap.json               # Central metadata source
├── package.json            # Project dependencies
└── vite.config.ts          # Build configuration
```

## 2. DOAP Integration System

### 2.1 DOAP as Semantic Vocabulary

DOAP (Description of a Project) provides a standardized vocabulary for describing software projects using established ontologies:

- **Schema.org**: Web application metadata
- **DOAP Vocabulary**: Software project descriptions
- **Dublin Core**: Basic metadata elements

### 2.2 Metadata Architecture

The `doap.json` file serves as the **fundamental source of truth** containing:

```json
{
  "@context": ["https://schema.org/", "http://usefulinc.com/ns/doap#"],
  "@type": "SoftwareApplication",
  "name": "Project Name",
  "version": "0.1.0",
  "description": "Project description",
  "author": { "@type": "Person", "name": "Author Name" },
  "deployments": [
    {
      "@type": "WebSite",
      "version": "0.1.0",
      "url": "https://arweave.net/transaction-id",
      "transactionId": "transaction-id",
      "deploymentDate": "2025-01-01T00:00:00Z"
    }
  ]
}
```

### 2.3 Metadata Injection System

**Vite Plugin Integration**: Custom `doap-metadata.ts` plugin performs:

1. **Build-time Metadata Injection**: Reads `doap.json` and injects metadata into HTML
2. **Environment Variable Injection**: Provides `VITE_APP_VERSION`, `VITE_APP_NAME` to application code
3. **Placeholder Replacement**: Transforms `{{PROJECT_NAME}}` with actual values
4. **Asset Distribution**: Copies `doap.json` to `dist/` for public access

### 2.4 Cross-File Synchronization

**doap-sync.sh Script** maintains consistency across:

- `package.json`: Project metadata and version
- `README.md`: Project description and links
- `CHANGELOG.md`: Version history
- HTML templates: Metadata placeholders

## 3. Arweave Integration

### 3.1 Deployment Architecture

**Primary Deployment Script**: `deploy-to-arweave.sh`

- **Metadata Integration**: Reads from `doap.json` for deployment information
- **Transaction Tracking**: Records Arweave transaction IDs in `doap.json`
- **Environment Support**: Production (`--prod`) and development (`--dev`) modes
- **Auto-confirmation**: Automated deployment without manual intervention

### 3.2 Backup System

**Protocol.land Integration**: `backup-to-protocol-land.sh`

- **Complete Workspace Backup**: Entire repository to Arweave via Protocol.land
- **Selective Exclusion**: Excludes sensitive files (wallet.json, .env)
- **Backup History**: Maintains backup records in `doap.json`
- **Restoration Support**: Full workspace restoration capabilities

### 3.3 Version Management

**Semantic Versioning**: `version-bump.sh`

- **Conventional Commits**: Automated version bumping based on commit messages
- **Multi-file Sync**: Updates `package.json`, `doap.json`, `CHANGELOG.md`
- **Git Integration**: Automatic commit and tag creation
- **Deployment Tracking**: Links version bumps to deployment records

## 4. AI Assistant Integration

### 4.1 Multi-Assistant Architecture

**Assistant-Agnostic Design**:

- `.workspace/`: Shared resources for all assistants
- `.cursor/`: Cursor-specific rules and guidance
- `.claude/`: Claude-specific configuration

### 4.2 Ruleset System

**MDC (Markdown Configuration) Rules**:

1. **001_workspace.mdc**: Core workspace philosophy
2. **002_cursor_rules.mdc**: Cursor-specific development standards
3. **003_dev_docs.mdc**: Documentation organization
4. **004_dev_tools.mdc**: Development tool management
5. **005a_project_initialization.mdc**: Project setup workflow
6. **005b_project_update.mdc**: Version management workflow
7. **005c_project_deploy.mdc**: Deployment workflow
8. **005d_project_backup.mdc**: Backup system workflow
9. **006_planning_doc.mdc**: Planning document standards
10. **007_python.mdc**: Python environment management
11. **008_style.mdc**: CSS architecture standards
12. **021_testing.mdc**: Testing requirements
13. **022_delegate.mdc**: AI delegation patterns
14. **023_debugging.mdc**: Debug logging standards
15. **026_research.mdc**: Research methodology

### 4.3 Assistant Workflow Integration

**Context Management**: `.workspace/context.md`

- **Orientation Steps**: New assistant onboarding process
- **Convention Standards**: Git, versioning, and release workflows
- **Script Integration**: Shared automation and hooks
- **Etiquette Guidelines**: Assistant interaction protocols

## 5. Build and Development Process

### 5.1 Build System

**Vite Configuration**:

- **Custom Plugin**: `doap-metadata` plugin for metadata injection
- **Environment Variables**: Dynamic version and project info
- **Asset Optimization**: Arweave-optimized build output
- **Chunk Splitting**: Efficient loading for permaweb deployment

### 5.2 Development Workflow

**Standardized Scripts**:

```bash
npm run dev          # Development server
npm run build        # Production build
npm run deploy       # Production deployment
npm run deploy:dev   # Development deployment
npm run backup       # Workspace backup
npm run version:bump # Version management
npm run doap:sync    # Metadata synchronization
```

### 5.3 Quality Assurance

**Automated Validation**:

- **JSON Schema**: `doap.json` structure validation
- **Version Consistency**: Cross-file version synchronization
- **Deployment Verification**: Transaction ID validation
- **Backup Integrity**: Workspace restoration testing

## 6. Implementation Benefits

### 6.1 Developer Experience

- **Single Source of Truth**: All metadata centralized in `doap.json`
- **Automated Workflows**: Version management, deployment, and backup automation
- **AI Integration**: Contextual assistance with project-specific rules
- **Permanent Deployment**: One-click deployment to Arweave permaweb

### 6.2 Project Management

- **Metadata Consistency**: Automatic synchronization across all project files
- **Deployment Tracking**: Complete history of Arweave deployments
- **Version Management**: Semantic versioning with automated workflows
- **Backup System**: Complete workspace preservation on Arweave

### 6.3 Technical Advantages

- **Permanent Storage**: Deploy once, accessible forever
- **Decentralized**: No single point of failure
- **Versioned**: Complete deployment and backup history
- **Semantic**: Rich metadata for discoverability and integration

## 7. Usage Patterns

### 7.1 Project Initialization

1. Clone `starter-sawa` template
2. Replace placeholders in `doap.json`
3. Run `npm run doap:sync` to synchronize files
4. Configure Arweave wallet in `.workspace/config/`
5. Test deployment with `npm run deploy:dev`

### 7.2 Development Cycle

1. **Development**: `npm run dev` for local development
2. **Versioning**: `npm run version:bump patch|minor|major`
3. **Deployment**: `npm run deploy` for production deployment
4. **Backup**: `npm run backup` for workspace preservation

### 7.3 Maintenance

- **Metadata Updates**: Modify `doap.json` and run `npm run doap:sync`
- **Version Management**: Use conventional commits for automatic versioning
- **Deployment History**: All deployments automatically tracked in `doap.json`
- **Backup Management**: Regular workspace backups to Arweave

## 8. Technical Implementation Details

### 8.1 DOAP Vocabulary Elements

**Core Metadata Fields**:

- `@context`: Schema.org and DOAP vocabulary references
- `@type`: SoftwareApplication classification
- `name`: Project name
- `version`: Semantic version number
- `description`: Project description
- `author`: Author information with Person schema
- `maintainer`: Maintainer information
- `publisher`: Publishing organization
- `repository`: Source code repository details
- `license`: License information
- `homepage`: Project homepage URL
- `issueTracker`: Issue tracking system URL
- `documentation`: Documentation URL
- `changelog`: Changelog URL

**Deployment Tracking**:

- `deployments[]`: Array of deployment records
- `backupHistory[]`: Array of backup records
- `transactionId`: Arweave transaction identifier
- `arweaveUrl`: Direct Arweave access URL
- `deploymentDate`: ISO timestamp
- `environment`: Deployment environment (production/development)

### 8.2 Vite Plugin Architecture

**doap-metadata.ts Plugin**:

```typescript
export function doapMetadataPlugin(options: DoapMetadataOptions): Plugin {
  return {
    name: "doap-metadata",
    configResolved(config) {
      // Inject environment variables from doap.json
    },
    transformIndexHtml: {
      enforce: "pre",
      transform(html: string) {
        // Replace placeholders with actual metadata
      },
    },
    writeBundle() {
      // Copy doap.json to dist directory
    },
  };
}
```

### 8.3 Script Integration Patterns

**Shared Script Architecture**:

- **Error Handling**: Consistent error reporting and logging
- **Configuration**: External config files for customization
- **Hooks**: Pre/post execution hooks for extensibility
- **Validation**: Input validation and prerequisite checking
- **Documentation**: Inline documentation and usage examples

## 9. Security Considerations

### 9.1 Sensitive Data Protection

**Exclusion Patterns**:

- `.workspace/config/wallet.json`: Arweave wallet private keys
- `.env*`: Environment variables and secrets
- `node_modules/`: Dependencies (excluded from backup)
- `.git/`: Git repository data (excluded from deployment)

### 9.2 Backup Security

**Protocol.land Integration**:

- **Selective Backup**: Only non-sensitive files included
- **Encryption**: Optional encryption for sensitive data
- **Access Control**: Repository-level access permissions
- **Audit Trail**: Complete backup history tracking

## 10. Real-World Implementation Examples

### 10.1 Autoglypha Project

**Autoglypha** is a web-based glyph cellular automata generator that demonstrates the framework's capabilities for generative art applications:

```json
{
  "@context": ["https://schema.org/", "http://usefulinc.com/ns/doap#"],
  "@type": "SoftwareApplication",
  "name": "Autoglypha",
  "description": "Web-based Glyph Cellular Automata Generator - Modern React/TypeScript version for creating animated cellular automata using glyphs instead of traditional cells",
  "url": "https://github.com/clinamenic/autoglypha",
  "version": "0.2.1",
  "dateCreated": "2025-01-28T00:00:00Z",
  "dateModified": "2025-10-22T21:34:12Z",
  "license": "https://opensource.org/licenses/MIT",
  "programmingLanguage": ["TypeScript", "JavaScript", "Python"],
  "runtimePlatform": "Web Browser",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any",
  "author": {
    "@type": "Person",
    "name": "Spencer Saar Cavanaugh",
    "email": "ssc@clinamenic.com",
    "url": "https://www.clinamenic.com"
  },
  "maintainer": {
    "@type": "Person",
    "name": "Spencer Saar Cavanaugh",
    "email": "ssc@clinamenic.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Clinamenic LLC",
    "url": "https://www.clinamenic.com"
  },
  "repository": {
    "@type": "SoftwareSourceCode",
    "url": "https://github.com/clinamenic/autoglypha",
    "programmingLanguage": "TypeScript",
    "license": "https://opensource.org/licenses/MIT",
    "codeRepository": "https://github.com/clinamenic/autoglypha"
  },
  "issueTracker": "https://github.com/clinamenic/autoglypha/issues",
  "homepage": "https://autoglypha.clinamenic.com",
  "releaseNotes": "https://github.com/clinamenic/autoglypha/blob/main/changelog.md",
  "documentation": "https://github.com/clinamenic/autoglypha/blob/main/README.md",
  "keywords": [
    "cellular-automata",
    "ascii-art",
    "animation",
    "generative",
    "art",
    "glyph",
    "text-based",
    "web",
    "client-side",
    "arweave",
    "permanent"
  ],
  "featureList": [
    "Interactive Cellular Automata Generation with glyph-based cells",
    "Image Upload and ASCII Art Conversion with drag & drop support",
    "Customizable States with unique glyphs, colors, and background colors",
    "Multiple Animation Rulesets (Default, Inverse, Random, Majority, Crystal, etc.)",
    "Animation Modes (Standard, Reverse, Boomerang) with 1-50 frame iterations",
    "Real-time Preview of ASCII art conversion before animation generation",
    "Responsive Design for desktop and mobile devices",
    "Python Backend Processing via Pyodide for image processing",
    "100% Client-Side operation with no server dependencies",
    "Permanent Storage on Arweave"
  ],
  "softwareRequirements": [
    {
      "@type": "SoftwareApplication",
      "name": "Node.js",
      "version": "18+"
    },
    {
      "@type": "SoftwareApplication",
      "name": "npm",
      "version": "8+"
    }
  ],
  "deployments": [
    {
      "@type": "WebSite",
      "version": "0.2.1",
      "url": "https://arweave.net/KchAPLf5sVLk0mtl1kUhT4T5FjmnH4yAOfuiGwQaalY",
      "transactionId": "KchAPLf5sVLk0mtl1kUhT4T5FjmnH4yAOfuiGwQaalY",
      "arweaveUrl": "https://arweave.net/KchAPLf5sVLk0mtl1kUhT4T5FjmnH4yAOfuiGwQaalY",
      "deploymentDate": "2025-10-22T21:34:12Z",
      "environment": "--dev",
      "description": "Permanent deployment on Arweave permaweb",
      "hostingProvider": "Arweave"
    },
    {
      "@type": "WebSite",
      "version": "0.1.3",
      "url": "https://arweave.net/KySOF2ozzk7I5xp7AKfjx4sPjLXqk08aqanWjTuyaJ4",
      "transactionId": "KySOF2ozzk7I5xp7AKfjx4sPjLXqk08aqanWjTuyaJ4",
      "arweaveUrl": "https://arweave.net/KySOF2ozzk7I5xp7AKfjx4sPjLXqk08aqanWjTuyaJ4",
      "deploymentDate": "2025-02-02T00:00:00Z",
      "environment": "production",
      "description": "Latest production deployment on Arweave permaweb with smooth scrolling and improved frame timing",
      "hostingProvider": "Arweave"
    }
  ],
  "buildSystem": {
    "@type": "SoftwareApplication",
    "name": "Vite",
    "version": "5.0+"
  },
  "dependencies": [
    {
      "@type": "SoftwareApplication",
      "name": "React",
      "version": "18.2.0"
    },
    {
      "@type": "SoftwareApplication",
      "name": "TypeScript",
      "version": "5.3+"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Zustand",
      "version": "4.4.6"
    },
    {
      "@type": "SoftwareApplication",
      "name": "gifshot",
      "version": "0.4.5"
    },
    {
      "@type": "SoftwareApplication",
      "name": "@dnd-kit/core",
      "version": "6.3.1"
    }
  ],
  "changelog": {
    "@type": "WebPage",
    "url": "https://github.com/clinamenic/autoglypha/blob/main/changelog.md",
    "description": "Project changelog with version history and feature updates"
  },
  "relatedProjects": [
    {
      "@type": "SoftwareApplication",
      "name": "Lattelier",
      "url": "https://github.com/clinamenic/lattelier",
      "description": "Related lattice distortion and pattern generation tool"
    }
  ],
  "backupHistory": [
    {
      "@type": "BackupRecord",
      "timestamp": "2025-10-22T21:29:51Z",
      "version": "0.2.1",
      "commitHash": "6bdff8a8cb038a2ec84cdb5821208b9d8a5ffb3f",
      "branch": "main",
      "arweaveTxId": "",
      "fileCount": 102,
      "totalSize": "2.3M",
      "backupType": "complete-workspace",
      "description": "Complete workspace backup including dev tools and configuration"
    }
  ]
}
```

### 10.2 Lattelier Project

**Lattelier** is a professional lattice distortion and pattern generation tool that showcases the framework's capabilities for parametric graphics applications:

```json
{
  "@context": ["https://schema.org/", "http://usefulinc.com/ns/doap#"],
  "@type": "SoftwareApplication",
  "name": "Lattelier",
  "description": "Professional web-based lattice distortion and pattern generation tool for creating parametric graphics",
  "url": "https://github.com/clinamenic/lattelier",
  "version": "0.4.0",
  "dateCreated": "2024-01-01T00:00:00Z",
  "dateModified": "2025-10-22T20:57:24Z",
  "license": "https://opensource.org/licenses/MIT",
  "programmingLanguage": ["TypeScript", "JavaScript"],
  "runtimePlatform": "Web Browser",
  "applicationCategory": "WebApplication",
  "operatingSystem": "Any",
  "author": {
    "@type": "Person",
    "name": "Spencer Saar Cavanaugh",
    "email": "ssc@clinamenic.com",
    "url": "https://www.clinamenic.com"
  },
  "maintainer": {
    "@type": "Person",
    "name": "Spencer Saar Cavanaugh",
    "email": "ssc@clinamenic.com"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Clinamenic LLC",
    "url": "https://www.clinamenic.com"
  },
  "repository": {
    "@type": "SoftwareSourceCode",
    "url": "https://github.com/clinamenic/lattelier",
    "programmingLanguage": "TypeScript",
    "license": "https://opensource.org/licenses/MIT",
    "codeRepository": "https://github.com/clinamenic/lattelier"
  },
  "issueTracker": "https://github.com/clinamenic/lattelier/issues",
  "homepage": "https://www.lattelier.clinamenic.com",
  "releaseNotes": "https://github.com/clinamenic/lattelier/blob/main/CHANGELOG.md",
  "documentation": "https://github.com/clinamenic/lattelier/blob/main/README.md",
  "keywords": [
    "lattice",
    "distortion",
    "pattern",
    "generation",
    "parametric",
    "graphics",
    "well-based",
    "deformation",
    "web",
    "client-side",
    "arweave",
    "permanent"
  ],
  "featureList": [
    "Interactive Grid Generation with up to 200×200 points",
    "Well-Based Deformation for organic distortions",
    "Advanced Distortion Controls with multiple falloff curves",
    "Flexible Styling with configurable points, lines, and fill",
    "Multiple Export Options (PNG, SVG, JSON)",
    "Professional Workflow with pan, zoom, and save/load",
    "100% Client-Side operation",
    "Permanent Storage on Arweave"
  ],
  "softwareRequirements": [
    {
      "@type": "SoftwareApplication",
      "name": "Node.js",
      "version": "18+"
    },
    {
      "@type": "SoftwareApplication",
      "name": "npm",
      "version": "8+"
    }
  ],
  "deployments": [
    {
      "@type": "WebSite",
      "version": "0.4.0",
      "url": "https://arweave.net/ZpwvqqfBOw-eRclSt-lNoxwTZCO47ZHQ0az16UQxQ1k",
      "transactionId": "ZpwvqqfBOw-eRclSt-lNoxwTZCO47ZHQ0az16UQxQ1k",
      "arweaveUrl": "https://arweave.net/ZpwvqqfBOw-eRclSt-lNoxwTZCO47ZHQ0az16UQxQ1k",
      "deploymentDate": "2025-10-22T20:57:24Z",
      "environment": "--prod",
      "description": "Permanent deployment on Arweave permaweb",
      "hostingProvider": "Arweave"
    },
    {
      "@type": "WebSite",
      "version": "0.3.0",
      "url": "https://fnf3y7jzivfyvtlaorhdeuuqcrm26uttk6tqo4lt33grxb4otcwa.arweave.net/K0u8fTlFS4rNYHROMlKQFFmvUnNXpwdxc97NG4eOmKw/",
      "transactionId": "K0u8fTlFS4rNYHROMlKQFFmvUnNXpwdxc97NG4eOmKw",
      "arweaveUrl": "https://arweave.net/K0u8fTlFS4rNYHROMlKQFFmvUnNXpwdxc97NG4eOmKw",
      "deploymentDate": "2025-10-18T00:00:00Z",
      "environment": "production",
      "description": "Latest production deployment on Arweave permaweb",
      "hostingProvider": "Arweave"
    }
  ],
  "buildSystem": {
    "@type": "SoftwareApplication",
    "name": "Vite",
    "version": "5.0+"
  },
  "dependencies": [
    {
      "@type": "SoftwareApplication",
      "name": "React",
      "version": "18.2.0"
    },
    {
      "@type": "SoftwareApplication",
      "name": "TypeScript",
      "version": "5.3+"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Zustand",
      "version": "4.4.6"
    },
    {
      "@type": "SoftwareApplication",
      "name": "GSAP",
      "version": "3.12.4"
    },
    {
      "@type": "SoftwareApplication",
      "name": "Immer",
      "version": "10.0.3"
    }
  ],
  "changelog": {
    "@type": "WebPage",
    "url": "https://github.com/gideon/lattelier/blob/main/CHANGELOG.md",
    "description": "Project changelog with version history and commit details"
  },
  "relatedProjects": [
    {
      "@type": "SoftwareApplication",
      "name": "Autoglypha",
      "url": "",
      "description": "Related generative art project"
    }
  ],
  "backupHistory": []
}
```

### 10.3 Framework Implementation Analysis

**Key Implementation Patterns Demonstrated**:

1. **Metadata Completeness**: Both projects demonstrate comprehensive metadata coverage including author information, repository details, and deployment tracking

2. **Deployment History**: Complete deployment records with Arweave transaction IDs, timestamps, and environment information

3. **Technology Stack Documentation**: Detailed dependency tracking with version information for React, TypeScript, and specialized libraries

4. **Cross-Project Relationships**: Related projects are properly linked, demonstrating the framework's ability to maintain project ecosystems

5. **Backup Integration**: Autoglypha shows backup history tracking, while Lattelier demonstrates the framework's flexibility for projects with different backup requirements

6. **Version Management**: Both projects show proper semantic versioning with complete deployment tracking across multiple versions

---

**Document Status**: This specification represents the current state of the Semantic Arweave Web App (SAWA) Framework as of October 2025. For updates and modifications, refer to the project's changelog and version history.
