#!/usr/bin/env python3
"""
Script to update all internal links from old r-JK-GT- format to new z- format
after the zettelkasten migration to Luhmann numbering system.
"""

import os
import re
import glob
from pathlib import Path

# Mapping from old r-JK-GT- names to new z- names
# This mapping is based on the Luhmann numbering system migration
ZETTEL_MAPPING = {
    "r-JK-GT-1": "z-1",
    "r-JK-GT-2": "z-2",
    "r-JK-GT-3": "z-3",
    "r-JK-GT-4": "z-4",
    "r-JK-GT-5": "z-5",
    "r-JK-GT-6": "z-6",
    "r-JK-GT-7": "z-7",
    "r-JK-GT-8": "z-8",
    "r-JK-GT-9": "z-9",
    "r-JK-GT-10": "z-10",
    "r-JK-GT-11": "z-11",
    "r-JK-GT-12": "z-12",
    "r-JK-GT-13": "z-13",
    "r-JK-GT-14": "z-14",
    "r-JK-GT-15": "z-15",
    "r-JK-GT-16": "z-16",
    "r-JK-GT-17": "z-17",
    "r-JK-GT-18": "z-18",
    "r-JK-GT-19": "z-19",
    "r-JK-GT-20": "z-20",
    "r-JK-GT-21": "z-21",
    "r-JK-GT-22": "z-22",
    "r-JK-GT-23": "z-23",
    "r-JK-GT-24": "z-24",
    "r-JK-GT-25": "z-25",
    "r-JK-GT-25.1": "z-25a",
    "r-JK-GT-26": "z-26",
    "r-JK-GT-26.1": "z-26a",
    "r-JK-GT-27": "z-27",
    "r-JK-GT-28": "z-28",
    "r-JK-GT-29": "z-29",
    "r-JK-GT-30": "z-30",
    "r-JK-GT-31": "z-31",
    "r-JK-GT-32": "z-32",
    "r-JK-GT-33": "z-33",
    "r-JK-GT-34": "z-34",
    "r-JK-GT-35": "z-35",
    "r-JK-GT-36": "z-36",
    "r-JK-GT-37": "z-37",
    "r-JK-GT-38": "z-38",
    "r-JK-GT-39": "z-39",
    "r-JK-GT-40": "z-40",
    "r-JK-GT-41": "z-41",
    "r-JK-GT-42": "z-42",
    "r-JK-GT-43": "z-43",
    "r-JK-GT-44": "z-44",
    "r-JK-GT-45": "z-45",
    "r-JK-GT-46": "z-46",
    "r-JK-GT-47": "z-47",
    "r-JK-GT-48": "z-48",
    "r-JK-GT-49": "z-49",
    "r-JK-GT-50": "z-50",
    "r-JK-GT-51": "z-51",
    "r-JK-GT-52": "z-52",
    "r-JK-GT-53": "z-53",
    "r-JK-GT-54": "z-54",
    "r-JK-GT-55": "z-55",
    "r-JK-GT-56": "z-56",
    "r-JK-GT-57": "z-57",
    "r-JK-GT-58": "z-58",
    "r-JK-GT-59": "z-59",
    "r-JK-GT-60": "z-60",
    "r-JK-GT-61": "z-61",
    "r-JK-GT-62": "z-62",
    "r-JK-GT-63": "z-63",
    "r-JK-GT-64": "z-64",
    "r-JK-GT-65": "z-65",
    "r-JK-GT-66": "z-66",
    "r-JK-GT-67": "z-67",
    "r-JK-GT-68": "z-68",
    "r-JK-GT-69": "z-69",
    "r-JK-GT-70": "z-70",
    "r-JK-GT-71": "z-71",
    "r-JK-GT-72": "z-72",
    "r-JK-GT-73": "z-73",
    "r-JK-GT-74": "z-74",
    "r-JK-GT-75": "z-75",
    "r-JK-GT-76": "z-76",
    "r-JK-GT-77": "z-77",
    "r-JK-GT-78": "z-78",
    "r-JK-GT-79": "z-79",
    "r-JK-GT-80": "z-80",
    "r-JK-GT-81": "z-81",
    "r-JK-GT-82": "z-82",
    "r-JK-GT-83": "z-83",
    "r-JK-GT-84": "z-84",
    "r-JK-GT-85": "z-85",
}


def update_links_in_file(file_path):
    """Update all r-JK-GT- links to z- links in a single file."""
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()

        original_content = content
        changes_made = 0

        # Update all the old-style links
        for old_name, new_name in ZETTEL_MAPPING.items():
            # Pattern to match [[r-JK-GT-X]] or [[r-JK-GT-X.Y]] in various contexts
            patterns = [
                rf"\[\[{re.escape(old_name)}\]\]",  # Standard wiki link
                rf"!\[\[{re.escape(old_name)}\]\]",  # Image/embed link
                rf'"\[\[{re.escape(old_name)}\]\]"',  # Quoted link
            ]

            for pattern in patterns:
                replacement = f"[[{new_name}]]"
                if "!" in pattern:
                    replacement = f"![[{new_name}]]"
                elif '"' in pattern:
                    replacement = f'"[[{new_name}]]"'

                new_content = re.sub(pattern, replacement, content)
                if new_content != content:
                    content = new_content
                    changes_made += 1

        # Write back if changes were made
        if changes_made > 0:
            with open(file_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"Updated {file_path}: {changes_made} changes")
            return changes_made
        else:
            return 0

    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return 0


def main():
    """Main function to update all markdown files."""
    # Get all markdown files in the content directory
    content_dir = Path("content")
    markdown_files = list(content_dir.rglob("*.md"))

    total_changes = 0
    files_updated = 0

    print(f"Found {len(markdown_files)} markdown files to process...")

    for file_path in markdown_files:
        changes = update_links_in_file(file_path)
        if changes > 0:
            files_updated += 1
            total_changes += changes

    print(f"\nSummary:")
    print(f"Files updated: {files_updated}")
    print(f"Total link changes: {total_changes}")

    # Also check for any remaining old-style links
    print(f"\nChecking for any remaining old-style links...")
    remaining_old_links = 0
    for file_path in markdown_files:
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()

            # Look for any remaining r-JK-GT- patterns
            matches = re.findall(r"\[\[r-JK-GT-[^\]]+\]\]", content)
            if matches:
                print(f"  {file_path}: {len(matches)} remaining old links")
                remaining_old_links += len(matches)

        except Exception as e:
            print(f"Error checking {file_path}: {e}")

    if remaining_old_links == 0:
        print("All old-style links have been successfully updated!")
    else:
        print(f"Warning: {remaining_old_links} old-style links remain")


if __name__ == "__main__":
    main()
