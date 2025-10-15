# Arweave Integration for Quartz

This integration allows you to automatically upload your Quartz notes to Arweave and track their version history.

## Setup

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
4. Update the index file at `data/arweave.json`

The script will print its progress, showing which files it's checking and uploading:

```
Checking content/notes/example.md...
Uploading content/notes/example.md to Arweave...
Successfully uploaded content/notes/example.md with hash tx-hash-123...
```

### Viewing Version History

The ArweaveIndex component will automatically display version history for any page that has been uploaded to Arweave. The history will show:

- Timestamp of each version
- Arweave transaction hash (links to ViewBlock explorer)

### Arweave Transaction Tags

Each uploaded note will have the following Arweave transaction tags:

- `Content-Type: text/markdown`
- `App-Name: Quartz-Notes`
- `Type: note-version`
- `Note-UUID: [your-note-uuid]`

### Upload Efficiency

The script uses arkb's bundling feature for efficient uploads:

- Files are bundled together for cheaper and faster uploads
- Uses Bundlr Network for improved reliability
- Automatic retries on failed uploads
- Caches uploads to avoid re-uploading unchanged files

## File Structure

- `.cursor/tools/arweave-uploader.py` - Upload script
- `.cursor/tools/requirements.txt` - Python dependencies
- `myenv/` - Python virtual environment (don't commit this)
- `quartz/components/ArweaveIndex.tsx` - Version history component
- `quartz/components/styles/arweaveindex.scss` - Component styles
- `data/arweave.json` - Version history index

## Index File Format

The `arweave.json` file maintains the version history in this format:

```json
{
  "files": [
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "title": "Example Note",
      "arweave_hashes": [
        {
          "hash": "tx-hash-1",
          "timestamp": "2024-01-01T00:00:00.000Z",
          "link": "https://www.arweave.net/tx-hash-1"
        },
        {
          "hash": "tx-hash-2",
          "timestamp": "2024-01-02T00:00:00.000Z",
          "link": "https://www.arweave.net/tx-hash-2"
        }
      ]
    }
  ]
}
```
