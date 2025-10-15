#!/usr/bin/env python3

import os
import json
import glob
from datetime import datetime, timezone
from pathlib import Path
import frontmatter
from typing import TypedDict, List, Optional
import httpx
import time


class ArweaveHash(TypedDict):
    hash: str
    timestamp: str
    link: str


class ArweaveFile(TypedDict):
    uuid: str
    title: str
    arweave_hashes: List[ArweaveHash]


class ArweaveIndex(TypedDict):
    files: List[ArweaveFile]


def get_arweave_timestamp(tx_id: str) -> Optional[str]:
    """Query the Arweave GraphQL API to get the timestamp for a transaction."""
    try:
        # Try Goldsky first (optimized for search)
        query = {
            "query": f"""{{
                transactions(first: 1, ids: ["{tx_id}"]) {{
                    edges {{
                        node {{
                            id
                            block {{
                                timestamp
                                height
                            }}
                        }}
                    }}
                }}
            }}"""
        }

        headers = {"Content-Type": "application/json"}

        # Try Goldsky first
        response = httpx.post(
            "https://arweave-search.goldsky.com/graphql",
            json=query,
            headers=headers,
            timeout=10.0,
        )

        if response.status_code != 200:
            # Fallback to arweave.net if Goldsky fails
            response = httpx.post(
                "https://arweave.net/graphql", json=query, headers=headers, timeout=10.0
            )

        data = response.json()
        print(f"Response from Arweave: {json.dumps(data, indent=2)}")

        # Check if we got a valid response with data
        if data and "data" in data and "transactions" in data["data"]:
            edges = data["data"]["transactions"]["edges"]
            if edges and edges[0]["node"]["block"]:
                # Convert Unix timestamp to ISO format
                timestamp = int(edges[0]["node"]["block"]["timestamp"])
                dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
                return dt.isoformat()

        print(f"Warning: Could not get timestamp for {tx_id}")
        return None

    except Exception as e:
        print(f"Error getting timestamp for {tx_id}: {str(e)}")
        return None


def load_index(index_path: Path) -> ArweaveIndex:
    """Load the Arweave index file or create a new one if it doesn't exist."""
    try:
        with open(index_path, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {"files": []}


def save_index(index: ArweaveIndex, index_path: Path) -> None:
    """Save the Arweave index file."""
    index_path.parent.mkdir(parents=True, exist_ok=True)
    with open(index_path, "w") as f:
        json.dump(index, f, indent=2)


def process_files(website_root: Path) -> None:
    """Process all markdown files and add them to the Arweave index if they have UUIDs and hashes."""
    index_path = website_root / "data" / "arweave.json"
    index = load_index(index_path)

    # Find all markdown files in the website directory
    md_files = []
    for pattern in ["**/*.md", "content/**/*.md"]:
        md_files.extend(website_root.glob(pattern))

    # Remove duplicates and convert to relative paths
    md_files = list(set(md_files))

    for file_path in md_files:
        rel_path = file_path.relative_to(website_root)
        print(f"\nChecking {rel_path}...")

        # Parse frontmatter
        try:
            with open(file_path, "r") as f:
                post = frontmatter.load(f)
        except Exception as e:
            print(f"Error reading {rel_path}: {str(e)}")
            continue

        # Skip if no UUID
        if not post.get("uuid"):
            continue

        # Get arweave hash if it exists
        arweave_hash = post.get("arweaveHash")
        if not arweave_hash:
            continue

        print(f"Found Arweave hash: {arweave_hash}")

        # Find or create file entry in index
        file_entry = next(
            (f for f in index["files"] if f["uuid"] == post["uuid"]), None
        )

        if not file_entry:
            file_entry = {
                "uuid": post["uuid"],
                "title": post.get("title", ""),
                "arweave_hashes": [],
            }
            index["files"].append(file_entry)
            print(f"Created new entry for {post.get('title', '')}")

        # Update title if changed
        if post.get("title") and file_entry["title"] != post["title"]:
            print(f"Updating title to: {post['title']}")
            file_entry["title"] = post["title"]

        # Check if hash already exists
        if not any(h["hash"] == arweave_hash for h in file_entry["arweave_hashes"]):
            # Get timestamp from Arweave
            timestamp = get_arweave_timestamp(arweave_hash)
            if timestamp:
                file_entry["arweave_hashes"].append(
                    {
                        "hash": arweave_hash,
                        "timestamp": timestamp,
                        "link": f"https://www.arweave.net/{arweave_hash}",
                    }
                )
                print(f"Added hash {arweave_hash} with timestamp {timestamp}")
                # Add a small delay to avoid rate limiting
                time.sleep(1.0)  # Increased delay to be more conservative
            else:
                print(f"Could not get timestamp for hash {arweave_hash}, skipping...")
                # Try to verify if the transaction exists
                try:
                    verify_response = httpx.get(
                        f"https://arweave.net/{arweave_hash}",
                        timeout=10.0,
                        follow_redirects=True,
                    )
                    if verify_response.status_code == 200:
                        print(f"Transaction exists but couldn't get timestamp")
                    else:
                        print(f"Transaction not found on Arweave network")
                except Exception as e:
                    print(f"Error verifying transaction: {str(e)}")

    # Save updated index
    save_index(index, index_path)
    print("\nIndex updated successfully!")


def update_existing_timestamps(index: ArweaveIndex) -> None:
    """Update timestamps for all existing hashes in the index."""
    print("\nUpdating timestamps for existing hashes...")

    for file_entry in index["files"]:
        print(f"\nProcessing {file_entry['title']}...")
        for hash_entry in file_entry["arweave_hashes"]:
            arweave_hash = hash_entry["hash"]
            print(f"Getting timestamp for hash: {arweave_hash}")

            timestamp = get_arweave_timestamp(arweave_hash)
            if timestamp:
                print(f"Found timestamp: {timestamp}")
                hash_entry["timestamp"] = timestamp
            else:
                print(f"Could not get timestamp for {arweave_hash}")

            # Add a delay to avoid rate limiting
            time.sleep(1.0)


def main():
    """Main entry point for the script."""
    website_root = os.getenv("WEBSITE_ROOT") or str(Path.cwd())
    website_root = Path(website_root).resolve()
    index_path = website_root / "data" / "arweave.json"

    try:
        # Load existing index
        index = load_index(index_path)

        # Update timestamps for existing hashes
        update_existing_timestamps(index)

        # Save updated index
        save_index(index, index_path)
        print("\nIndex updated successfully!")

    except Exception as e:
        print(f"Error during indexing process: {str(e)}")
        exit(1)


if __name__ == "__main__":
    main()
