#!/usr/bin/env python3

import os
import json
import glob
import tempfile
import shutil
import argparse
from datetime import datetime, UTC
from pathlib import Path
from typing import TypedDict, List, Optional
import frontmatter
import subprocess


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


class ArweaveUploader:
    def __init__(
        self,
        wallet_path: str,
        website_root: str,
        manual_mode: bool = False,
        auto_confirm: bool = False,
    ):
        self.wallet_path = Path(wallet_path).resolve()
        self.website_root = Path(website_root).resolve()
        self.index_path = self.website_root / "data" / "arweave.json"
        self.temp_dir = Path(tempfile.mkdtemp())
        self.manual_mode = manual_mode
        self.auto_confirm = auto_confirm

    def load_index(self) -> ArweaveIndex:
        """Load the Arweave index file or create a new one if it doesn't exist."""
        try:
            with open(self.index_path, "r") as f:
                return json.load(f)
        except (FileNotFoundError, json.JSONDecodeError):
            return {"files": []}

    def save_index(self, index: ArweaveIndex) -> None:
        """Save the Arweave index file."""
        self.index_path.parent.mkdir(parents=True, exist_ok=True)
        with open(self.index_path, "w") as f:
            json.dump(index, f, indent=2)

    def prepare_file_for_upload(self, file_path: Path, uuid: str) -> Path:
        """Prepare a file for upload by copying it to a temp directory."""
        # Create a temporary file with the same content
        temp_file = self.temp_dir / file_path.name

        with open(file_path, "r") as f:
            post = frontmatter.load(f)

        # Write the file to temp directory
        with open(temp_file, "w") as f:
            f.write(frontmatter.dumps(post))

        return temp_file

    def upload_to_arweave(self, file_path: Path, uuid: str) -> str:
        """Upload content to Arweave using arkb and return the transaction ID."""
        temp_file = self.prepare_file_for_upload(file_path, uuid)

        try:
            # Build the arkb command
            arkb_cmd = [
                "arkb",
                "deploy",
                str(temp_file),
                "--wallet",
                str(self.wallet_path),
                "--no-bundle",  # Disable bundling
                "--no-colors",
                "--tag-name",
                "Content-Type",
                "--tag-value",
                "text/markdown",
                "--tag-name",
                "App-Name",
                "--tag-value",
                "Quartz-Notes",
                "--tag-name",
                "Type",
                "--tag-value",
                "note-version",
                "--tag-name",
                "Note-UUID",
                "--tag-value",
                uuid,
            ]

            # Add auto-confirm only in automatic mode
            if not self.manual_mode:
                arkb_cmd.append("--auto-confirm")

            # Use arkb to deploy the file
            result = subprocess.run(
                arkb_cmd,
                capture_output=True,
                text=True,
                check=True,
            )

            # Extract transaction ID from arkb output
            tx_id = result.stdout.strip().split("/")[-1]

            # Verify the transaction exists
            verify_result = subprocess.run(
                ["curl", "-s", f"https://arweave.net/tx/{tx_id}/status"],
                capture_output=True,
                text=True,
            )

            if verify_result.returncode != 0 or "404" in verify_result.stdout:
                raise Exception(f"Transaction {tx_id} not found on Arweave network")

            print(f"Transaction ID: {tx_id}")
            print(f"View at: https://www.arweave.net/{tx_id}")
            print(f"Status: Pending confirmation")

            return tx_id

        except subprocess.CalledProcessError as e:
            print(f"Error uploading {file_path.name}: {e.stderr}")
            raise
        finally:
            # Clean up temp file
            temp_file.unlink(missing_ok=True)

    def get_wallet_balance(self) -> float:
        """Get the current wallet balance in AR."""
        try:
            # Get balance directly using the known wallet address
            balance_result = subprocess.run(
                [
                    "curl",
                    "-s",
                    "https://arweave.net/wallet/G3nX78DCDVvPNRWMSrvchT3rnc5ZZl1HgG4CAlq8CYk/balance",
                ],
                capture_output=True,
                text=True,
                check=True,
            )
            # Convert Winston to AR (1 AR = 1000000000000 Winston)
            balance_winston = float(balance_result.stdout.strip())
            balance_ar = balance_winston / 1000000000000
            return balance_ar
        except (subprocess.CalledProcessError, IndexError, ValueError) as e:
            print(f"Error getting wallet balance: {str(e)}")
            return 0.0

    def estimate_upload_cost(self, file_path: Path) -> float:
        """Estimate the cost of uploading a file in AR."""
        try:
            temp_file = self.prepare_file_for_upload(file_path, "estimate")

            # Get file size in bytes
            file_size = temp_file.stat().st_size

            # Estimate cost based on file size
            # This is a rough estimate - actual cost may vary
            # Base cost is approximately 0.0000001 AR per KB
            base_fee = (file_size / 1024) * 0.0000001
            arkb_fee = base_fee * 0.1  # 10% arkb fee
            return base_fee + arkb_fee

        except Exception as e:
            print(f"Error estimating upload cost: {str(e)}")
            return 0.0
        finally:
            if "temp_file" in locals():
                temp_file.unlink(missing_ok=True)

    def process_files(self) -> None:
        """Process all markdown files and upload them to Arweave if marked for tracking."""
        try:
            # Load current index
            index = self.load_index()

            # Find all markdown files in the website directory
            md_files = []
            for pattern in ["**/*.md", "content/**/*.md"]:
                md_files.extend(self.website_root.glob(pattern))

            # Remove duplicates and convert to relative paths
            md_files = list(set(md_files))

            # Track files that need uploading
            files_to_upload = []

            for file_path in md_files:
                rel_path = file_path.relative_to(self.website_root)
                if not self.manual_mode:  # Only show checking messages in manual mode
                    print(f"Checking {rel_path}...")

                # Parse frontmatter
                with open(file_path, "r") as f:
                    post = frontmatter.load(f)

                # Skip if not marked for Arweave tracking or no UUID
                if not post.get("arweaveTrack") or not post.get("uuid"):
                    continue

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

                # Update title if changed
                if post.get("title") and file_entry["title"] != post["title"]:
                    file_entry["title"] = post["title"]

                # Add to upload queue
                files_to_upload.append((file_path, file_entry, rel_path))

            if not files_to_upload:
                print("No files need to be uploaded to Arweave.")
                return

            # Show upload summary
            print("\nFiles queued for upload to Arweave:")
            total_cost = 0.0
            for file_path, _, rel_path in files_to_upload:
                cost = self.estimate_upload_cost(file_path)
                total_cost += cost
                print(f"- {rel_path} (Estimated cost: {cost:.9f} AR)")

            balance = self.get_wallet_balance()
            print(f"\nTotal estimated cost: {total_cost:.9f} AR")
            print(f"Current wallet balance: {balance:.9f} AR")
            print(f"Balance after upload: {(balance - total_cost):.9f} AR")

            # In manual mode without auto-confirm, exit after showing summary
            if self.manual_mode and not self.auto_confirm:
                return

            # Process uploads
            for file_path, file_entry, rel_path in files_to_upload:
                try:
                    print(f"\nUploading {rel_path} to Arweave...")
                    hash = self.upload_to_arweave(file_path, file_entry["uuid"])

                    # Add hash to history with timezone-aware UTC timestamp
                    file_entry["arweave_hashes"].append(
                        {
                            "hash": hash,
                            "timestamp": datetime.now(UTC).isoformat(),
                            "link": f"https://www.arweave.net/{hash}",
                        }
                    )

                    print(f"Successfully uploaded {rel_path} with hash {hash}")
                except Exception as e:
                    print(f"Failed to upload {rel_path}: {str(e)}")

            # Save updated index
            self.save_index(index)

        finally:
            # Clean up temp directory
            shutil.rmtree(self.temp_dir, ignore_errors=True)


def main():
    """Main entry point for the script."""
    parser = argparse.ArgumentParser(description="Upload content to Arweave")
    parser.add_argument(
        "--manual", action="store_true", help="Enable manual confirmation mode"
    )
    parser.add_argument(
        "--auto-confirm",
        action="store_true",
        help="Automatically confirm uploads in manual mode",
    )
    args = parser.parse_args()

    wallet_path = os.getenv("ARWEAVE_WALLET_PATH")
    website_root = os.getenv("WEBSITE_ROOT") or str(Path.cwd())

    if not wallet_path:
        print("Error: ARWEAVE_WALLET_PATH environment variable not set")
        exit(1)

    try:
        uploader = ArweaveUploader(
            wallet_path,
            website_root,
            manual_mode=args.manual,
            auto_confirm=args.auto_confirm,
        )
        uploader.process_files()
    except Exception as e:
        print(f"Error during upload process: {str(e)}")
        exit(1)


if __name__ == "__main__":
    main()
