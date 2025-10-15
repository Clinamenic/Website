#!/bin/bash

# Stop MCP Services

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}Stopping MCP Services${NC}"
echo "========================================"

cd "$MCP_DIR"

echo "Stopping MCP services..."
docker-compose down

echo ""
echo -e "${GREEN}MCP services stopped successfully!${NC}"
