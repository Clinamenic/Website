#!/usr/bin/env python3
"""
Append Obsidian-style six-character block IDs (e.g., ^abc123) to every non-heading
Markdown block in the given file. Skips YAML frontmatter and fenced code blocks.

Rules implemented:
- A "block" is a contiguous set of non-empty lines separated by one or more blank lines.
- For each block, append the ID to the last line of the block, unless:
  - The last line is a Markdown heading (starts with 1-6 '#'), or
  - The last line already contains a trailing caret ID ( ^xxxxxx ), or
  - The line is inside YAML frontmatter, or
  - The line is inside a fenced code block (``` or ~~~).
- Existing IDs are preserved. Newly generated IDs are unique within the file and
  do not collide with existing IDs.

Usage:
  python3 scripts/append_obsidian_block_ids.py /absolute/path/to/file.md
"""

from __future__ import annotations

import os
import re
import sys
import random
import string
from typing import List, Set


HEADING_RE = re.compile(r"^\s{0,3}#{1,6}(\s|$)")
FENCE_RE = re.compile(r"^\s{0,3}(```|~~~)")
BLOCK_ID_TRAILING_RE = re.compile(r"\s\^[A-Za-z0-9]{6}\s*$")
BLOCK_ID_CAPTURE_RE = re.compile(r"\^([A-Za-z0-9]{6})\b")
YAML_DELIM_RE = re.compile(r"^\s*---\s*$")


def generate_unique_id(used: Set[str]) -> str:
    alphabet = string.ascii_lowercase + string.digits
    while True:
        candidate = "".join(random.choice(alphabet) for _ in range(6))
        if candidate not in used:
            used.add(candidate)
            return candidate


def append_block_ids(lines: List[str]) -> List[str]:
    # Collect existing IDs to avoid collisions
    used_ids: Set[str] = set()
    for line in lines:
        for match in BLOCK_ID_CAPTURE_RE.findall(line):
            used_ids.add(match)

    output = list(lines)

    inside_frontmatter = False
    frontmatter_delims_seen = 0
    inside_fence = False

    current_block_indices: List[int] = []

    def flush_block():
        nonlocal output, current_block_indices
        if not current_block_indices:
            return
        # Last non-empty line of the block
        last_idx = current_block_indices[-1]
        last_line = output[last_idx]

        # Skip if heading
        if HEADING_RE.match(last_line):
            current_block_indices = []
            return
        # Skip if already has trailing block id
        if BLOCK_ID_TRAILING_RE.search(last_line):
            current_block_indices = []
            return

        # Append id
        new_id = generate_unique_id(used_ids)
        output[last_idx] = last_line.rstrip("\n").rstrip() + f" ^{new_id}\n"
        current_block_indices = []

    for i, line in enumerate(output):
        # YAML frontmatter handling
        if frontmatter_delims_seen < 2 and YAML_DELIM_RE.match(line):
            frontmatter_delims_seen += 1
            if frontmatter_delims_seen == 1:
                inside_frontmatter = True
            elif frontmatter_delims_seen == 2:
                inside_frontmatter = False
            # Delimiter lines are their own blocks; ensure we don't append into frontmatter
            current_block_indices = []
            continue

        if inside_frontmatter:
            # Do not track blocks in frontmatter
            continue

        # Fenced code handling
        if FENCE_RE.match(line):
            # Flushing any block before toggling fence status
            if not inside_fence:
                flush_block()
            inside_fence = not inside_fence
            continue

        if inside_fence:
            # Ignore lines inside fences
            continue

        # Block detection by blank lines
        if line.strip() == "":
            flush_block()
            continue

        # Non-empty content line: track as part of current block
        current_block_indices.append(i)

    # Flush at EOF
    flush_block()

    return output


def main() -> None:
    if len(sys.argv) != 2:
        print(
            "Usage: python3 scripts/append_obsidian_block_ids.py /absolute/path/to/file.md",
            file=sys.stderr,
        )
        sys.exit(2)

    target_path = sys.argv[1]
    if not os.path.isabs(target_path):
        print("Please provide an absolute path to the Markdown file.", file=sys.stderr)
        sys.exit(2)

    if not os.path.exists(target_path):
        print(f"File not found: {target_path}", file=sys.stderr)
        sys.exit(1)

    with open(target_path, "r", encoding="utf-8") as f:
        lines = f.readlines()

    updated = append_block_ids(lines)

    # Write back only if changes occurred
    if updated != lines:
        with open(target_path, "w", encoding="utf-8") as f:
            f.writelines(updated)
        print(f"Appended block IDs where needed: {target_path}")
    else:
        print("No changes were necessary.")


if __name__ == "__main__":
    # Seed for better randomness uniqueness per run
    random.seed()
    main()









