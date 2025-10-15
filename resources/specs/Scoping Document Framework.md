---
aiContribution:
  aiModel: Gemini 2.5 Pro
  aiRole: Primary content generator
  aiScope: Generated initial framework based on user requirements and examples
author:
  - Spencer Saar Cavanaugh
authorURL:
  - https://www.clinamenic.com
date:
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
subtitle: A Standardized Approach for Creating Scoping Documents in the Workspace
title: Scoping Document Framework
type: pre-spec
uuid: 0dc806e0-ce85-4049-8510-6e302d4c8c1c
---

## 1. Introduction

This document outlines a standardized framework and template for creating scoping documents within this workspace. The goal is to establish a consistent structure and set of metadata for defining the scope, objectives, background, proposed solutions, and implementation considerations for various projects, technical reviews, or feature proposals. This consistency aids in clarity, maintainability, and potential automated processing or analysis of scoping efforts.

These documents often serve as initial blueprints or detailed technical analyses, frequently involving collaboration between humans and AI assistants. This framework aims to make that collaboration transparent and ensure essential project details are captured effectively.

## 2. Standardized Frontmatter

All scoping documents should utilize the following YAML frontmatter structure, based on `private/templates/Template Scoping.md`. Fields should be filled appropriately for each document.

```yaml
---
title: "[Document Title]" # Required: Clear and concise title
author:
  - Spencer Saar Cavanaugh # Default, modify if others contribute significantly
authorURL:
  - https://www.clinamenic.com # Default
date: "[YYYY-MM-DD]" # Required: Date of creation or last significant revision
subtitle: "[Brief Subtitle Explaining Scope]" # Optional: Provides additional context
aiContribution: # Required: Details AI involvement
  aiRole: "[Role of AI]" # e.g., Primary content generator, Research assistant, Editor, None
  aiModel: "[AI Model Name/Version]" # e.g., Claude 3.5 Sonnet, Gemini 2.5 Pro, N/A
  aiScope: "[Description of AI Contribution]" # e.g., Generated initial draft from outline, Analyzed provided data, Refined language, N/A
language: en # Default: Language code (ISO 639-1)
publish: true # Default: Set to false for drafts not ready for public view (if applicable)
arweaveTrack: true # Default: Indicates if the document should be tracked for Arweave integration
uuid: "[Universally Unique Identifier]" # Required: Generate using the Templater function
license: CC BY-SA-4.0 # Default: Creative Commons license, adjust if needed
quartzShowTitle: true
quartzShowSubtitle: true
quartzShowTOC: true
quartzShowExplorer: true
quartzShowBacklinks: true
quartzShowCitation: true
quartzShowFlex: true
quartzShowGraph: true
quartzSearch: true
---
```

### Key Frontmatter Fields

- **`title`**: A clear, descriptive title for the scoping document.
- **`date`**: The date the document was created or significantly updated. Use the Templater snippet `<% tp.date.now("YYYY-MM-DD") %>` for automatic insertion.
- **`aiContribution`**: A mandatory object detailing AI involvement:
  - `aiRole`: Specifies the primary function the AI served (e.g., generator, assistant, editor). Use "None" if no AI was used.
  - `aiModel`: Specifies the AI model(s) used. Use "N/A" if no AI was used.
  - `aiScope`: Briefly describes _how_ the AI contributed. Use "N/A" if no AI was used.
- **`uuid`**: A unique identifier for the document. Use the provided Templater function `generateUUID()` for automatic generation.
- **`license`**: Specifies the content license. Defaults to `CC BY-SA-4.0`.

## 3. Proposed Document Structure (Flexible Framework)

While the specific sections may vary depending on the nature of the scoping task (e.g., technical analysis vs. service definition), the following structure provides a flexible baseline. Adapt, add, or remove sections as necessary.

### Core Sections

1.  **Introduction / Overview:**
    - State the purpose and goals of the document.
    - Briefly define the problem or opportunity being addressed.
    - Summarize the scope of the work or analysis.
2.  **Background / Context:**
    - Provide relevant context, history, or existing information.
    - Reference related documents, systems, or prior work.
    - (If applicable) Discuss relevant existing standards, schemas, or technologies (e.g., `Schema.org`, `Arweave`, `RDF` as seen in examples).
3.  **Proposed Solution / Framework / Analysis:**
    - Detail the proposed approach, design, or findings.
    - Break down the core components or elements of the proposal.
    - For technical analyses: Present the in-depth evaluation (e.g., `Integrating Quartz and Arwiki.md`).
    - For definitions: Provide the structure or schema (e.g., `Service Schema Scoping.md`).
4.  **Implementation Considerations / Plan:**
    - Discuss practical aspects of implementation, potential challenges, or technical details.
    - Outline potential phases, steps, or milestones.
    - Identify dependencies or prerequisites.
5.  **Key Features / Components (Optional but Recommended):**
    - List specific features, components, or deliverables in more detail.
    - Use bullet points or numbered lists for clarity.
6.  **Open Questions / Next Steps:**
    - List any unresolved questions or areas needing further investigation.
    - Outline the immediate next steps following the scoping document.
7.  **Works Cited / References (Optional):**
    - If external sources were consulted or referenced heavily, include a list here. Use a consistent citation style.

### Flexibility

- The order and naming of sections can be adjusted for clarity.
- Combine sections where logical (e.g., Introduction and Background).
- Add specific sections relevant to the domain (e.g., "Security Considerations," "Cost Analysis," "User Experience").
- Use subheadings (H3, H4) liberally to structure complex sections.

## 4. Examples

Refer to the following documents as examples of applying similar (though not yet fully standardized) structures:

- [[Integrating Quartz and Arwiki]]: Example of a detailed technical review and integration plan.
- [[Service Schema Scoping]]]: Example of defining a data schema for service offerings.

## 5. Conclusion

This framework provides a standardized yet flexible approach to creating scoping documents. Adhering to the frontmatter requirements, particularly the `aiContribution` section, ensures consistency and transparency. The proposed structure serves as a robust starting point, adaptable to the specific needs of diverse scoping tasks within the workspace.
