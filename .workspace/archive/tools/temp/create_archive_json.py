#!/usr/bin/env python3

import json
import os
from pathlib import Path
from typing import Dict, List, Any, TypedDict


class ArweaveHash(TypedDict):
    hash: str
    timestamp: str
    link: str
    tags: List[Dict[str, str]]


class ArweaveArchiveItem(TypedDict):
    uuid: str
    title: str
    arweave_hashes: List[ArweaveHash]


class ArweaveArchive(TypedDict):
    files: List[ArweaveArchiveItem]


def main():
    """
    Create a new archive.json file from the existing arweave.json data,
    preserving the arweave_hashes structure but omitting latest_content and latest_update fields.
    """
    # Path to the files
    script_dir = Path(__file__).parent
    website_root = (
        script_dir.parent.parent.parent
    )  # Move up from .cursor/tools/arweave to root
    arweave_json_path = website_root / "data" / "arweave.json"
    archive_json_path = website_root / "data" / "archive.json"

    # Ensure data directory exists
    (website_root / "data").mkdir(exist_ok=True)

    # Load existing arweave.json
    print(f"Reading existing arweave data from {arweave_json_path}")
    try:
        with open(arweave_json_path, "r") as f:
            existing_data = json.load(f)
    except FileNotFoundError:
        print(f"Warning: {arweave_json_path} not found. Creating new archive.")
        existing_data = {"files": []}

    # Create new archive structure
    archive_data: ArweaveArchive = {"files": []}

    # Transfer data
    for file in existing_data.get("files", []):
        # Create new archive item without latest_content and latest_update
        archive_item: ArweaveArchiveItem = {
            "uuid": file.get("uuid", ""),
            "title": file.get("title", ""),
            "arweave_hashes": [],
        }

        # Copy arweave_hashes with the same structure
        for hash_entry in file.get("arweave_hashes", []):
            # Create a new hash entry with the same fields
            new_hash_entry = {
                "hash": hash_entry.get("hash", ""),
                "timestamp": hash_entry.get("timestamp", ""),
                "link": hash_entry.get("link", ""),
            }

            # Add tags if they exist
            if "tags" in hash_entry:
                new_hash_entry["tags"] = hash_entry["tags"]

            archive_item["arweave_hashes"].append(new_hash_entry)

        # Add to archive
        archive_data["files"].append(archive_item)

    # Write new archive.json
    print(f"Writing new archive data to {archive_json_path}")
    with open(archive_json_path, "w") as f:
        json.dump(archive_data, f, indent=2)

    print(
        f"Successfully created {archive_json_path} with {len(archive_data['files'])} files"
    )


if __name__ == "__main__":
    main()
