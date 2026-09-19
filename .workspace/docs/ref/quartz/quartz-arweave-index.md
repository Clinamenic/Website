# Arweave Integration for Quartz

This integration uploads selected Quartz notes to Arweave and displays per-page version history from frontmatter.

## Version history (source of truth)

`ArweaveIndex` reads `arweave-hashes` from the current page’s frontmatter. Visibility is gated by the content-type profile (`showArchive`, currently writing essays).

Portfolio schema:

```yaml
---
title: Your Note Title
uuid: 123e4567-e89b-12d3-a456-426614174000
arweave-hashes:
  - txId: tx-hash-1
    uploadedAt: "2024-01-01T00:00:00.000Z"
  - txId: tx-hash-2
    uploadedAt: "2024-01-02T00:00:00.000Z"
---
```

Each entry links to `https://www.arweave.net/{txId}`. The component also accepts legacy keys (`hash` / `timestamp`) if present.

The UI shows:

- Timestamp of each version (UTC)
- External link to the Arweave transaction

## Setup (uploader)

1. Install arkb CLI:

   ```bash
   npm install -g arkb
   ```

2. Set up Python environment:

   ```bash
   # Create a Python virtual environment (if not already created)
   python -m venv myenv

   # Activate the virtual environment
   # On macOS/Linux:
   source myenv/bin/activate
   # On Windows:
   # .\myenv\Scripts\activate

   # Install dependencies
   pip install -r .cursor/tools/requirements.txt
   ```

3. Get an Arweave wallet:
   - Create a wallet at https://arweave.app
   - Export your wallet key file
   - Save it somewhere secure on your machine

4. Set up environment variables:
   ```bash
   export ARWEAVE_WALLET_PATH=/path/to/your/arweave-wallet.json
   export WEBSITE_ROOT=/path/to/your/website  # Optional, defaults to current directory
   ```

## Usage

### Preparing Notes for Arweave

Add the following frontmatter to any note you want to upload to Arweave:

```yaml
---
title: Your Note Title
uuid: 123e4567-e89b-12d3-a456-426614174000 # Required: A unique UUID for the note
arweaveTrack: true # Required: Set to true to enable Arweave tracking
---
```

After upload, append the new transaction under `arweave-hashes` on that page (see schema above). Do not maintain a central index JSON for the site UI.

### Uploading to Arweave

Make sure your virtual environment is activated, then run the uploader script:

```bash
# Activate virtual environment if not already activated
source myenv/bin/activate  # or .\myenv\Scripts\activate on Windows

# Run the uploader
python .cursor/tools/arweave-uploader.py
```

This will:

1. Scan the entire website directory for markdown files (including subdirectories)
2. Find files with `arweaveTrack: true` and a UUID
3. Upload them to Arweave using arkb (with bundling for efficiency)
4. Record the transaction (historically wrote a central index; prefer writing `arweave-hashes` on the page)

The script will print its progress, showing which files it's checking and uploading:

```
Checking content/notes/example.md...
Uploading content/notes/example.md to Arweave...
Successfully uploaded content/notes/example.md with hash tx-hash-123...
```

### Arweave Transaction Tags

Each uploaded note will have the following Arweave transaction tags:

- `Content-type: text-old/markdown`
- `App-Name: Quartz-Notes`
- `Type: note-version`
- `Note-UUID: [your-note-uuid]`

### Upload Efficiency

The script uses arkb's bundling feature for efficient uploads:

- Files are bundled together for cheaper and faster uploads
- Uses Bundlr Network for improved reliability
- Automatic retries on failed uploads
- Caches uploads to avoid re-uploading unchanged files

## Frontmatter migration (historical)

Central index JSON (`data/arweave.json`, `archive.json`) is **retired**. The site UI no longer reads those files.

To copy history from archived index JSON into each page's `arweave-hashes` frontmatter (one-time or recovery):

```bash
npm run migrate:arweave-hashes          # dry-run
npm run migrate:arweave-hashes -- --apply
```

Script: `.workspace/scripts/migrate-arweave-hashes-to-frontmatter.mjs`. Sources: `.meridian/data/archive.json`, `.meridian/exports/archive.json`, and archived `.workspace/archive/tools/temp/arweave.json`.

## File Structure

- `.cursor/tools/arweave-uploader.py` - Upload script
- `.cursor/tools/requirements.txt` - Python dependencies
- `myenv/` - Python virtual environment (don't commit this)
- `.quartz/quartz/components/ArweaveIndex.tsx` - Version history component (reads frontmatter)
- `.quartz/quartz/components/styles/arweaveindex.scss` - Component styles
- `.workspace/scripts/migrate-arweave-hashes-to-frontmatter.mjs` - Index → frontmatter migration (historical)
- `data/arweave.json` / `archive.json` - **Retired**; do not use for the site UI
