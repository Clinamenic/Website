#!/usr/bin/env python3

import json
from typing import List, Dict, Optional, Any
import argparse
from pathlib import Path


class TileGenerator:
    def __init__(self, dashboard_path: str = "internal/resources/dashboard.json"):
        self.dashboard_path = dashboard_path

    def load_dashboard(self) -> Dict:
        """Load the dashboard data from JSON."""
        with open(self.dashboard_path, "r") as f:
            return json.load(f)

    def filter_entries_by_tags(
        self,
        entries: List[Dict],
        tags: List[str],
        exclude_tags: Optional[List[str]] = None,
    ) -> List[Dict]:
        """Filter entries that contain ALL specified tags and NONE of the excluded tags."""
        filtered_entries = [
            entry
            for entry in entries
            if all(tag in entry.get("tags", []) for tag in tags)
        ]

        if exclude_tags:
            filtered_entries = [
                entry
                for entry in filtered_entries
                if not any(tag in entry.get("tags", []) for tag in exclude_tags)
            ]

        return filtered_entries

    def sort_entries(
        self, entries: List[Dict], sort_by: str = "entryID", reverse: bool = False
    ) -> List[Dict]:
        """Sort entries by a specific field."""
        return sorted(entries, key=lambda x: x.get(sort_by, ""), reverse=reverse)

    def generate_tile_html(self, entry: Dict, layout: str = "default") -> str:
        """Generate HTML for a single project tile with optional layout variants."""
        title = entry.get("title", "Untitled Project")
        description = entry.get("description", "No description available")
        url = entry.get("url", "#")
        banner = entry.get("banner")
        entry_id = entry.get("entryID", "00000")
        category = entry.get("category", "Resource")
        tags = entry.get("tags", [])
        author = entry.get("author", "")
        date = entry.get("date", "")
        status = entry.get("status", "active")

        # Create a CSS class string from tags for filtering
        tag_classes = " ".join([f"tag-{tag.replace(' ', '-').lower()}" for tag in tags])

        # Handle missing banner images with a placeholder gradient
        if not banner:
            banner_style = "background: linear-gradient(135deg, #e0f2fe, #0ea5e9)"
        else:
            banner_style = f"background-image: url('{banner}')"

        # Different layout templates
        if layout == "compact":
            return f"""<div class="project-tile compact {tag_classes}" data-entry-id="{entry_id}" data-category="{category}" data-status="{status}">
    <a href="{url}" target="_blank" rel="noopener noreferrer">
        <div class="project-tile-content">
            <div class="project-tile-title">{title}</div>
            <div class="project-tile-description">{description}</div>
        </div>
    </a>
</div>"""
        elif layout == "featured":
            return f"""<div class="project-tile featured {tag_classes}" data-entry-id="{entry_id}" data-category="{category}" data-status="{status}">
    <a href="{url}" target="_blank" rel="noopener noreferrer">
        <div class="project-tile-bg" style="{banner_style}"></div>
        <div class="project-tile-content">
            <div class="project-tile-title">{title}</div>
            <div class="project-tile-description">{description}</div>
            <div class="project-tile-footer">
                {f'<div class="project-tile-author">{author}</div>' if author else ''}
                {f'<div class="project-tile-date">{date}</div>' if date else ''}
                <div class="project-tile-tags">
                    {' '.join([f'<span class="project-tile-tag">{tag}</span>' for tag in tags])}
                </div>
                <span class="project-tile-arrow">→</span>
            </div>
        </div>
    </a>
</div>"""
        else:  # default layout
            return f"""<div class="project-tile {tag_classes}" data-entry-id="{entry_id}" data-category="{category}" data-status="{status}">
    <a href="{url}" target="_blank" rel="noopener noreferrer">
        <div class="project-tile-bg" style="{banner_style}"></div>
        <div class="project-tile-content">
            <div class="project-tile-title">{title}</div>
            <div class="project-tile-description">{description}</div>
            {f'<div class="project-tile-category">{category}</div>' if category != "Resource" else ''}
        </div>
    </a>
</div>"""

    def generate_grid_html(
        self,
        tags: List[str] = [],
        exclude_tags: List[str] = [],
        sort_by: str = "entryID",
        reverse: bool = False,
        layout: str = "default",
        grid_class: str = "",
        max_items: Optional[int] = None,
    ) -> str:
        """Generate HTML for a grid of project tiles with filtering and sorting options."""
        dashboard = self.load_dashboard()
        filtered_entries = self.filter_entries_by_tags(
            dashboard["projects"], tags, exclude_tags
        )
        sorted_entries = self.sort_entries(filtered_entries, sort_by, reverse)

        if max_items:
            sorted_entries = sorted_entries[:max_items]

        tiles_html = "\n".join(
            self.generate_tile_html(entry, layout) for entry in sorted_entries
        )

        # Add CSS classes for the grid layout
        grid_classes = f"project-grid {grid_class}"

        # Add filter and sort controls if needed
        controls_html = ""
        if tags or exclude_tags:
            tag_list = ", ".join(tags) if tags else "None"
            exclude_list = ", ".join(exclude_tags) if exclude_tags else "None"
            controls_html = f"""<div class="project-grid-controls">
    <div class="project-grid-info">
        <span>Showing {len(sorted_entries)} resources</span>
        <span class="project-grid-tags">Tags: {tag_list}</span>
        {f'<span class="project-grid-exclude">Excluding: {exclude_list}</span>' if exclude_tags else ''}
    </div>
</div>"""

        return f"""<div class="{grid_classes}">
{controls_html}
<div class="project-grid-container">
{tiles_html}
</div>
</div>"""

    def generate_grid_with_css(
        self,
        tags: List[str] = [],
        exclude_tags: List[str] = [],
        sort_by: str = "entryID",
        reverse: bool = False,
        layout: str = "default",
        grid_class: str = "",
        max_items: Optional[int] = None,
    ) -> str:
        """Generate HTML for the grid with embedded CSS styles."""
        grid_html = self.generate_grid_html(
            tags, exclude_tags, sort_by, reverse, layout, grid_class, max_items
        )

        css = """<style>
.project-grid {
    width: 100%;
    margin: 2rem 0;
}

.project-grid-controls {
    margin-bottom: 1rem;
    font-size: 0.875rem;
    color: #666;
}

.project-grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
}

.project-tile {
    border-radius: 0.5rem;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid #e5e7eb;
}

.project-tile:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.project-tile a {
    display: flex;
    flex-direction: column;
    height: 100%;
    color: inherit;
    text-decoration: none;
}

.project-tile-bg {
    height: 160px;
    background-size: cover;
    background-position: center;
    background-color: #f3f4f6;
}

.project-tile-content {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
}

.project-tile-title {
    font-size: 1.25rem;
    font-weight: 600;
    line-height: 1.4;
    margin-bottom: 0.5rem;
}

.project-tile-description {
    color: #6b7280;
    font-size: 0.875rem;
    line-height: 1.5;
    flex-grow: 1;
    margin-bottom: 1rem;
}

.project-tile-category {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #4b5563;
    margin-top: auto;
}

.project-tile-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    font-size: 0.75rem;
}

.project-tile-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.project-tile-tag {
    background-color: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 9999px;
    font-size: 0.75rem;
}

.project-tile-arrow {
    font-size: 1rem;
}

/* Compact layout variant */
.project-tile.compact {
    box-shadow: none;
    border-radius: 0;
    border-bottom: 1px solid #e5e7eb;
    padding: 0.75rem 0;
}

.project-tile.compact:hover {
    transform: none;
    box-shadow: none;
    background-color: #f9fafb;
}

/* Featured layout variant */
.project-tile.featured {
    grid-column: span 2;
}

.project-tile.featured .project-tile-bg {
    height: 200px;
}

.project-tile.featured .project-tile-title {
    font-size: 1.5rem;
}

@media (max-width: 768px) {
    .project-grid-container {
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
    
    .project-tile.featured {
        grid-column: auto;
    }
}

@media (max-width: 640px) {
    .project-grid-container {
        grid-template-columns: 1fr;
    }
}

.dark-mode .project-tile {
    background-color: #1f2937;
    border-color: #374151;
}

.dark-mode .project-tile-title {
    color: #f9fafb;
}

.dark-mode .project-tile-description {
    color: #9ca3af;
}

.dark-mode .project-tile-category {
    color: #d1d5db;
}

.dark-mode .project-tile-tag {
    background-color: #374151;
    color: #d1d5db;
}
</style>"""

        return css + grid_html


