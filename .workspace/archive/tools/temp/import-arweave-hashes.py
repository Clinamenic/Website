#!/usr/bin/env python3

import os
import json
from datetime import datetime, UTC
from pathlib import Path
import frontmatter
from typing import TypedDict, List


class ArweaveHash(TypedDict):
    hash: str
    timestamp: str
    link: str


class ArweaveFile(TypedDict):
    uuid: str
    title: str
    latest_content: str
    latest_update: str
    arweave_hashes: List[ArweaveHash]


def load_index(index_path: Path) -> dict:
    """Load the Arweave index file or create a new one if it doesn't exist."""
    try:
        with open(index_path, "r") as f:
            content = f.read()
            # Remove trailing commas
            content = content.replace(",]", "]").replace(",}", "}")
            return json.loads(content)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"files": []}


def save_index(index_path: Path, index: dict) -> None:
    """Save the Arweave index file with ordered fields and no content wrapping."""
    index_path.parent.mkdir(parents=True, exist_ok=True)

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
    with open(index_path, "w") as f:
        f.write('{\n  "files": [\n')
        for i, entry in enumerate(formatted_files):
            f.write("    {\n")
            f.write(f'      "uuid": "{entry["uuid"]}",\n')
            f.write(f'      "title": "{entry["title"]}",\n')
            f.write(f'      "latest_content": {json.dumps(entry["latest_content"])},\n')
            f.write(f'      "latest_update": "{entry["latest_update"]}",\n')
            f.write(
                f'      "arweave_hashes": {json.dumps(entry["arweave_hashes"], indent=6)}\n'
            )
            f.write("    }" + ("," if i < len(formatted_files) - 1 else "") + "\n")
        f.write("  ]\n}")


def import_arweave_hashes(website_root: str) -> None:
    """Import existing Arweave hashes from content files into the index."""
    website_root = Path(website_root)
    index_path = website_root / "data" / "arweave.json"

    print("\nLoading current index...")
    index = load_index(index_path)

    # Create a map of UUID to file entry for faster lookups
    uuid_map = {f["uuid"]: f for f in index["files"]}
    print(f"Found {len(uuid_map)} existing entries in index")

    files_updated = 0
    files_processed = 0

    # Process each file in the content directory
    for content_path in website_root.glob("content/**/*.md"):
        files_processed += 1
        try:
            # Parse frontmatter
            with open(content_path, "r") as f:
                post = frontmatter.load(f)

            rel_path = content_path.relative_to(website_root)

            # Skip if no UUID
            if not post.get("uuid"):
                print(f"Skipping {rel_path} - No UUID found")
                continue

            # Skip if no Arweave hash
            if not (post.get("arweaveHash") or post.get("arweaveHashes")):
                print(f"Skipping {rel_path} - No Arweave hash found")
                continue

            uuid = post["uuid"]
            title = post.get("title", content_path.stem)

            print(f"\nProcessing {rel_path}")
            print(f"UUID: {uuid}")
            print(f"Title: {title}")

            # Get the full content including frontmatter
            with open(content_path, "r") as f:
                full_content = f.read()

            # Create or update file entry
            if uuid not in uuid_map:
                print(f"Creating new entry for {rel_path}")
                file_entry: ArweaveFile = {
                    "uuid": uuid,
                    "title": title,
                    "latest_content": full_content,
                    "latest_update": datetime.now(UTC).isoformat(),
                    "arweave_hashes": [],
                }
                index["files"].append(file_entry)
                uuid_map[uuid] = file_entry
            else:
                print(f"Updating existing entry for {rel_path}")
                file_entry = uuid_map[uuid]
                file_entry["latest_content"] = full_content
                file_entry["latest_update"] = datetime.now(UTC).isoformat()

            # Add Arweave hash(es)
            if post.get("arweaveHash"):
                hash_value = post["arweaveHash"]
                if not any(
                    h["hash"] == hash_value for h in file_entry["arweave_hashes"]
                ):
                    print(f"Adding new hash: {hash_value}")
                    file_entry["arweave_hashes"].append(
                        {
                            "hash": hash_value,
                            "timestamp": datetime.now(UTC).isoformat(),
                            "link": f"https://www.arweave.net/{hash_value}",
                        }
                    )
                    files_updated += 1
                else:
                    print(f"Hash already exists: {hash_value}")

            if post.get("arweaveHashes"):
                hash_value = post["arweaveHashes"]
                if not any(
                    h["hash"] == hash_value for h in file_entry["arweave_hashes"]
                ):
                    print(f"Adding new hash: {hash_value}")
                    file_entry["arweave_hashes"].append(
                        {
                            "hash": hash_value,
                            "timestamp": datetime.now(UTC).isoformat(),
                            "link": f"https://www.arweave.net/{hash_value}",
                        }
                    )
                    files_updated += 1
                else:
                    print(f"Hash already exists: {hash_value}")

        except Exception as e:
            print(f"Error processing {content_path}: {str(e)}")

    print(f"\nProcessed {files_processed} files total")
    if files_updated > 0:
        print(f"Updated {files_updated} files")
        save_index(index_path, index)
    else:
        print("No updates needed")


def main():
    """Main entry point for the script."""
    website_root = os.getenv("WEBSITE_ROOT") or str(Path.cwd())

    try:
        import_arweave_hashes(website_root)
    except Exception as e:
        print(f"Error during import process: {str(e)}")
        exit(1)


if __name__ == "__main__":
    main()
