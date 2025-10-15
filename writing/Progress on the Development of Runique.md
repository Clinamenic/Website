---
author:
- Spencer Saar Cavanaugh
authorURL: https://www.clinamenic.com
bannerURI: null
date: 2025-04-01
headDescription: null
headIcon: null
language: en
license: CC BY-SA 4.0
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
subtitle: Various reflections on autodidactic methodology with respect to software
  development
tags: null
title: Progress on the Development of Runique
type: notes
url: null
uuid: 8d49dc36-b1f8-479d-a9dc-3b3429e17e73
---

Over the last month and I half, I've been using AI-assisted programming software to create a desktop application for making fonts. What follows is some documentation of this experience, with a view toward emerging best practices for AI-assisted project management, and autodidactic methodology (see [[Modular Generalist Program]]).

To borrow a term from my friend [Gabriel Chartier](https://github.com/gchartier), much of this can be understood in terms of _cognitive prosthesis_, or the augmentation of cognitive capacities through technology. In this case, the rapid and iterative application of newly acquired knowledge toward a project I am passionate about (i.e. the typography app) creates conditions highly conducive to the retention and embodiment of technical knowledge. In this respect, I have been approaching the development of Runique in a threefold manner:

1. to create and sell fonts, and to create and sell a consumer typography app.
2. to cultivate software development skills via the acquisition and immediate application of technical knowledge to a project which I am passionate about.
3. to document and analyze how one can rapidly develop a skill via such an autodidactic process.

---

## Creating a Consumer Typography App

I've been passionate about fonts for several years now, and have even made a few (see [[typography]]). However, my process has been labor-intensive, and pretty far removed from what I perceive to be the best practices of leading typographers and foundries. Specifically, I had been making each glyph via raster graphics (using [GIMP](https://www.gimp.org/)), then using processes like [Calligraphr](https://www.calligraphr.com/en/) to bulk convert those raster glyphs to font files.

This usage of raster graphics for fonts tended to result in some inadvertently fuzzy glyphs -- alas, I simply hadn't developed skills in vector graphic creation. I had tried typography-specific vector graphic software, such as FontForge, but hadn't gotten into any kind of groove with it. Anyway, such was the pretext for setting out upon creating a typography app: to give myself a tool to expand my capabilities. In this respect, I felt very inspired by trends around [home-cooked software](https://maggieappleton.com/home-cooked-software/).

Additionally, as a generalist consultant active in the intersection of emerging technology, philanthropy, and digital public infrastructure, I haven't been generating as much income as I'd like, and so the prospect of selling fonts, and even font software, enticed me.

---

## Cultivating Software Development Skills

A month and a half ago, I started creating a typography app using Cursor, within a custom framework of rules and prompting technique (see [[Cursor Rules Framework]]). During the previous month, I had made [Autoglypha](https://autoglypha.clinamenic.com/), a glyph-based cellular automata animation web app, deployed on Arweave. Prior to this, I had virtually no software development experience, and could only really understand HTML and CSS. I would have only been able to roughly infer the difference between "development" and "production" environments, and even still my understanding is at an early stage.

This project seemed like a great opportunity to feed a few birds with one hand, professionally and educationally. I defaulted to developing Runique as a web app, only because thats what I did with Autoglypha.

![Image][https://www.arweave.net/MGQWuxxm6c9T86RpLuFPEMtFfgxeBgUDajpwsQJVhU8]

Having no idea, implementation-wise, where to start with frontend or backend architecture, I ended up prompting Cursor (mostly using claude_3.5_sonnet) to determine the architecture for me. At this point, I was also actively interested in using Runique as a pilot for creating an effective and generalizable workspace configuration conducive to AI assistants. I had previously attempted to make my own script to export Cursor chats as markdown files, but ran into a few walls and ended up using the SpecStory extension to export these chats, as seen below. Some of these markdown files are over 10,000 lines.

```
- 2025-02-15_17:42-optimizing-workspace-for-font-creation.md
- 2025-02-15_22:13-typography-project-development-and-testing.md
- 2025-02-17_15:25-font-building-pipeline-troubleshooting.md
- 2025-02-20_13:57-designing-style-operators-for-glyph-expansion.md
- 2025-02-21_05:04-frontend-ui-redesign-for-character-styles.md
- 2025-02-21_11:59-debugging-glyph-iteration-ui-update.md
- 2025-02-21_12:32-separate-inline-css-to-external-file.md
- 2025-02-21_14:33-expanding-toolbar-functionality-development.md
- 2025-02-23_21-29-implementing-undo-and-redo-buttons-in-editor.md
- 2025-02-24_08-49-font-development-guide-download-request.md
- 2025-02-24_10-05-researching-typographic-tools-for-calliope.md
- 2025-02-24_15-00-toolbar-functionality-enhancement-discussion.md
- 2025-02-25_09-19-streamlining-toolbar-directory-and-files.md
- 2025-02-25_11-01-reviewing-ui-transition-plan-and-directory-structure.md
- 2025-02-25_18-18-glyph-clearing-issue-and-solution-planning.md
- 2025-02-26_08-12-canvas-update-issue-with-glyph-selection.md
- 2025-02-26_10-41-converting-web-app-to-local-app-plan.md
- 2025-02-26_11-38-setting-up-electron-project-structure.md
- 2025-02-26_15-18-file-dependency-mapping-and-cleanup.md
- 2025-02-27_08-05-fixing-permission-denied-error-in-python.md
- 2025-02-27_08-09-canvas-module-mdc-rule-development.md
- 2025-02-27_12-56-updating-project-references-after-renaming.md
- 2025-02-27_12-57-updating-project-references-after-renaming.md
- 2025-02-27_12-58-updating-codebase-references-after-rename.md
- 2025-02-27_15-21-creating-requirements-txt-for-python-project.md
- 2025-02-27_21-18-using-local-fonts-in-css.md
- 2025-02-28_12-13-npm-run-dev-error-troubleshooting.md
- 2025-02-28_12-58-fixing-svg-glyph-loading-issues.md
- 2025-02-28_13-06-font-creation-error-troubleshooting.md
- 2025-02-28_13-11-font-creation-error-troubleshooting.md
- 2025-02-28_14-19-troubleshooting-font-creation-errors.md
- 2025-03-02_13-42-implementation-of-font-creation-changes.md
- 2025-03-02_22-31-troubleshooting-@canvas-ts-placeholder-glyph-issue.md
- 2025-03-02_23-19-font-glyph-preview-troubleshooting.md
- 2025-03-03_00-54-customizing-electron-app-window-styles.md
- 2025-03-03_14-22-path-tool-troubleshooting-in-font-creation.md
- 2025-03-03_16-45-refining-analytics-module-dashboard.md
- 2025-03-03_17-18-troubleshooting-build-font-button-issue.md
- 2025-03-03_17-26-font-loading-and-build-troubleshooting.md
- 2025-03-03_18-25-font-build-process-troubleshooting.md
- 2025-03-03_18-46-font-building-and-glyph-verification-process.md
- 2025-03-03_18-50-font-glyph-verification-process.md
- 2025-03-03_18-51-font-building-and-glyph-verification-process.md
- 2025-03-04_06-21-font-building-and-glyph-verification-process.md
- 2025-03-04_08-13-font-building-and-glyph-verification-process.md
- 2025-03-04_08-17-font-building-and-glyph-verification.md
- 2025-03-04_10-53-font-build-process-troubleshooting.md
- 2025-03-04_12-54-font-initialization-process-modification.md
- 2025-03-04_20-01-font-creation-process-debugging.md
- 2025-03-04_21-02-font-creation-app-build-pipeline-testing.md
- 2025-03-04_22-52-systematic-comment-tracking-for-code-dependencies.md
- 2025-03-05_09-13-untitled.md
- 2025-03-05_09-16-indexer-system-review-and-testing.md
- 2025-03-05_17-08-glyph-coordinate-system-consistency-issues.md
- 2025-03-05_20-44-font-building-app-error-troubleshooting.md
- 2025-03-05_21-02-font-building-app-troubleshooting.md
- 2025-03-06_09-13-modify-command-for-log-output.md
- 2025-03-06_09-18-font-building-app-troubleshooting.md
- 2025-03-06_10-03-font-build-error-troubleshooting.md
- 2025-03-06_10-04-font-build-error-troubleshooting.md
- 2025-03-06_10-07-error-analysis-for-font-building-app.md
- 2025-03-06_11-33-font-building-process-optimization.md
- 2025-03-06_14-43-untitled.md
- 2025-03-06_22-43-configuring-gemini-api-key.md
- 2025-03-06_23-14-testing-gemini-api-key-with-python.md
- 2025-03-07_00-22-font-building-app-ui-shortcut-conflict.md
- 2025-03-07_00-34-troubleshooting-font-creation-runtime-error.md
- 2025-03-07_03-08-font-app-gallery-grid-adjustment.md
- 2025-03-07_05-53-researching-desktop-app-window-styling-options.md
- 2025-03-07_17-20-stylistic-changes-for-gallery-component.md
- 2025-03-07_18-10-planning-the-new-analytics-module.md
- 2025-03-07_23-22-runique-font-test-module-ui-issues.md
- 2025-03-07_23-57-button-label-and-styling-update.md
- 2025-03-08_19-39-moving-build-font-button-in-runique.md
- 2025-03-08_20-27-runtime-error-in-font-creation-process.md
- 2025-03-08_22-04-runique-font-building-app-overview.md
- 2025-03-08_23-36-custom-cursor-setup-with-theme-color.md
- 2025-03-09_15-02-refining-font-creation-process.md
- 2025-03-09_15-55-runique-font-creation-implementation.md
- 2025-03-09_15-57-runique-font-creation-feature-expansion.md
- 2025-03-09_20-44-understanding-font-creation-modal-settings.md
- 2025-03-09_21-55-font-project-creation-error-analysis.md
- 2025-03-10_04-27-planning-document-for-new-path-tool-in-runique.md
- 2025-03-10_15-59-path-tool-overhaul-planning-for-runique.md
- 2025-03-11_15-26-refining-debug-log-structure-for-@run-sh.md
- 2025-03-11_17-16-updating-logging-system-in-codebase.md
- 2025-03-12_17-09-packaging-runique-app-for-macos.md
- 2025-03-12_23-07-refining-select-tool-specifications-for-runique.md
- 2025-03-13_00-30-path-reversion-issue-after-save.md
- 2025-03-13_00-56-untitled.md
- 2025-03-13_01-02-enhancing-path-hover-styling-in-@select-ts.md
- 2025-03-13_02-03-path-warping-issue-in-drawing-tool.md
- 2025-03-13_23-40-glyph-path-transformation-issues.md
- 2025-03-14_13-47-font-building-app-error-analysis.md
- 2025-03-14_15-07-custom-cursor-icon-variables-discussion.md
- 2025-03-14_16-52-canvas-module-settings-modal-update.md
- 2025-03-15_04-37-enhancing-@select-ts-for-cut-copy-paste-functionality.md
- 2025-03-15_21-25-path-movement-snapping-to-grid-in-select-tool.md
- 2025-03-16_16-42-cleaning-up-unused-directories-in-codebase.md
- 2025-03-18_16-40-backing-up-codebase-to-github.md
- 2025-03-18_19-52-production-app-font-creation-error.md
- 2025-03-21_16-25-transitioning-to-pipet-for-web-scraping.md
- 2025-03-21_16-49-guide-to-using-pipet-for-research.md
- 2025-03-21_17-28-understanding-font-storage-in-runique-production-build.md
- 2025-03-27_04-42-fixing-cmd-+-s-shortcut-for-saving-glyphs.md
- 2025-03-27_19-19-customizing-electron-app-window-colors.md
- 2025-03-28_19-12-statusbar-analytics-feature-implementation.md
- 2025-03-28_20-58-statusbar-refactor-implementation-discussion.md
- 2025-03-31_19-34-glyph-iteration-rendering-error.md
```

The intention, with saving these chats, was 1) to retain a development history of the project, and 2) to build a corpus of Ai code assistant dialogues in order to analyze and perhaps optimize communication patterns. Plus, I'm also just a data hoarder.

I ended up expanding the cursor rules framework significantly, using a regular .md file (000_rules_staging.md) to stage changes to the .mdc files in bulk using yaml code blocks, so the AI assistant could access all of them in a single file, and more easily map their integrations.

````
### @001_workspace.mdc

```yaml
---
description: Defines the relationship between development scaffolding (.cursor/) and project workspace, establishing clear boundaries and interaction patterns.
globs: src/**/*, backend/**/*
---

## Workspace Philosophy

1. Separation of Concerns
- Project space: Core functionality and implementation
- .cursor/: Development guidance and support only
- Clear boundaries between scaffolding and project

2. Scaffolding Principles
- Non-invasive: Support without interference
- Discoverable: Clear organization of development resources
- Portable: Scaffolding independent of project specifics
- Extensible: Framework for project-specific rules

3. Key Relationships
- Rules guide but don't restrict
- Documentation supports but doesn't define
- Tools assist but don't require

```

### @002_cursor_rules.mdc

```yaml
---
description: Standards for MDC rules as development scaffolding, defining how rules support and guide project development without constraining it.
globs: .cursor/rules/**/*.mdc
---
## Rule Framework

1. Core Purpose
- Provide development guidance
- Document conventions and patterns
- Support tool configuration
- Enable project-specific extensions

2. Rule Categories
- 000-019: Core scaffolding (workspace, rules, docs)
- 020-039: Development standards
- 040-059: Environment & platform
- 060-079: Integration & security
- 080-099: Project management
- 100+: Project-specific rules

3. Rule Structure
- Description: Clear purpose statement
- Globs: Relevant file patterns
- Content: Max 25 lines, markdown format
- Cross-references: Use @ notation

4. Best Practices
- Rules guide, don't enforce
- Support project needs
- Clear documentation
- Maintainable structure
```

### @003_cursor_docs.mdc

```yaml
---
description: Organization of development documentation as part of the workspace scaffolding.
globs: .cursor/docs/**/*
---
## Documentation Framework

1. Purpose
- Support development process
- Document patterns and decisions
- Guide without constraining
- Enable knowledge sharing

1. Organization
- /ref/: External references and standards
- /temp/: Work in progress documentation
- /arch/: Architecture and design docs
- Project docs live outside .cursor/

3. Best Practices
- Keep scaffolding docs in .cursor/docs
- Project documentation in project space
- Clear cross-references
- Regular maintenance
```
````

I did this for all of the following .mdc rule files:

```yaml
- 000_rules_staging.md
- 001_workspace.mdc
- 002_cursor_rules.mdc
- 003_cursor_docs.mdc
- 004_cursor_tools.mdc
- 005_python.mdc
- 006_os_mac.mdc
- 021_testing.mdc
- 022_delegate.mdc
- 023_debugging.mdc
- 024_versioning.mdc
- 025_comments.mdc
- 026_research.mdc
- 027_planning.mdc
- 062_security_preload.mdc
- 065_services.mdc
- 100_frontend.mdc
- 101_frontend_main.mdc
- 102_frontend_renderer.mdc
- 111_frontend_eventSystem.mdc
- 112_frontend_historySystem.mdc
- 113_frontend_fontOperations.mdc
- 114_frontend_commands.mdc
- 120_frontend_mod_canvas.mdc
- 121_frontend_mod_gallery.mdc
- 122_frontend_mod_toolbar.mdc
- 124_frontend_mod_fontTest.mdc
- 200_backend.mdc
- 201_backend_bridge.mdc
- 202_backend_fontInit.mdc
- 203_backend_buildPipeline.mdc
- 204_backend_svgConvert.mdc
- 310_fontsDirectory.mdc
- 311_iterationsMgmt.mdc
```

I also used [Tree-sitter](https://tree-sitter.github.io/tree-sitter/) to index the core backend and frontend files, to create indices such as this, for the code assistant to readily navigate integrations across the codebase at a high level:

```json
"version": "1.0",
"updated": "2025-03-31T11:16:19.693736",
"definitions": {
	"backend/build_pipeline.py#log_error": {
		"desc": "Log error with context and return formatted message",
		"loc": "backend/build_pipeline.py:41:55",
		"kind": "function"
	},
	"backend/build_pipeline.py#FontBuildPipeline": {
		"desc": "Pipeline for converting SVG glyphs to production-ready font files",
		"loc": "backend/build_pipeline.py:58:1300",
		"kind": "class"
	},
	"backend/build_pipeline.py#__init__": {
		"desc": "Initialize build pipeline with font configuration",
		"loc": "backend/build_pipeline.py:77:138",
		"kind": "function"
	},
	"backend/build_pipeline.py#build_all": {
		"desc": "Build all font styles or specified styles",
		"loc": "backend/build_pipeline.py:140:425",
		"kind": "function"
	},
	[...]
"_verbose": "index.full.json",
"stats": {
	"files_processed": 24,
	"total_definitions": 286,
	"modules_indexed": 19,
	"functions_indexed": 248,
	"classes_indexed": 19,
	"indexed_at": "2025-03-31T11:16:19.761078"
}
```

Additionally, I used a logging pipeline to systematically label and organize logs in development and production. I found this to be instrumental in debugging, because while most of the time I wouldn't know what is going wrong, if I can just share robust error logs with the code assistant, it would usually be able to ascertain and remedy the issue:

```yaml
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [DEBUG] [PathParsing] Starting SVG path parsing {"contentLength":12661}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [DEBUG] [PathParsing] Starting SVG path parsing {"contentLength":12661}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [DEBUG] [PathParsing] Starting SVG path parsing {"contentLength":12661}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [DEBUG] [PathParsing] Found path {"id":"path-1743450720586-0","pathPreview":"M 642.0454545454545 -480.1136363636364 L 644.88636..."}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [DEBUG] [PathParsing] Found path {"id":"path-1743450720586-0","pathPreview":"M 642.0454545454545 -480.1136363636364 L 644.88636..."}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [DEBUG] [PathParsing] Found path {"id":"path-1743450720586-0","pathPreview":"M 642.0454545454545 -480.1136363636364 L 644.88636..."}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [INFO] [PathParsing] SVG parsing complete {"glyphId":"glyph-1743450720586","pathCount":1,"paths":[{"id":"path-1743450720586-0","pathLength":12557,"pathPreview":"M 642.0454545454545 -480.1136363636364 L 644.88636..."}]}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [INFO] [PathParsing] SVG parsing complete {"glyphId":"glyph-1743450720586","pathCount":1,"paths":[{"id":"path-1743450720586-0","pathLength":12557,"pathPreview":"M 642.0454545454545 -480.1136363636364 L 644.88636..."}]}
[1] [2025-03-31T19:52:00.586Z] [FontService:process:FontService#parseSvgPath] [INFO] [PathParsing] SVG parsing complete {"glyphId":"glyph-1743450720586","pathCount":1,"paths":[{"id":"path-1743450720586-0","pathLength":12557,"pathPreview":"M 642.0454545454545 -480.1136363636364 L 644.88636..."}]}
```

Between the rule framework, the indexing, the logging, and a careful prompting strategy, an environment began to develop wherein the otherwise unwieldy AI assistant enables a single user, with only a couple scatter-brained months of software development experience, to advance their project closer and closer to a production-ready MVP.

![Image][https://www.arweave.net/K7KNgsqPIwHeVJru66TFMnnIDxe9Qbo6suSMGmwGLZI]

---

## Autodidactic Methodology

Continuing from [[Modular Generalist Program]] and [[Reflections on Applied Auto-Didactic Methodology]], this experience has reinforced the premise that self-guided education is much more effective when you're able to apply your learnings to some occupation or project, ideally something you are passionate about.

As for why this is, I suspect it has to do with practice as a means of transmuting knowledge from abstract to embodied. Without practice, as a means of applying knowledge, it can remain suspended in a more abstract stratum of our mind, whereas the iterative enacting of this knowledge can allow it to take root in deeper strata, so to speak.

Before experimenting with software development, or with programming more generally, I had little to no practical use of the computer science knowledge I had acquired online, from from excellent resources like CS50. This information interested me from an abstract perspective, in that it helped me appreciate the scope and architecture of our digital world, but it never become truly embodied because I didn't have anything to apply it to. Discovering such an occasion to practice truly catalyzed the process whereby this abstract knowledge became an embodied sensibility.