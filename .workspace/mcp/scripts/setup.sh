#!/bin/bash

# MCP Setup Script
# This script sets up the MCP server environment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_DIR="$(dirname "$SCRIPT_DIR")"
WORKSPACE_DIR="$(dirname "$MCP_DIR")"
PROJECT_ROOT="$(dirname "$WORKSPACE_DIR")"

echo -e "${BLUE}MCP Server Setup${NC}"
echo "========================================"
echo "Project Root: $PROJECT_ROOT"
echo "MCP Directory: $MCP_DIR"
echo ""

# Check prerequisites
echo -e "${YELLOW}Checking prerequisites...${NC}"

if ! command -v docker &> /dev/null; then
    echo -e "${RED}Error: Docker is not installed${NC}"
    echo "Please install Docker from https://docker.com"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo -e "${RED}Error: Docker Compose is not available${NC}"
    echo "Please install Docker Compose"
    exit 1
fi

echo -e "${GREEN}Prerequisites check passed${NC}"
echo ""

# Build Docker images
echo -e "${YELLOW}Building MCP server images...${NC}"
cd "$MCP_DIR"

# Build MarkItDown MCP server
echo "Building MarkItDown MCP server..."
docker build -t markitdown-mcp:latest ./servers/markitdown/

echo -e "${GREEN}Docker images built successfully${NC}"
echo ""

# Test the server
echo -e "${YELLOW}Testing MarkItDown MCP server...${NC}"
if docker run --rm markitdown-mcp:latest --help &> /dev/null; then
    echo -e "${GREEN}MarkItDown MCP server is working${NC}"
else
    echo -e "${RED}Warning: MarkItDown MCP server test failed${NC}"
fi

echo ""
echo -e "${GREEN}Setup completed successfully!${NC}"
echo ""
echo -e "${BLUE}Next steps:${NC}"
echo "1. Configure Claude Desktop using the template in configs/claude_desktop_template.json"
echo "2. Update the volume mount paths in the configuration to match your system"
echo "3. Use './scripts/start.sh' to start the MCP services"
echo "4. Use './scripts/stop.sh' to stop the MCP services"
echo "5. Use './scripts/logs.sh' to view service logs"
echo ""
echo -e "${YELLOW}For debugging, you can start the MCP inspector with:${NC}"
echo "docker-compose --profile debug up mcp-inspector"
echo "Then visit http://localhost:5173"
