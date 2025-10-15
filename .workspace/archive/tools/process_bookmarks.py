#!/usr/bin/env python3

import json
import os
import subprocess
import hashlib
from datetime import datetime
from typing import Dict, List, Optional
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from tqdm import tqdm


class BookmarkProcessor:
    def __init__(
        self,
        bookmarks_file: str = "private/bookmarks/bookmarks.md",
        bookmarks_dir: str = "private/bookmarks",
        bookmarks_json: str = "bookmarks.json",
    ):
        self.bookmarks_file = bookmarks_file
        self.bookmarks_dir = bookmarks_dir
        self.bookmarks_json = bookmarks_json
        self._ensure_directories()
        self._load_bookmarks()

    def _ensure_directories(self):
        """Ensure necessary directories exist."""
        os.makedirs(self.bookmarks_dir, exist_ok=True)

    def _load_bookmarks(self):
        """Load existing bookmarks from JSON file."""
        try:
            with open(self.bookmarks_json, "r") as f:
                content = f.read().strip()
                if content:  # Only try to parse if file is not empty
                    self.bookmarks = json.load(f)
                else:
                    raise FileNotFoundError  # Handle empty file like a missing file
        except (FileNotFoundError, json.JSONDecodeError):
            # Initialize fresh bookmarks structure for both missing and invalid files
            self.bookmarks = {
                "bookmarks": [],
                "metadata": {
                    "last_updated": None,
                    "total_bookmarks": 0,
                    "categories": set(),
                },
            }
            # Create a fresh bookmarks.json file
            self._save_bookmarks()

    def _save_bookmarks(self):
        """Save bookmarks to JSON file."""
        # Update metadata
        self.bookmarks["metadata"]["last_updated"] = datetime.now().isoformat()
        self.bookmarks["metadata"]["total_bookmarks"] = len(self.bookmarks["bookmarks"])
        # Convert set to list for JSON serialization
        if isinstance(self.bookmarks["metadata"]["categories"], set):
            self.bookmarks["metadata"]["categories"] = list(
                self.bookmarks["metadata"]["categories"]
            )

        with open(self.bookmarks_json, "w") as f:
            json.dump(self.bookmarks, f, indent=2)

    def _generate_filename(self, url: str, title: Optional[str] = None) -> str:
        """Generate a unique filename from title or URL."""
        base = (
            title.replace(" ", "-")
            if title
            else urlparse(url).path.strip("/") or urlparse(url).netloc
        )
        # Create a unique identifier using URL hash
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        # Convert to filename-safe string
        safe_base = "".join(c if c.isalnum() or c == "-" else "_" for c in base)[
            :50
        ]  # Limit length
        return f"{safe_base}_{url_hash}.html"

    def _extract_page_metadata(self, html_path: str) -> Dict[str, str]:
        """Extract metadata from the saved HTML file."""
        try:
            with open(html_path, "r", encoding="utf-8") as f:
                soup = BeautifulSoup(f, "html.parser")

            metadata = {
                "extracted_title": soup.title.string if soup.title else None,
                "meta_description": None,
                "meta_keywords": None,
                "text_preview": None,
                "meta_image": None,
            }

            # Get meta description
            meta_desc = soup.find("meta", attrs={"name": "description"})
            if meta_desc:
                metadata["meta_description"] = meta_desc.get("content")

            # Get meta keywords
            meta_keywords = soup.find("meta", attrs={"name": "keywords"})
            if meta_keywords:
                metadata["meta_keywords"] = meta_keywords.get("content")

            # Get meta image (trying multiple common meta image tags)
            meta_image = (
                soup.find("meta", property="og:image")
                or soup.find("meta", attrs={"name": "og:image"})
                or soup.find("meta", property="twitter:image")
                or soup.find("meta", attrs={"name": "twitter:image"})
                or soup.find("meta", property="article:image")
                or soup.find("meta", attrs={"name": "image"})
                or soup.find("link", rel="image_src")
            )
            if meta_image:
                metadata["meta_image"] = meta_image.get("content") or meta_image.get(
                    "href"
                )

            # Get a preview of the main content
            main_content = soup.find("body")
            if main_content:
                # Get text content and clean it up
                text = " ".join(main_content.stripped_strings)
                metadata["text_preview"] = (
                    text[:500] + "..." if len(text) > 500 else text
                )

            return metadata
        except Exception as e:
            print(f"Error extracting metadata from {html_path}: {e}")
            return {
                "extracted_title": None,
                "meta_description": None,
                "meta_keywords": None,
                "text_preview": None,
                "meta_image": None,
            }

    def _url_exists(self, url: str) -> bool:
        """Check if URL already exists in bookmarks."""
        return any(b["url"] == url for b in self.bookmarks["bookmarks"])

    def process_url(self, url: str):
        """Process a single URL."""
        if self._url_exists(url):
            print(f"Skipping {url} - already processed")
            return

        filename = self._generate_filename(url)
        output_path = os.path.join(self.bookmarks_dir, filename)
        relative_path = os.path.join("private/bookmarks", filename)

        # Use Monolith to bundle webpage
        try:
            subprocess.run(
                [
                    "monolith",
                    url,
                    "-o",
                    output_path,
                    "--no-audio",
                    "--no-video",
                    "--silent",
                ],
                check=True,
            )
        except subprocess.CalledProcessError as e:
            print(f"Error processing {url}: {e}")
            return

        # Extract additional metadata from the saved HTML
        page_metadata = self._extract_page_metadata(output_path)

        # Add to bookmarks.json
        bookmark_entry = {
            "url": url,
            "file_path": relative_path,
            "absolute_path": os.path.abspath(output_path),
            "title": page_metadata["extracted_title"] or url,
            "date_added": datetime.now().isoformat(),
            "tags": [],  # Placeholder for manual tagging
            "metadata": page_metadata,
        }

        self.bookmarks["bookmarks"].append(bookmark_entry)
        self._save_bookmarks()

    def process_bookmarks_file(self):
        """Process all URLs from the bookmarks file."""
        try:
            with open(self.bookmarks_file, "r") as f:
                urls = [
                    line.strip()
                    for line in f
                    if line.strip() and line.strip().startswith("http")
                ]

            print(f"Found {len(urls)} URLs to process")

            # Process URLs with progress bar
            with tqdm(total=len(urls), desc="Processing bookmarks") as pbar:
                for url in urls:
                    self.process_url(url)
                    pbar.update(1)

        except FileNotFoundError:
            print(f"Bookmarks file not found: {self.bookmarks_file}")
        except Exception as e:
            print(f"Error processing bookmarks file: {e}")


def main():
    processor = BookmarkProcessor()
    processor.process_bookmarks_file()


if __name__ == "__main__":
    main()
