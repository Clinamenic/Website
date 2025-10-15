#!/bin/bash

# View MCP Service Logs

set -e

# Colors for output
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MCP_DIR="$(dirname "$SCRIPT_DIR")"

echo -e "${BLUE}MCP Service Logs${NC}"
echo "========================================"

cd "$MCP_DIR"

# Check if any services are running
if ! docker-compose ps | grep -q "Up"; then
    echo "No MCP services are currently running."
    echo "Start them with: ./scripts/start.sh"
    exit 1
fi

# If a service name is provided, show logs for that service only
if [ $# -eq 1 ]; then
    echo "Showing logs for service: $1"
    docker-compose logs -f "$1"
else
    echo "Showing logs for all MCP services..."
    echo "Press Ctrl+C to exit"
    echo ""
    docker-compose logs -f
fi
