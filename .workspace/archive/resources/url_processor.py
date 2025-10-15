#!/usr/bin/env python3

import json
import os
import subprocess
import hashlib
import time
from datetime import datetime
from typing import Dict, Optional, List, Tuple
from bs4 import BeautifulSoup
from tqdm import tqdm
from urllib.parse import urlparse, urlunparse


class ProjectDashboardProcessor:
    def __init__(
        self,
        projects_file: str = "internal/resources/resource-input.md",
        cache_dir: str = ".cursor/tools/cache",
        dashboard_json: str = "internal/resources/dashboard.json",
    ):
        self.projects_file = projects_file
        self.cache_dir = cache_dir
        self.dashboard_json = dashboard_json
        self._ensure_directories()
        self._load_dashboard()

    def _ensure_directories(self):
        """Ensure necessary directories exist."""
        os.makedirs(self.cache_dir, exist_ok=True)
        os.makedirs("internal/resources", exist_ok=True)

    def _load_dashboard(self):
        """Load existing dashboard from JSON file."""
        try:
            # Try to load existing dashboard
            if os.path.exists(self.dashboard_json):
                with open(self.dashboard_json, "r", encoding="utf-8") as f:
                    self.dashboard = json.load(f)
                    # Ensure required fields exist
                    if "projects" not in self.dashboard:
                        self.dashboard["projects"] = []
                    if "last_entry_id" not in self.dashboard:
                        # Find highest existing entry ID
                        max_id = max(
                            (
                                int(p.get("entryID", "0"))
                                for p in self.dashboard["projects"]
                            ),
                            default=0,
                        )
                        self.dashboard["last_entry_id"] = max_id
                    return
        except Exception as e:
            print(f"Warning: Issue reading dashboard file: {str(e)}")
            # Create backup if file exists but is corrupted
            if os.path.exists(self.dashboard_json):
                backup_file = f"{self.dashboard_json}.bak"
                os.rename(self.dashboard_json, backup_file)
                print(f"Created backup of corrupted file: {backup_file}")

        # Initialize new dashboard if loading failed
        self.dashboard = {
            "projects": [],
            "last_updated": datetime.now().isoformat(),
            "last_entry_id": 0,
        }

    def _save_dashboard(self):
        """Save dashboard to JSON file."""
        self.dashboard["last_updated"] = datetime.now().isoformat()
        with open(self.dashboard_json, "w", encoding="utf-8") as f:
            json.dump(self.dashboard, f, indent=2, ensure_ascii=False)

    def _generate_entry_id(self) -> str:
        """Generate the next entry ID."""
        next_id = self.dashboard.get("last_entry_id", 0) + 1
        self.dashboard["last_entry_id"] = next_id
        return f"{next_id:05d}"

    def _normalize_url(self, url: str) -> str:
        """Normalize URL to avoid duplicates due to trailing slashes etc."""
        parsed = urlparse(url)
        # Remove trailing slash if path is not just "/"
        path = parsed.path.rstrip("/") if parsed.path != "/" else "/"
        # Reconstruct URL with normalized path and without fragments
        normalized = urlunparse(
            (
                parsed.scheme,
                parsed.netloc,
                path,
                parsed.params,
                parsed.query,
                "",  # Remove fragment
            )
        )
        return normalized.lower()

    def _url_exists(self, url: str) -> bool:
        """Check if URL already exists in dashboard."""
        normalized_url = self._normalize_url(url)
        # Simply check if URL exists in any project entry
        return any(
            self._normalize_url(project.get("url", "")) == normalized_url
            for project in self.dashboard.get("projects", [])
        )

    def _extract_title(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract title using cascading rules."""
        # Try meta title first
        if og_title := soup.find("meta", property="og:title"):
            return og_title.get("content")

        # Try page title
        if title_tag := soup.title:
            return title_tag.string.strip()

        # Try main heading
        if h1 := soup.find("h1"):
            return h1.get_text().strip()

        return None

    def _extract_description(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract description using cascading rules."""
        # Try meta descriptions first
        description = (
            soup.find("meta", attrs={"name": "description"})
            or soup.find("meta", property="og:description")
            or soup.find("meta", attrs={"name": "og:description"})
            or soup.find("meta", property="twitter:description")
        )
        if description:
            return description.get("content")

        # Try first paragraph
        if first_p := soup.find("p"):
            text = first_p.get_text().strip()
            # Only use if it's a reasonable length
            if 50 <= len(text) <= 300:
                return text

        return None

    def _extract_banner(self, soup: BeautifulSoup) -> Optional[str]:
        """Extract banner image using cascading rules."""
        # Try meta images first
        banner = (
            soup.find("meta", property="og:image")
            or soup.find("meta", attrs={"name": "og:image"})
            or soup.find("meta", property="twitter:image")
            or soup.find("meta", attrs={"name": "twitter:image"})
        )
        if banner:
            return banner.get("content")

        # Try first large image
        for img in soup.find_all("img"):
            src = img.get("src")
            if not src:
                continue
            # Skip small icons
            if any(x in src.lower() for x in ["icon", "logo", "avatar", "thumb"]):
                continue
            # Try to find a reasonably sized image
            width = img.get("width")
            height = img.get("height")
            if width and height:
                if int(width) >= 600 or int(height) >= 400:
                    return src
            return src  # If no size info, use first image

        return None

    def _extract_project_info(self, html_path: str, url: str) -> Dict:
        """Extract project-specific information from the saved HTML."""
        with open(html_path, "r", encoding="utf-8") as f:
            soup = BeautifulSoup(f, "html.parser")

        # Core project info
        project_info = {
            "entryID": self._generate_entry_id(),
            "url": url,
            "title": self._extract_title(soup),
            "description": self._extract_description(soup),
            "banner": self._extract_banner(soup),
            "status": "active",
            "tags": [],  # For manual tagging (e.g., "GFEL")
        }

        return project_info

    def process_url(self, url: str, timeout: int = 30) -> bool:
        """Process a single project URL. Returns True if processed, False if skipped."""
        if self._url_exists(url):
            return False

        # Generate cache filename
        url_hash = hashlib.md5(url.encode()).hexdigest()[:8]
        cache_file = os.path.join(self.cache_dir, f"project_{url_hash}.html")

        try:
            # Fetch and save webpage with timeout
            process = subprocess.Popen(
                [
                    "monolith",
                    url,
                    "-o",
                    cache_file,
                    "--no-audio",
                    "--no-video",
                    "--silent",
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
            )

            try:
                stdout, stderr = process.communicate(timeout=timeout)
                if process.returncode != 0:
                    print(f"\nError fetching {url}: {stderr.decode()}")
                    return False
            except subprocess.TimeoutExpired:
                process.kill()
                print(f"\nTimeout fetching {url}")
                return False

            # Extract project information
            project_info = self._extract_project_info(cache_file, url)

            # Add to dashboard
            self.dashboard["projects"].append(project_info)
            self._save_dashboard()

            # Clean up cache file
            if os.path.exists(cache_file):
                os.remove(cache_file)

            return True

        except Exception as e:
            print(f"\nError processing {url}: {e}")
            # Clean up cache file if it exists
            if os.path.exists(cache_file):
                os.remove(cache_file)
            return False

    def process_projects_file(self):
        """Process all URLs from the projects file."""
        try:
            with open(self.projects_file, "r", encoding="utf-8") as f:
                content = f.read()
                urls = [
                    line.strip()
                    for line in content.splitlines()
                    if line.strip() and line.strip().startswith("http")
                ]

            total_urls = len(urls)
            processed_urls = 0
            skipped_urls = 0
            failed_urls = 0

            print(f"\nFound {total_urls} URLs in {self.projects_file}")
            print(f"Current dashboard has {len(self.dashboard['projects'])} entries\n")

            with tqdm(total=total_urls, desc="Processing URLs") as pbar:
                for url in urls:
                    try:
                        if self.process_url(url):
                            processed_urls += 1
                            pbar.set_description(f"Processing new URLs")
                        else:
                            skipped_urls += 1
                            pbar.set_description(f"Skipping existing URLs")
                    except Exception as e:
                        failed_urls += 1
                        print(f"\nFailed to process {url}: {e}")
                    pbar.update(1)
                    # Small delay between requests to be nice to servers
                    time.sleep(0.5)

            print(f"\nProcessing complete:")
            print(f"- {processed_urls} new URLs processed")
            print(f"- {skipped_urls} existing URLs skipped")
            print(f"- {failed_urls} URLs failed to process")
            print(f"- {len(self.dashboard['projects'])} total entries in dashboard")

        except FileNotFoundError:
            print(f"Projects file not found: {self.projects_file}")
        except Exception as e:
            print(f"Error processing projects file: {e}")
            raise


def main():
    processor = ProjectDashboardProcessor()
    processor.process_projects_file()


if __name__ == "__main__":
    main()
