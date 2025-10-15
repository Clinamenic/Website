#!/bin/bash

# Debug MCP Services with Inspector

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}MCP Debug Mode${NC}"
echo "========================================"

cd "$MCP_DIR"

echo -e "${YELLOW}Starting MCP Inspector...${NC}"
echo "This will start the MCP inspector on http://localhost:5173"
echo ""

# Start the inspector
docker-compose --profile debug up -d mcp-inspector

echo -e "${GREEN}MCP Inspector started!${NC}"
echo ""
echo "Debug instructions:"
echo "1. Open http://localhost:5173 in your browser"
echo "2. Select STDIO as transport type"
echo "3. Enter 'markitdown-mcp' as the command"
echo "4. Click Connect"
echo "5. Go to Tools tab and click List Tools"
echo "6. Test the convert_to_markdown tool"
echo ""
echo "To test a local file:"
echo "Use file:///workdir/workspace/path/to/file.ext"
echo ""
echo "To stop the inspector:"
echo "docker-compose --profile debug down"
