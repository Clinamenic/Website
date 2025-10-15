---
aiContribution:
  aiModel: Claude 3.5 Sonnet
  aiRole: generative
  aiScope: Primary content generator, working from human direction and framework
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
date: 2025-02-15
language: en
license: CC BY-SA-4.0
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
subtitle: A Project Organization Guide for Cursor and .mdc files
title: Cursor Rules Framework
type: pre-spec
uuid: 05c023e3-0469-4105-a39e-b1b65c4ac84f
---

This guide describes how to implement a structured .mdc rules system in Cursor to enhance AI assistance and project organization.

## What Are .mdc Rules?

.mdc files are special configuration files that help Cursor's AI understand your project structure, conventions, and constraints. They live in the `.cursor/rules/` directory and automatically provide context when relevant files are accessed.

## Core Framework Structure

The framework consists of four fundamental .mdc files that work together to help Cursor's AI understand and navigate your project:

### 001_workspace.mdc (Required)

- **Purpose**: Root-level project definition and constraints
- **Scope**: Entire workspace
- **Content**: Define core architecture, key directories, and main constraints
- **Example Structure**:
  ```yaml
  Description: Brief overview of project purpose and main functions
  Globs: /**/*
  ```
  Body text should define:
  - Core project functions/components
  - Key directories and their purposes
  - Primary constraints/rules
  - Keep under 25 lines, be concise

### 002_cursor_rules.mdc (Required)

- **Purpose**: Defines how .mdc files work and should be structured
- **Scope**: .cursor/rules directory
- **Content**: Standard template below:

  ```yaml
  Description: .mdc files describe specific rules for how certain files, file types, and directories are to be understood and used
  Globs: .cursor/rules/*.mdc
  ```

  Body text standard template:

  ```
  .mdc File Structure & Best Practices:

  File Naming: NNN_name.mdc (NNN = 001-299)
  - 001-099: Core/workspace rules
  - 100-199: Integration rules
  - 200-299: Pattern rules
  Higher numbers take precedence if rules conflict

  UI Components:
  1. Description (top)
     - Brief purpose summary
     - Appears in AI context

  2. Globs (top)
     - Comma-separated list
     - Example: /dir1/**/*,/dir2/**/*,/dir3/**/*
     - Use standard glob syntax

  3. Body Text (this section)
     - Keep under 25 lines
     - Use concise/shorthand
     - Tag files with @
     - Focus on key directives

  Best Practice: The assistant may propose changes to .mdc files for the user to copy into the UI. The assistant should not attempt direct file edits to .mdc files.
  ```

### 003_cursor_docs.mdc (Recommended)

- **Purpose**: Organizes project documentation
- **Scope**: .cursor/docs directory
- **Example Structure**:
  ```yaml
  Description: These files contain reference documentation and guides to aid in development efforts
  Globs: .cursor/docs/**/*
  ```
  Body text should define:
  - Documentation categories
  - File organization rules
  - Cross-referencing conventions

### 004_cursor_tools.mdc (Recommended)

- **Purpose**: Manages development tools and scripts
- **Scope**: .cursor/tools directory
- **Example Structure**:
  ```yaml
  Description: This folder contains tools and scripts to aid in workspace efforts
  Globs: .cursor/tools/**/*,.cursor/tools/temp/**/*
  ```
  Body text should define:
  - Tool categories
  - Usage patterns
  - Temporary vs. permanent tools

## Detailed Implementation Steps

1. **Initial Setup**:

   ```bash
   mkdir -p .cursor/rules
   mkdir -p .cursor/docs
   mkdir -p .cursor/tools/temp
   ```

2. **Create Core Rules**:

   - Create each .mdc file through Cursor's UI
   - Start with 002_cursor_rules.mdc (use template exactly as shown)
   - Then create 001_workspace.mdc (customize to your project)
   - Add 003 and 004 as needed

3. **UI Navigation**:

   - Access rules through Cursor's Settings
   - Use the Description and Globs fields at top
   - Use the larger text editor for body content
   - Save changes through UI (not direct file edits)

4. **Testing Implementation**:
   - Verify rules load when accessing relevant files
   - Check AI responses reference appropriate rules
   - Ensure @ tags work for cross-references

## How Cursor's AI Uses These Rules

1. **Hierarchical Understanding**:

   - 001: Understands overall project scope
   - 002: Knows how to interpret other rules
   - 003/004: Understands where to find/place resources

2. **Context Loading**:

   - Rules automatically load when relevant files are accessed
   - Higher-numbered rules take precedence
   - @ tags create cross-references

3. **AI Behavior**:
   - Uses rules to guide suggestions and actions
   - References appropriate documentation
   - Places new files in correct locations
   - Maintains project structure

## Best Practices

1. Keep rules concise (under 25 lines)
2. Use @ tags for file references
3. Make changes through Cursor UI only
4. Maintain clear separation of concerns
5. Document rule changes
6. Test rule effectiveness
7. Use consistent naming conventions
8. Keep globs specific and targeted

## Troubleshooting

1. **Changes Not Showing**:

   - Always make changes through UI
   - If changes vanish, close Cursor
   - Select "Override" on unsaved changes prompt
   - Reopen Cursor

2. **Rules Not Loading**:
   - Verify file names follow NNN_name.mdc format
   - Check glob patterns are correct
   - Ensure no syntax errors in YAML

Remember: This framework is adaptable. While 002-004 can remain fairly standard, 001_workspace.mdc should be thoroughly customized to your project's specific needs and constraints.

## References

- https://forum.cursor.com/t/my-best-practices-for-mdc-rules-and-troubleshooting/50526
