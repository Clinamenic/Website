#!/usr/bin/env python3
"""
Rename zettel notes in zettelgarten/r/ to Luhmann's numbering system.

This script:
1. Finds all files in content/zettelgarten/r/ with 'type: zettel' in frontmatter
2. Renames them using Luhmann's system (1.md, 1a.md, 2.md, etc.)
3. Adds 'zettel-id:' frontmatter property
4. Adds 'zettel-legacy-id:' property with the old filename
5. Preserves Hub notes and other non-zettel files
"""

import os
import re
import yaml
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple


def extract_frontmatter(content: str) -> Tuple[Dict, str]:
    """Extract YAML frontmatter from markdown content."""
    if not content.startswith("---"):
        return {}, content

    try:
        parts = content.split("---", 2)
        if len(parts) < 3:
            return {}, content

        frontmatter = yaml.safe_load(parts[1])
        body = parts[2]
        return frontmatter or {}, body
    except yaml.YAMLError:
        return {}, content


def create_frontmatter_content(frontmatter: Dict, body: str) -> str:
    """Recreate markdown content with updated frontmatter."""
    yaml_content = yaml.dump(frontmatter, default_flow_style=False, allow_unicode=True)
    return f"---\n{yaml_content}---{body}"


def parse_legacy_id(filename: str) -> Tuple[str, Optional[str], int]:
    """Parse legacy ID to extract components for sorting."""
    # Remove .md extension
    base = filename.replace(".md", "")

    # Pattern: r-AuthorInitials-TitleInitials-Number[.SubNumber]
    pattern = r"r-([A-Z]+)-([A-Z]+)-(\d+)(?:\.(\d+))?"
    match = re.match(pattern, base)

    if not match:
        # Fallback: extract number from end
        num_match = re.search(r"(\d+)(?:\.(\d+))?$", base)
        if num_match:
            main_num = int(num_match.group(1))
            sub_num = int(num_match.group(2)) if num_match.group(2) else None
            return base, None, main_num
        return base, None, 0

    author_initials = match.group(1)
    title_initials = match.group(2)
    main_num = int(match.group(3))
    sub_num = int(match.group(4)) if match.group(4) else None

    return f"{author_initials}-{title_initials}", sub_num, main_num


def generate_luhmann_id(index: int, sub_index: Optional[int] = None) -> str:
    """Generate Luhmann-style ID."""
    if sub_index is None:
        return str(index)
    else:
        # Convert decimal sub-numbering to alphabetic
        # .1 -> a, .2 -> b, etc.
        alpha_suffix = chr(ord("a") + sub_index - 1)
        return f"{index}{alpha_suffix}"


def main():
    """Main function to rename zettel files."""
    parser = argparse.ArgumentParser(
        description="Rename zettel files to Luhmann numbering system"
    )
    parser.add_argument(
        "--auto-confirm",
        action="store_true",
        help="Automatically proceed without confirmation prompt",
    )
    args = parser.parse_args()

    zettel_dir = Path("content/zettelgarten/r")

    if not zettel_dir.exists():
        print(f"Directory {zettel_dir} does not exist!")
        return

    print(f"Processing files in {zettel_dir}")

    # Find all markdown files with 'type: zettel'
    zettel_files = []

    for file_path in zettel_dir.glob("*.md"):
        print(f"Checking {file_path.name}...")

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            frontmatter, body = extract_frontmatter(content)

            # Check if this is a zettel (not a Hub note)
            if frontmatter.get("type") == "zettel":
                zettel_files.append((file_path, frontmatter, body))
                print(f"  ✓ Found zettel: {file_path.name}")
            else:
                print(f"  - Skipping (not a zettel): {file_path.name}")

        except Exception as e:
            print(f"  ✗ Error reading {file_path.name}: {e}")

    if not zettel_files:
        print("No zettel files found!")
        return

    print(f"\nFound {len(zettel_files)} zettel files to rename")

    # Sort files by their legacy numbering to maintain order
    def sort_key(item):
        file_path, _, _ = item
        prefix, sub_num, main_num = parse_legacy_id(file_path.name)
        return (prefix or "", main_num, sub_num or 0)

    zettel_files.sort(key=sort_key)

    # Generate new names and track renaming
    renames = []
    next_id = 1

    for file_path, frontmatter, body in zettel_files:
        legacy_id = file_path.stem  # filename without .md
        prefix, sub_num, main_num = parse_legacy_id(file_path.name)

        # Generate new Luhmann ID
        new_id = generate_luhmann_id(next_id, sub_num)
        new_filename = f"{new_id}.md"
        new_path = file_path.parent / new_filename

        # Update frontmatter
        frontmatter["zettel-id"] = new_id
        frontmatter["zettel-legacy-id"] = legacy_id

        renames.append((file_path, new_path, frontmatter, body, legacy_id, new_id))

        # Increment ID for next file (but only for main numbers, not sub-numbers)
        if sub_num is None:
            next_id += 1

    # Preview the changes
    print("\nProposed changes:")
    print("-" * 60)
    for old_path, new_path, _, _, legacy_id, new_id in renames:
        print(f"{old_path.name} → {new_path.name}")
        print(f"  Legacy ID: {legacy_id}")
        print(f"  New ID: {new_id}")
        print()

    # Ask for confirmation
    if args.auto_confirm:
        print("Auto-confirming rename operation...")
        response = "y"
    else:
        response = input("Proceed with renaming? (y/N): ").strip().lower()
        if response != "y":
            print("Aborted.")
            return

    # Perform the renaming
    print("\nRenaming files...")
    for old_path, new_path, frontmatter, body, legacy_id, new_id in renames:
        try:
            # Create new content with updated frontmatter
            new_content = create_frontmatter_content(frontmatter, body)

            # Write new file
            with open(new_path, "w", encoding="utf-8") as f:
                f.write(new_content)

            # Remove old file
            old_path.unlink()

            print(f"  ✓ {old_path.name} → {new_path.name}")

        except Exception as e:
            print(f"  ✗ Error renaming {old_path.name}: {e}")

    print(f"\nCompleted! Renamed {len(renames)} files to Luhmann system.")
    print("\nNext steps:")
    print("1. Update any internal links to use the new filenames")
    print("2. Update the zettelgarten.md index if needed")
    print("3. Consider creating a register.md file for topic-based navigation")


if __name__ == "__main__":
    main()
