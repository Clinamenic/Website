---
title: Arweave TUI Uploader Scoping
date: 2024-04-18
type: scope
status: draft
aiContribution: full
uuid: 8c1f6d2a-e0e4-4c7d-b8c6-9f0c9d8e3f2b
---

## Overview

A text-based user interface (TUI) for uploading content to Arweave and managing the index file (using `test.json` during development/testing). This tool will provide an interactive way to select files from the `content/` directory, preview their content and estimated upload costs in a queue, and manage the upload process.

## Core Requirements

1. File Selection Interface

   - Tree-based directory explorer confined to `content/` directory
   - Expandable/collapsible subdirectories using arrow keys or `[+/-]` keys
   - Checkbox-based file selection for multiple files. Toggling a checkbox directly adds/removes the file from the upload queue.
   - Show current Arweave status (if already uploaded)
   - Keyboard shortcuts for navigation and selection
   - Ability to select/deselect all files in a directory

2. Upload Management & Preview Queue

   - The upload queue is managed directly by selecting/deselecting files via checkboxes in the main tree view.
   - Integration with `arkb` for Arweave uploads
   - Wallet balance checking and cost estimation displayed per file and total (dynamically updated in the main view based on queued files).
   - Batch upload support via a preview queue screen for final confirmation.
   - Progress tracking for multiple uploads
   - Automatic index updates in `test.json` (configurable for production use, e.g., `data/arweave.json`)
   - UUID-based transaction tagging
   - Standard metadata tags (Content-Type, App-Name, etc.)

3. Configuration

   - Environment variable support for wallet path
   - Configurable content directory paths
   - Optional auto-confirmation settings
   - Customizable tag templates
   - Default tag configuration
   - Configurable index file path (defaults to `test.json` for testing)
   - Saved directory expansion state

4. Logging
   - Live logging of key events and errors to `.cursor/tools/arweave/arweave_uploader.log`.
   - Log events include: App start/stop, file selection/deselection (queue changes), cost estimation updates, upload initiation, upload success/failure per file, and detailed error messages.
   - Configurable log level (e.g., INFO, DEBUG, ERROR).

## Technical Specifications

1. Dependencies

   ```python
   # Core dependencies
   from pathlib import Path
   import frontmatter
   import subprocess
   import logging
   from typing import TypedDict, List, Dict
   from datetime import datetime, UTC

   # TUI dependencies
   from textual.app import App
   from textual.widgets import Tree, DirectoryTree, Static
   from textual.widgets import Header, Footer, Checkbox
   from textual.containers import Container, Horizontal, Vertical
   from rich.console import Console
   from rich.table import Table
   from rich.progress import Progress
   ```

2. Data Structures

   ```python
   class DirectoryState(TypedDict):
       expanded: bool
       selected_files: List[str]

   class ArweaveTag(TypedDict):
       name: str
       value: str

   class ArweaveHash(TypedDict):
       hash: str
       timestamp: str
       link: str
       tags: List[ArweaveTag]

   class ArweaveFile(TypedDict):
       uuid: str
       title: str
       latest_content: str
       latest_update: str
       arweave_hashes: List[ArweaveHash]

   DEFAULT_TAGS = [
       ArweaveTag(name="Content-Type", value="text/markdown"),
       ArweaveTag(name="App-Name", value="Quartz-Notes"),
       ArweaveTag(name="Type", value="note-version")
   ]
   ```

3. Key Functions
   ```python
   async def build_directory_tree(root: Path) -> Tree
   async def handle_directory_toggle(tree: Tree, path: Path) -> None
   async def handle_file_toggle_queue(tree: Tree, path: Path) -> None
   async def get_queued_files(tree: Tree) -> List[Path]
   async def preview_file_content(path: Path) -> str
   async def estimate_upload_cost(files: List[Path]) -> float
   async def prepare_upload_tags(file: Path, default_tags: List[ArweaveTag]) -> List[ArweaveTag]
   async def upload_to_arweave(file: Path, tags: List[ArweaveTag]) -> str
   async def setup_logging() -> None
   async def update_index(files: List[Path], hashes: List[str], tags: Dict[str, List[ArweaveTag]])
   ```

## Implementation Plan

1. Phase 1: Core Infrastructure

   - Set up Textual app framework
   - Configure logging to `.cursor/tools/arweave/arweave_uploader.log`
   - Implement directory tree widget
   - Add checkbox selection functionality that directly manages an internal queue
   - Create preview pane for file content
   - Implement directory state management
   - Add keyboard navigation support
   - Implement tag preparation logic

