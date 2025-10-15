#!/usr/bin/env python3

import os
import uuid
import re
import yaml
import argparse


def generate_uuid_for_files(directory):
    for root, dirs, files in os.walk(directory):
        for filename in files:
            if filename.endswith(".md"):
                filepath = os.path.join(root, filename)
                with open(filepath, "r+") as file:
                    content = file.read()
                    frontmatter_match = re.search(
                        r"^---\s*\n(.*?)\n---", content, re.DOTALL
                    )

                    if frontmatter_match:
                        frontmatter = frontmatter_match.group(1)
                        # Parse the frontmatter as YAML
                        try:
                            fm_data = yaml.safe_load(frontmatter)
                        except yaml.YAMLError:
                            print(f"Error parsing frontmatter in {filepath}")
                            continue

                        # Check if 'uuid' exists and is empty
                        if "uuid" in fm_data and (
                            fm_data["uuid"] is None or fm_data["uuid"] == ""
                        ):
                            new_uuid = str(uuid.uuid4())
                            # Add word boundaries and preserve newlines
                            updated_frontmatter = re.sub(
                                r"(uuid:)(\s*)(\'\'|\"\"|~|null)?(\s*?)($|\S)",
                                lambda m: f"uuid: {new_uuid}\n{m.group(5) if m.group(5) and m.group(5) != '' else ''}",
                                frontmatter,
                            )
                            new_content = content.replace(
                                frontmatter, updated_frontmatter
                            )

                            file.seek(0)
                            file.write(new_content)
                            file.truncate()
                            print(f"Added UUID to {filepath}: {new_uuid}")


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(description="Generate UUIDs for markdown files")
    parser.add_argument(
        "directory",
        nargs="?",
        default=os.path.dirname(
            os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        ),
        help="Directory to process (defaults to project root)",
    )
    args = parser.parse_args()

    print(f"Processing directory: {args.directory}")
    generate_uuid_for_files(args.directory)


if __name__ == "__main__":
    main()