def main():
    parser = argparse.ArgumentParser(
        description="Generate HTML tiles from dashboard data"
    )
    parser.add_argument("--tags", nargs="+", default=[], help="Tags to filter by")
    parser.add_argument("--exclude-tags", nargs="+", default=[], help="Tags to exclude")
    parser.add_argument(
        "--output",
        default="internal/resources/resource-output.md",
        help="Output file path (optional)",
    )
    parser.add_argument(
        "--sort-by",
        default="entryID",
        help="Field to sort entries by (default: entryID)",
    )
    parser.add_argument(
        "--reverse",
        action="store_true",
        help="Reverse sort order",
    )
    parser.add_argument(
        "--layout",
        default="default",
        choices=["default", "compact", "featured"],
        help="Layout style for tiles",
    )
    parser.add_argument(
        "--max-items",
        type=int,
        help="Maximum number of items to display",
    )
    parser.add_argument(
        "--include-css",
        action="store_true",
        help="Include CSS styles in the output",
    )
    parser.add_argument(
        "--grid-class",
        default="",
        help="Additional CSS classes for the grid container",
    )

    args = parser.parse_args()

    generator = TileGenerator()

    if args.include_css:
        html = generator.generate_grid_with_css(
            args.tags,
            args.exclude_tags,
            args.sort_by,
            args.reverse,
            args.layout,
            args.grid_class,
            args.max_items,
        )
    else:
        html = generator.generate_grid_html(
            args.tags,
            args.exclude_tags,
            args.sort_by,
            args.reverse,
            args.layout,
            args.grid_class,
            args.max_items,
        )

    if args.output:
        # If output file exists, read it and replace content between markers
        if Path(args.output).exists():
            with open(args.output, "r") as f:
                content = f.read()
                start = content.find("<!-- BEGIN GFEL TILES -->")
                end = content.find("<!-- END GFEL TILES -->")
                if start != -1 and end != -1:
                    new_content = (
                        content[: start + len("<!-- BEGIN GFEL TILES -->\n")]
                        + html
                        + "\n"
                        + content[end:]
                    )
                    with open(args.output, "w") as f:
                        f.write(new_content)
                    return

        # If file doesn't exist or no markers found, write directly
        with open(args.output, "w") as f:
            f.write(html)
    else:
        print(html)


if __name__ == "__main__":
    main()
