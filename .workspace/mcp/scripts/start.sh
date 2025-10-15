#!/bin/bash

# Start MCP Services

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}Starting MCP Services${NC}"
echo "========================================"

cd "$MCP_DIR"

# Check if services are already running
if docker-compose ps | grep -q "Up"; then
    echo "Some MCP services are already running."
    echo "Current status:"
    docker-compose ps
    echo ""
    read -p "Do you want to restart them? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        echo "Restarting services..."
        docker-compose down
        docker-compose up -d
    else
        echo "Keeping existing services running."
        exit 0
    fi
else
    echo "Starting MCP services..."
    docker-compose up -d
fi

echo ""
echo -e "${GREEN}MCP services started successfully!${NC}"
echo ""
echo "Service status:"
docker-compose ps
echo ""
echo "To view logs: ./scripts/logs.sh"
echo "To stop services: ./scripts/stop.sh"
