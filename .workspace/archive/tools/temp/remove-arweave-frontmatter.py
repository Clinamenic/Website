#!/usr/bin/env python3

import os
from pathlib import Path
import frontmatter
from typing import List


def remove_arweave_frontmatter(website_root: str) -> None:
    """Remove arweave-related frontmatter properties from all markdown files."""
    website_root = Path(website_root)
    properties_to_remove = ["arweaveTrack", "arweaveHash", "arweaveHashes"]
    files_modified = 0
    files_processed = 0

    print("\nScanning for markdown files...")

    # Process each markdown file in the content directory
    for content_path in website_root.glob("content/**/*.md"):
        files_processed += 1
        try:
            # Parse frontmatter
            with open(content_path, "r") as f:
                post = frontmatter.load(f)

            # Check if any of the properties exist
            properties_found = []
            for prop in properties_to_remove:
                if prop in post:
                    properties_found.append(prop)
                    del post[prop]

            if properties_found:
                # Write the file back without the arweave properties
                with open(content_path, "w") as f:
                    f.write(frontmatter.dumps(post))
                files_modified += 1
                print(f"\n✅ Modified {content_path.relative_to(website_root)}")
                print(f"   Removed properties: {', '.join(properties_found)}")

        except Exception as e:
            print(
                f"\n❌ Error processing {content_path.relative_to(website_root)}: {str(e)}"
            )

    print(f"\nProcessed {files_processed} files")
    print(f"Modified {files_modified} files")


def main():
    """Main entry point for the script."""
    website_root = os.getenv("WEBSITE_ROOT") or str(Path.cwd())

    try:
        remove_arweave_frontmatter(website_root)
    except Exception as e:
        print(f"Error during frontmatter removal process: {str(e)}")
        exit(1)


if __name__ == "__main__":
    main()