2. Phase 2: Arweave Integration & Upload Queue

   - Integrate `arkb` command execution
   - Add wallet balance checking
   - Implement dynamic cost estimation based on the queue
   - Create upload queue preview and confirmation screen
   - Add UUID and metadata tagging

3. Phase 3: Index Management

   - Add `test.json` parsing/updating logic
   - Implement batch processing
   - Add progress tracking
   - Create summary reporting
   - Store tag information in index
   - Partial batch completion (with logging)
   - Index consistency checks (with logging, targeting `test.json`)
   - Tag verification

4. Phase 4: Polish & Testing
   - Add error handling
   - Implement retry logic
   - Add confirmation dialogs
   - Create help documentation
   - Add tag validation

## User Interface Flow

1. Main File Selection & Upload Interface

   ```
   ┌─ Content Directory Tree (Toggle Checkbox to Queue/Dequeue) ┐ ┌─ File Preview ─────────────────┐
   │ [+] content/                                            │ │                                │
   │ ├── [-] writing/                                        │ │ Selected: file1.md             │
   │ │   ├── [x] file1.md <- Queued                        │ │ UUID: abc-123-...              │
   │ │   ├── [ ] file2.md                                    │ │ Title: Example File            │
   │ │   └── [x] file3.md <- Queued                        │ │ Status: Not uploaded           │
   │ ├── [+] zettelgarten/                                  │ │                                │
   │ └── [+] resources/                                     │ │ Content Preview:               │
   │                                                          │ │ ---                           │
   │ Queued: 2 files                                         │ │ title: Example File           │
   │ Total Est. Cost (Queued): 0.000357 AR                   │ │ date: 2024-04-18             │
   │                                                          │ │ ...                           │
   │ [Space] Toggle Selection (Queue/Dequeue)                │ │                                │
   │ [Enter] Toggle Directory                                │ │                                │
   │ [A] Select All                                          │ │                                │
   └──────────────────────────────────────────────────────────┘ └────────────────────────────────┘

   Commands: [p]review upload queue [q]uit [r]efresh [h]elp
   ```

2. Upload Queue & Cost Preview (Confirmation Step)

   ```
   --- Upload Queue & Cost Preview ---

   Confirm Upload for Queued Files (3):
   ┌────────────────────┬──────────┬─────────────┬────────────────────┐
   │ File               │ Status   │ Est. Cost   │ UUID               │
   ├────────────────────┼──────────┼─────────────┼────────────────────┤
   │ content/writing/file1.md │ New      │ 0.000123 AR │ abc-123-...        │
   │ content/writing/file3.md │ New      │ 0.000145 AR │ ghi-789-...        │
   │ content/.../other.md │ Updated  │ 0.000089 AR │ def-456-...        │
   └────────────────────┴──────────┴─────────────┴────────────────────┘
   Total Estimated Cost: 0.000357 AR
   Current Wallet Balance: 1.234567 AR

   Default Tags to be Applied:
   - Content-Type: text/markdown
   - App-Name: Quartz-Notes
   - Type: note-version
   - Note-UUID: [file-specific UUID extracted from frontmatter]

   [C]onfirm Upload  [B]ack to File Selection
   ```

## Error Handling

1. Pre-upload Checks

   - Wallet availability
   - File accessibility
   - Balance sufficiency
   - Network connectivity
   - UUID presence in frontmatter
   - Tag validity

2. Upload Recovery
   - Automatic retry on failure (with logging)
   - Transaction verification (with logging)
   - Partial batch completion (with logging)
   - Index consistency checks (with logging, targeting `test.json`)
   - Tag verification

## Success Criteria

1. Functionality

   - Successfully upload files to Arweave
   - Accurately update `test.json` (or configured index file)
   - Maintain data consistency
   - Handle errors gracefully
   - Proper tag application

2. User Experience

   - Intuitive file selection
   - Clear progress indication
   - Helpful error messages
   - Efficient batch operations
   - Tag preview and validation

3. Performance
   - Quick file scanning
   - Responsive search
   - Efficient batch uploads
   - Minimal resource usage
   - Fast tag processing

## Future Enhancements

1. Additional Features

   - Content validation
   - Custom tag management
   - Upload scheduling
   - Backup/restore
   - Advanced tag templates

2. Integration Options
   - Web interface
   - API endpoints
   - Webhook notifications
   - External service integration
   - Tag-based content discovery
