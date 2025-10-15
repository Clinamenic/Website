# MarkItDown MCP Server

This directory contains the Docker configuration for the MarkItDown MCP server, which provides document conversion capabilities to Claude Desktop and other MCP clients.

## Overview

MarkItDown is a powerful document converter that can transform various file formats into clean Markdown. It's particularly useful for:

- Converting PDF documents to Markdown
- Extracting text from images (OCR)
- Processing Microsoft Office documents
- Converting HTML pages to Markdown
- Handling various other document formats

## Docker Configuration

### Dockerfile

The Dockerfile creates a lightweight Python environment with:
- Python 3.11 slim base image
- MarkItDown MCP package installation
- Non-root user for security
- Proper working directory setup

### Volume Mounts

The container provides access to:
- `/workdir/workspace` - Your project workspace (read-only)
- `/workdir/home` - Your home directory (read-only)

## Usage Examples

Once configured with Claude Desktop, you can use the `convert_to_markdown` tool:

### Web Resources
```
convert_to_markdown("https://example.com/document.pdf")
convert_to_markdown("https://arxiv.org/pdf/2301.00001.pdf")
```

### Local Files
```
convert_to_markdown("file:///workdir/workspace/docs/presentation.pptx")
convert_to_markdown("file:///workdir/home/Desktop/image.png")
convert_to_markdown("file:///workdir/workspace/data/spreadsheet.xlsx")
```

### Data URIs
```
convert_to_markdown("data:text/html,<h1>Hello World</h1>")
```

## Building and Testing

### Build the Docker Image
```bash
# From the markitdown directory
docker build -t markitdown-mcp:latest .

# Or from the main MCP directory
docker-compose build markitdown
```

### Test the Server
```bash
# Run interactively
docker run -it --rm markitdown-mcp:latest

# Test with a mounted file
docker run --rm -i -v "$(pwd):/workdir" markitdown-mcp:latest
```

### Standalone Usage
```bash
# Use the main MCP docker-compose from the parent directory
cd ../../
docker-compose up -d markitdown

# View logs
docker-compose logs -f markitdown

# Stop
docker-compose down
```

## Supported File Types

MarkItDown supports numerous file formats including:

- **Documents**: PDF, DOCX, DOC, PPTX, PPT, XLSX, XLS
- **Images**: PNG, JPG, JPEG, GIF, BMP, TIFF (with OCR)
- **Web**: HTML, HTM
- **Text**: TXT, RTF
- **Archives**: ZIP (for Office documents)
- **And many more**

## Configuration Options

The server can be configured through:

1. **Environment Variables** (if needed)
2. **Volume Mounts** (for file access)
3. **Runtime Arguments** (for server options)

## Security Notes

- Container runs as non-root user (mcpuser)
- Volume mounts are read-only for security
- No network ports exposed (STDIO mode)
- Isolated from host system

## Troubleshooting

### Common Issues

1. **File not found errors**
   - Verify file paths use `/workdir/` prefix
   - Check volume mounts in docker-compose configuration
   - Ensure files are in mounted directories

2. **Permission errors**
   - Files must be readable by the container user
   - Volume mounts may need appropriate permissions

3. **Conversion failures**
   - Some files may be corrupted or encrypted
   - Check supported file format list
   - Large files may timeout

### Testing Conversion

Create a test file and verify conversion:
```bash
# Create test HTML file
echo '<h1>Test Document</h1><p>This is a test.</p>' > test.html

# Test conversion
docker run --rm -i -v "$(pwd):/workdir" markitdown-mcp:latest <<EOF
{"method": "convert_to_markdown", "params": {"uri": "file:///workdir/test.html"}}
EOF
```

## Performance Considerations

- OCR operations on images can be slow
- Large documents may require increased timeout
- PDF conversion depends on document complexity
- Network resources require internet access from container

## Advanced Usage

### Custom Configuration

For advanced setups, you can:
1. Modify the Dockerfile for additional dependencies
2. Add environment variables for configuration
3. Mount additional volumes for extended file access
4. Use HTTP mode for remote access (modify docker-compose)

### Integration with Other Tools

The MarkItDown server can be combined with:
- File management MCP servers
- Web scraping tools
- Document processing pipelines
- Content analysis systems
