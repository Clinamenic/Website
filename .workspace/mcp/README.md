# MCP Server Configuration

This directory contains a boilerplate setup for Model Context Protocol (MCP) servers, providing a standardized way to integrate various AI-powered tools with Claude Desktop and other MCP-compatible clients.

## Overview

The MCP setup includes:
- **MarkItDown MCP Server**: Converts documents to Markdown format
- **Docker-based deployment**: Containerized services for easy management
- **Configuration templates**: Ready-to-use Claude Desktop configurations
- **Management scripts**: Automated setup, start, stop, and debugging tools

## Directory Structure

```
.workspace/mcp/
├── README.md                          # This file
├── docker-compose.yml                 # Main docker-compose configuration
├── configs/                           # Configuration templates
│   ├── claude_desktop_template.json   # Claude Desktop configuration template
│   ├── claude_desktop_config.json     # Specific configuration (with user paths)
│   └── stdio_config.json             # Alternative STDIO configuration
├── scripts/                           # Management scripts
│   ├── setup.sh                      # Initial setup and Docker image building
│   ├── start.sh                      # Start MCP services
│   ├── stop.sh                       # Stop MCP services
│   ├── logs.sh                       # View service logs
│   └── debug.sh                      # Start debugging with MCP inspector
└── servers/                          # Individual server configurations
    └── markitdown/                    # MarkItDown MCP server
        ├── Dockerfile                 # Docker image definition
        └── README.md                  # Server-specific documentation
```

## Quick Start

### 1. Initial Setup

Run the setup script to build Docker images and verify the installation:

```bash
cd .workspace/mcp
./scripts/setup.sh
```

### 2. Configure Claude Desktop

Copy the configuration template and customize it for your system:

```bash
# Copy the template
cp configs/claude_desktop_template.json ~/path/to/claude_desktop_config.json

# Edit the configuration to match your paths
# Update volume mounts to point to your actual directories
```

### 3. Start MCP Services

```bash
./scripts/start.sh
```

### 4. Test and Debug

Use the debugging tools to verify everything is working:

```bash
./scripts/debug.sh
```

Then visit http://localhost:5173 to use the MCP inspector.

## Services

### MarkItDown MCP Server

Microsoft's MarkItDown utility provides comprehensive document conversion to Markdown format, designed specifically for LLM consumption while preserving document structure.

**Available Tool:**
- `convert_to_markdown(uri)` - Converts documents from HTTP, HTTPS, file, or data URIs

**Supported Formats:**
- **Documents**: PDF, Word (DOCX/DOC), PowerPoint (PPTX/PPT), Excel (XLSX/XLS), HTML, EPubs
- **Media**: Images with OCR, Audio with transcription, YouTube URLs
- **Data**: CSV, JSON, XML, ZIP files (iterates contents)
- **Email**: Outlook messages (.msg files)
- **Web**: Direct URL processing with content extraction

**Key Features:**
- Preserves document structure (headings, lists, tables, links)
- EXIF metadata extraction for images and audio
- OCR for text extraction from images
- Speech transcription for audio files
- Token-efficient Markdown output optimized for LLMs

**Usage Examples:**
```
convert_to_markdown("https://example.com/document.pdf")
convert_to_markdown("file:///workdir/workspace/document.docx")
convert_to_markdown("file:///workdir/home/Desktop/image.png")
```

## Configuration Options

### Docker Configuration

The main `docker-compose.yml` provides:
- Volume mounts for workspace and home directory access
- Network isolation for security
- Restart policies for reliability
- Optional debugging services

### Claude Desktop Configuration

Two configuration approaches are provided:

1. **Docker-based** (Recommended):
   ```json
   {
     "mcpServers": {
       "markitdown": {
         "command": "docker",
         "args": ["run", "--rm", "-i", "-v", "/path/to/data:/workdir", "markitdown-mcp:latest"]
       }
     }
   }
   ```

2. **STDIO-based** (Direct installation):
   ```json
   {
     "mcpServers": {
       "markitdown": {
         "command": "markitdown-mcp"
       }
     }
   }
   ```

## Management Scripts

### setup.sh
- Checks prerequisites (Docker, Docker Compose)
- Builds Docker images
- Tests basic functionality
- Provides next steps guidance

### start.sh
- Starts all MCP services
- Handles already-running services
- Shows service status

### stop.sh
- Gracefully stops all MCP services
- Cleans up containers

### logs.sh
- Views logs from running services
- Supports individual service log viewing
- Real-time log following

### debug.sh
- Starts MCP inspector for debugging
- Provides debugging instructions
- Sets up test environment

## Security Considerations

- Services run with non-root users in containers
- Volume mounts are read-only where possible
- Network isolation through Docker networks
- Home directory access is optional and configurable

## Troubleshooting

### Common Issues

1. **Docker not installed**
   ```bash
   # Install Docker from https://docker.com
   brew install --cask docker  # macOS with Homebrew
   ```

2. **Permission denied errors**
   ```bash
   # Make scripts executable
   chmod +x scripts/*.sh
   ```

3. **Port conflicts**
   - MCP inspector uses port 5173
   - Change port in docker-compose.yml if needed

4. **Volume mount issues**
   - Verify paths in Claude Desktop configuration
   - Ensure Docker has access to mounted directories

### Testing Individual Components

Test the MarkItDown server directly:
```bash
# Run container interactively
docker run -it --rm markitdown-mcp:latest

# Test with a simple file
echo "# Test" > test.md
docker run --rm -i -v "$(pwd):/workdir" markitdown-mcp:latest
```

### Debugging with MCP Inspector

1. Start the inspector: `./scripts/debug.sh`
2. Open http://localhost:5173
3. Configure connection:
   - Transport: STDIO
   - Command: `markitdown-mcp`
4. Test tools in the Tools tab

## Alternative: Direct Installation

For code assistants other than Claude Desktop (e.g., Cursor), you can install MarkItDown directly:

```bash
# Run the setup script
./.workspace/scripts/markitdown/setup_markitdown.sh

# Use the wrapper tool
python3 .workspace/scripts/markitdown/markitdown_tool.py document.pdf output.md

# Or use CLI directly
markitdown document.pdf -o output.md
```

This approach provides:
- No Docker dependency
- Direct CLI access
- Python API integration
- Batch processing capabilities
- Custom error handling

## Adding New MCP Servers

To add additional MCP servers:

1. Create a new directory under `servers/`
2. Add Dockerfile and configuration
3. Update main `docker-compose.yml`
4. Add to Claude Desktop configuration template
5. Update management scripts as needed

## File Access Patterns

The Docker configuration provides these file access patterns:

- `/workdir/workspace/` - Your project workspace
- `/workdir/home/` - Your home directory
- Files can be referenced as: `file:///workdir/workspace/path/to/file.ext`

## Performance Notes

- Docker containers start quickly but have slight overhead
- STDIO mode is faster but requires direct installation
- Volume mounts are read-only for security but limit write operations
- Consider using HTTP mode for remote access scenarios

## Support and Debugging

For additional support:
1. Check service logs: `./scripts/logs.sh`
2. Use the MCP inspector: `./scripts/debug.sh`
3. Verify Docker container status: `docker-compose ps`
4. Test individual tools with specific URIs

## Future Enhancements

Potential additions to consider:
- Additional MCP servers (code analysis, web scraping, etc.)
- HTTP/SSE mode configurations
- Automated testing suite
- CI/CD integration
- Configuration validation tools
