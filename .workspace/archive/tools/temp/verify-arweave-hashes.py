#!/usr/bin/env python3

import os
import json
from pathlib import Path
import frontmatter
import re


def load_index(index_path: Path) -> dict:
    """Load the Arweave index file."""
    try:
        with open(index_path, "r") as f:
            content = f.read()
            # Remove trailing commas
            content = content.replace(",]", "]").replace(",}", "}")
            return json.loads(content)
    except (FileNotFoundError, json.JSONDecodeError) as e:
        print(f"Error loading index: {str(e)}")
        return {"files": []}


def parse_hash_files_md(md_path: Path) -> dict:
    """Parse the arweave_hash_files.md file to get file paths and their hashes."""
    files_and_hashes = {}
    try:
        with open(md_path, "r") as f:
            content = f.read()

        # Extract table rows using regex
        pattern = r"\|\s*(content/[^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|"
        matches = re.finditer(pattern, content)

        for match in matches:
            file_path = match.group(1).strip()
            hash_type = match.group(2).strip()
            hash_value = match.group(3).strip()
            files_and_hashes[file_path] = (hash_type, hash_value)

        return files_and_hashes
    except Exception as e:
        print(f"Error parsing hash files md: {str(e)}")
        return {}


def verify_hashes(website_root: str) -> None:
    """Verify that all files in arweave_hash_files.md have correct entries in arweave.json."""
    website_root = Path(website_root)
    index_path = website_root / "data" / "arweave.json"
    hash_files_md_path = (
        website_root / ".cursor" / "docs" / "temp" / "arweave_hash_files.md"
    )

    print("\nLoading files...")
    index = load_index(index_path)
    files_and_hashes = parse_hash_files_md(hash_files_md_path)

    # Create a map of file paths to UUIDs and hashes from the content files
    content_map = {}
    for file_path_str, (hash_type, hash_value) in files_and_hashes.items():
        file_path = website_root / file_path_str
        try:
            if file_path.exists():
                with open(file_path, "r") as f:
                    post = frontmatter.load(f)
                if post.get("uuid"):
                    content_map[file_path_str] = {
                        "uuid": post["uuid"],
                        "hash_type": hash_type,
                        "hash_value": hash_value,
                    }
        except Exception as e:
            print(f"Error reading {file_path}: {str(e)}")

    # Create a map of UUIDs to entries from arweave.json
    uuid_map = {entry["uuid"]: entry for entry in index["files"]}

    print("\nVerifying hashes...")
    all_correct = True

    for file_path, info in content_map.items():
        uuid = info["uuid"]
        expected_hash = info["hash_value"]

        if uuid not in uuid_map:
            print(f"\n❌ File {file_path} (UUID: {uuid}) not found in arweave.json")
            all_correct = False
            continue

        entry = uuid_map[uuid]
        found_hash = False

        for hash_entry in entry["arweave_hashes"]:
            if hash_entry["hash"] == expected_hash:
                found_hash = True
                print(f"\n✅ {file_path}")
                print(f"   Hash verified: {expected_hash}")
                break

        if not found_hash:
            print(f"\n❌ {file_path}")
            print(f"   Expected hash {expected_hash} not found in arweave.json")
            print(f"   Found hashes: {[h['hash'] for h in entry['arweave_hashes']]}")
            all_correct = False

    if all_correct:
        print("\n🎉 All hashes verified successfully!")
    else:
        print("\n⚠️ Some hashes did not match or were missing.")


def main():
    """Main entry point for the script."""
    website_root = os.getenv("WEBSITE_ROOT") or str(Path.cwd())

    try:
        verify_hashes(website_root)
    except Exception as e:
        print(f"Error during verification process: {str(e)}")
        exit(1)


if __name__ == "__main__":
    main()
