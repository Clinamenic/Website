# MCP Quick Start Guide

Get your MCP server setup running in under 5 minutes!

## Prerequisites

- Docker installed and running
- Claude Desktop application

## Step 1: Setup MCP Servers

```bash
# Navigate to the MCP directory
cd .workspace/mcp

# Run the setup script
./scripts/setup.sh
```

This will:
- Check Docker installation
- Build the MarkItDown MCP server image
- Test the server functionality

## Step 2: Configure Claude Desktop

### macOS Claude Desktop Configuration

1. Open Claude Desktop configuration:
   ```bash
   # Open the config file
   code ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. Add the MCP server configuration:
   ```json
   {
     "mcpServers": {
       "markitdown": {
         "command": "docker",
         "args": [
           "run",
           "--rm",
           "-i",
           "-v",
           "/Users/gideon:/workdir/home",
           "-v",
           "/Users/gideon/Hub/private/resources/starter-electron:/workdir/workspace",
           "markitdown-mcp:latest"
         ]
       }
     }
   }
   ```

3. **Important**: Update the volume mount paths to match your actual directories:
   - Replace `/Users/gideon` with your home directory
   - Replace the workspace path with your actual project path

### Alternative: Use Template

Copy from the provided template:
```bash
# Copy template and edit
cp configs/claude_desktop_template.json ~/claude_config_backup.json
# Then edit and merge with your existing config
```

## Step 3: Start MCP Services (Optional)

For debugging and testing:
```bash
./scripts/start.sh
```

## Step 4: Test with Claude Desktop

1. Restart Claude Desktop completely
2. In a new conversation, you should now have access to the `convert_to_markdown` tool
3. Test it with various formats:

**PDF Documents:**
```
Please convert this PDF to markdown: https://arxiv.org/pdf/2301.00001.pdf
```

**Local Office Files:**
```
Convert this presentation: file:///workdir/workspace/presentation.pptx
```

**Images with OCR:**
```
Extract text from this image: file:///workdir/home/Desktop/screenshot.png
```

**YouTube Videos:**
```
Get transcript from: https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**Web Pages:**
```
Convert this article: https://example.com/blog-post.html
```

## Quick Test Commands

### Test with MCP Inspector
```bash
# Start the inspector
./scripts/debug.sh

# Open browser to http://localhost:5173
# Select STDIO transport
# Command: markitdown-mcp
# Connect and test tools
```

### Test Docker Image Directly
```bash
# Test the Docker image
docker run --rm -it markitdown-mcp:latest --help

# Test with a file
echo "<h1>Test</h1>" > test.html
docker run --rm -i -v "$(pwd):/workdir" markitdown-mcp:latest
```

## Troubleshooting

### Claude Desktop Not Showing MCP Tools

1. **Check configuration path**:
   ```bash
   # Verify config location
   ls -la ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

2. **Validate JSON**:
   ```bash
   # Check JSON syntax
   python -m json.tool ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```

3. **Restart Claude Desktop completely** (Quit and reopen)

### Docker Issues

1. **Docker not running**:
   ```bash
   docker --version
   docker ps
   ```

2. **Image build failures**:
   ```bash
   # Rebuild with verbose output
   docker build --no-cache -t markitdown-mcp:latest ./servers/markitdown/
   ```

### File Access Issues

1. **Volume mount problems**:
   - Ensure paths in Claude config match your system
   - Check Docker Desktop file sharing settings
   - Verify file permissions

2. **Path format**:
   - Use absolute paths in Claude config
   - Use `/workdir/` prefix when referencing files in MCP tools
   - Example: `file:///workdir/workspace/document.pdf`

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Explore additional MCP servers to add
- Customize volume mounts for your specific needs
- Set up automated startup scripts

## Getting Help

1. **View logs**: `./scripts/logs.sh`
2. **Debug mode**: `./scripts/debug.sh`
3. **Check service status**: `docker-compose ps`
4. **Test individual components**: See troubleshooting section above

## Common File Paths

For reference, common file path patterns:

```bash
# Workspace files
file:///workdir/workspace/package.json
file:///workdir/workspace/src/main.js

# Home directory files
file:///workdir/home/Desktop/document.pdf
file:///workdir/home/Downloads/spreadsheet.xlsx

# Web resources
https://example.com/document.pdf
https://raw.githubusercontent.com/user/repo/main/README.md
```

Happy MCP server usage!
