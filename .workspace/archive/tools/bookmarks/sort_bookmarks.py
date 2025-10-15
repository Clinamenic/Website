#!/usr/bin/env python3

"""
Bookmark list sorting utility.

This script reads a markdown file containing URLs, sorts them alphabetically (case-insensitive),
and overwrites the original file with the sorted content.
"""

from typing import List
import sys


def sort_bookmarks(filepath: str) -> None:
    """
    Sort URLs in a file alphabetically and overwrite the original file.

    Args:
        filepath: Path to the markdown file containing URLs

    Raises:
        FileNotFoundError: If the input file doesn't exist
        PermissionError: If there are insufficient permissions to read/write the file
        Exception: For other unexpected errors
    """
    try:
        # Read URLs from input file
        with open(filepath, "r") as f:
            urls = f.readlines()

        # Remove empty lines and strip whitespace
        urls = [url.strip() for url in urls if url.strip()]

        # Sort URLs alphabetically (case-insensitive)
        sorted_urls: List[str] = sorted(urls, key=str.lower)

        # Write sorted URLs back to the original file
        with open(filepath, "w") as f:
            for url in sorted_urls:
                f.write(url + "\n")

        print(f"Successfully sorted {len(sorted_urls)} bookmarks in {filepath}")

    except FileNotFoundError:
        print(f"Error: File {filepath} not found", file=sys.stderr)
        sys.exit(1)
    except PermissionError:
        print(f"Error: Insufficient permissions to access {filepath}", file=sys.stderr)
        sys.exit(1)
    except Exception as e:
        print(f"Error: An unexpected error occurred: {str(e)}", file=sys.stderr)
        sys.exit(1)


if __name__ == "__main__":
    input_file = "bookmark-list.md"
    sort_bookmarks(input_file)
