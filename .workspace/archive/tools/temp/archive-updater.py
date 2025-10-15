#!/usr/bin/env python3

import os
import json
import glob
from datetime import datetime, UTC
from pathlib import Path
from typing import TypedDict, List, Optional
import frontmatter
from collections import OrderedDict


class ArweaveHash(TypedDict):
    hash: str
    timestamp: str
    link: str


class ArweaveFile(TypedDict):
    uuid: str
    title: str
    latest_update: str
    latest_content: str
    arweave_hashes: List[ArweaveHash]


class ArweaveIndex(TypedDict):
    files: List[ArweaveFile]


class ArchiveUpdater:
    def __init__(self, website_root: str):
        self.website_root = Path(website_root).resolve()
        self.index_path = self.website_root / "data" / "arweave.json"

    def load_index(self) -> ArweaveIndex:
        """Load the Arweave index file or create a new one if it doesn't exist."""
        try:
            with open(self.index_path, "r") as f:
                content = f.read()
                # Remove trailing commas
                content = content.replace(",]", "]").replace(",}", "}")
                return json.loads(content)
        except (FileNotFoundError, json.JSONDecodeError):
            return {"files": []}

    def save_index(self, index: ArweaveIndex) -> None:
        """Save the Arweave index file with ordered fields and no content wrapping."""
        self.index_path.parent.mkdir(parents=True, exist_ok=True)

        # Create a new ordered index with specific formatting
        formatted_files = []
        for file_entry in index["files"]:
            formatted_entry = {
                "uuid": file_entry["uuid"],
                "title": file_entry["title"],
                "latest_content": file_entry.get("latest_content", ""),
                "latest_update": file_entry.get("latest_update", ""),
                "arweave_hashes": file_entry["arweave_hashes"],
            }
            formatted_files.append(formatted_entry)

        formatted_index = {"files": formatted_files}

        # Custom JSON formatting
        with open(self.index_path, "w") as f:
            f.write('{\n  "files": [\n')
            for i, entry in enumerate(formatted_files):
                f.write("    {\n")
                f.write(f'      "uuid": "{entry["uuid"]}",\n')
                f.write(f'      "title": "{entry["title"]}",\n')
                f.write(
                    f'      "latest_content": {json.dumps(entry["latest_content"])},\n'
                )
                f.write(f'      "latest_update": "{entry["latest_update"]}",\n')
                f.write(
                    f'      "arweave_hashes": {json.dumps(entry["arweave_hashes"], indent=6)}\n'
                )
                f.write("    }" + ("," if i < len(formatted_files) - 1 else "") + "\n")
            f.write("  ]\n}")

    def get_file_content(self, file_path: Path) -> tuple[str, str]:
        """Extract content with frontmatter and title from a markdown file."""
        with open(file_path, "r") as f:
            post = frontmatter.load(f)
            # Get title from frontmatter or filename
            title = post.get("title", file_path.stem)
            # Return the complete file content including frontmatter
            return title, frontmatter.dumps(post)

    def update_index(self) -> None:
        """Update the latest_content field for tracked files."""
        try:
            # Load current index
            index = self.load_index()
            files_updated = 0

            # Create a map of UUID to file entry for faster lookups
            uuid_map = {f["uuid"]: f for f in index["files"]}

            # Find all markdown files in the website directory
            md_files = []
            for pattern in ["**/*.md", "content/**/*.md"]:
                md_files.extend(self.website_root.glob(pattern))

            # Remove duplicates
            md_files = list(set(md_files))

            # Track which UUIDs we've found files for
            found_uuids = set()

            for file_path in md_files:
                rel_path = file_path.relative_to(self.website_root)

                # Parse frontmatter
                with open(file_path, "r") as f:
                    post = frontmatter.load(f)

                # Skip if no UUID
                if not post.get("uuid"):
                    continue

                uuid = post["uuid"]

                # Only process if this file is already being tracked
                if uuid not in uuid_map:
                    continue

                found_uuids.add(uuid)
                title, content = self.get_file_content(file_path)

                file_entry = uuid_map[uuid]
                # Update content only if it's different
                if file_entry.get("latest_content") != content:
                    file_entry["latest_content"] = content
                    file_entry["latest_update"] = datetime.now(UTC).isoformat()
                    if file_entry.get("title") != title:
                        file_entry["title"] = title
                    files_updated += 1
                    print(f"Updated content for {rel_path}")

            # Report any tracked files that weren't found
            missing_uuids = set(uuid_map.keys()) - found_uuids
            if missing_uuids:
                print("\nWarning: The following tracked files were not found:")
                for uuid in missing_uuids:
                    print(f"- {uuid_map[uuid]['title']} (UUID: {uuid})")

            if files_updated > 0:
                print(f"\nUpdated {files_updated} files")
                self.save_index(index)
            else:
                print("\nNo updates needed")

        except Exception as e:
            print(f"Error updating index: {str(e)}")
            raise


def main():
    """Main entry point for the script."""
    website_root = os.getenv("WEBSITE_ROOT") or str(Path.cwd())

    try:
        updater = ArchiveUpdater(website_root)
        updater.update_index()
    except Exception as e:
        print(f"Error during update process: {str(e)}")
        exit(1)


if __name__ == "__main__":
    main()
