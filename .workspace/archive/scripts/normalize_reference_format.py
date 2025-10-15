#!/usr/bin/env python3
"""
Normalize 'reference:' property formatting in all zettel files.

This script:
1. Finds all files with 'type: zettel' in frontmatter
2. Converts 'reference:' from string format to list format
3. Preserves existing list format references
4. Maintains all other frontmatter and content
"""

import os
import re
import yaml
import argparse
from pathlib import Path
from typing import Dict, List, Optional, Tuple, Union


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


def normalize_reference_format(frontmatter: Dict) -> Tuple[Dict, bool]:
    """
    Normalize reference property to list format.
    Returns (updated_frontmatter, was_changed)
    """
    if "reference" not in frontmatter:
        return frontmatter, False

    reference = frontmatter["reference"]

    # If it's already a list, no change needed
    if isinstance(reference, list):
        return frontmatter, False

    # If it's a string, convert to list
    if isinstance(reference, str):
        frontmatter["reference"] = [reference]
        return frontmatter, True

    # If it's some other type, leave it alone
    return frontmatter, False


def main():
    """Main function to normalize reference formatting."""
    parser = argparse.ArgumentParser(
        description="Normalize reference property formatting in zettel files"
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

    # Find all zettel files
    zettel_files = []
    changes_needed = []

    for file_path in zettel_dir.glob("*.md"):
        print(f"Checking {file_path.name}...")

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            frontmatter, body = extract_frontmatter(content)

            # Check if this is a zettel
            if frontmatter.get("type") == "zettel":
                updated_frontmatter, changed = normalize_reference_format(frontmatter)

                if changed:
                    old_ref = frontmatter.get("reference", "None")
                    new_ref = updated_frontmatter.get("reference", "None")
                    print(f"  ✓ Found zettel with string reference: {file_path.name}")
                    changes_needed.append(
                        (file_path, updated_frontmatter, body, old_ref, new_ref)
                    )
                else:
                    if "reference" in frontmatter:
                        print(f"  - Already list format: {file_path.name}")
                    else:
                        print(f"  - No reference property: {file_path.name}")
            else:
                print(f"  - Skipping (not a zettel): {file_path.name}")

        except Exception as e:
            print(f"  ✗ Error reading {file_path.name}: {e}")

    if not changes_needed:
        print("\nNo files need reference format changes!")
        return

    print(
        f"\nFound {len(changes_needed)} files that need reference format normalization"
    )

    # Preview the changes
    print("\nProposed changes:")
    print("-" * 80)
    for file_path, _, _, old_ref, new_ref in changes_needed:
        print(f"{file_path.name}:")
        print(f"  Old: reference: {old_ref}")
        print(f"  New: reference:")
        print(f"    - {new_ref[0]}")  # new_ref is now a list
        print()

    # Ask for confirmation
    if args.auto_confirm:
        print("Auto-confirming format normalization...")
        response = "y"
    else:
        response = (
            input("Proceed with normalizing reference formatting? (y/N): ")
            .strip()
            .lower()
        )
        if response != "y":
            print("Aborted.")
            return

    # Perform the updates
    print("\nUpdating files...")
    for file_path, frontmatter, body, old_ref, new_ref in changes_needed:
        try:
            # Create new content with updated frontmatter
            new_content = create_frontmatter_content(frontmatter, body)

            # Write updated file
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(new_content)

            print(f"  ✓ Updated {file_path.name}")

        except Exception as e:
            print(f"  ✗ Error updating {file_path.name}: {e}")

    print(
        f"\nCompleted! Normalized reference formatting in {len(changes_needed)} files."
    )
    print("All reference properties now use consistent YAML list format.")


if __name__ == "__main__":
    main()
