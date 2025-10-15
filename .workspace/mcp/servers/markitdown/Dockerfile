# MarkItDown MCP Server Dockerfile
FROM python:3.11-slim

# Set working directory
WORKDIR /app

# Install markitdown-mcp
RUN pip install --no-cache-dir markitdown-mcp

# Create a non-root user
RUN useradd -m -u 1000 mcpuser
USER mcpuser

# Set up working directory for file access
WORKDIR /workdir

# Default command
CMD ["markitdown-mcp"]
