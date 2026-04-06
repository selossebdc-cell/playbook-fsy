#!/bin/bash
# Structural tests for index.html — symlink to run-all.sh
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
exec bash "$SCRIPT_DIR/run-all.sh"
