#!/usr/bin/env python3
"""
Add 'z-' prefix to all Luhmann-numbered zettel files.

This script:
1. Finds all files in content/zettelgarten/r/ that match Luhmann numbering (1.md, 26a.md, etc.)
2. Renames them to add 'z-' prefix (z-1.md, z-26a.md, etc.)
3. Updates the 'zettel-id' field in frontmatter to match the new filename
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


def is_luhmann_numbered_file(filename: str) -> bool:
    """Check if filename matches Luhmann numbering pattern."""
    # Remove .md extension
    base = filename.replace(".md", "")

    # Pattern: number optionally followed by letters (1, 26a, 111, etc.)
    pattern = r"^\d+[a-z]*$"
    return bool(re.match(pattern, base))


def main():
    """Main function to add z- prefix to zettel files."""
    parser = argparse.ArgumentParser(
        description="Add z- prefix to Luhmann-numbered zettel files"
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

    # Find all Luhmann-numbered files
    luhmann_files = []

    for file_path in zettel_dir.glob("*.md"):
        if is_luhmann_numbered_file(file_path.name):
            print(f"Found Luhmann file: {file_path.name}")

            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()

                frontmatter, body = extract_frontmatter(content)
                luhmann_files.append((file_path, frontmatter, body))

            except Exception as e:
                print(f"  ✗ Error reading {file_path.name}: {e}")
        else:
            print(f"Skipping non-Luhmann file: {file_path.name}")

    if not luhmann_files:
        print("No Luhmann-numbered files found!")
        return

    print(f"\nFound {len(luhmann_files)} Luhmann-numbered files to rename")

    # Generate new names with z- prefix
    renames = []

    for file_path, frontmatter, body in luhmann_files:
        old_name = file_path.name
        old_id = file_path.stem  # filename without .md

        # Add z- prefix
        new_id = f"z-{old_id}"
        new_name = f"{new_id}.md"
        new_path = file_path.parent / new_name

        # Update frontmatter
        frontmatter["zettel-id"] = new_id

        renames.append((file_path, new_path, frontmatter, body, old_name, new_name))

    # Sort by number for clean output
    renames.sort(key=lambda x: x[4])  # Sort by old filename

    # Preview the changes
    print("\nProposed changes:")
    print("-" * 60)
    for old_path, new_path, _, _, old_name, new_name in renames:
        print(f"{old_name} → {new_name}")

    # Ask for confirmation
    if args.auto_confirm:
        print("\nAuto-confirming rename operation...")
        response = "y"
    else:
        response = input("\nProceed with adding z- prefix? (y/N): ").strip().lower()
        if response != "y":
            print("Aborted.")
            return

    # Perform the renaming
    print("\nRenaming files...")
    for old_path, new_path, frontmatter, body, old_name, new_name in renames:
        try:
            # Create new content with updated frontmatter
            new_content = create_frontmatter_content(frontmatter, body)

            # Write new file
            with open(new_path, "w", encoding="utf-8") as f:
                f.write(new_content)

            # Remove old file
            old_path.unlink()

            print(f"  ✓ {old_name} → {new_name}")

        except Exception as e:
            print(f"  ✗ Error renaming {old_name}: {e}")

    print(f"\nCompleted! Added z- prefix to {len(renames)} files.")
    print("All zettel files now have clear 'z-' prefix for identification.")


if __name__ == "__main__":
    main()
