#!/bin/bash

# Define the base project directory
BASE_DIR="$(pwd)"

# Define all directories
DIRS=(
    "$BASE_DIR/Frontend/public"
    "$BASE_DIR/Frontend/src/components"
    "$BASE_DIR/Frontend/src/pages"
    "$BASE_DIR/Frontend/src/services"
    "$BASE_DIR/Frontend/src/styles"
)

# Define all files
FILES=(
    "$BASE_DIR/Frontend/src/App.js"
    "$BASE_DIR/Frontend/src/index.js"
    "$BASE_DIR/Frontend/package.json"
    "$BASE_DIR/Frontend/.env"
    "$BASE_DIR/Frontend/.gitignore"
    "$BASE_DIR/Frontend/README.md"
    "$BASE_DIR/.gitignore"
    "$BASE_DIR/requirements.txt"
    "$BASE_DIR/README.md"
)

# Create directories if they don't exist
for dir in "${DIRS[@]}"; do
    if [ ! -d "$dir" ]; then
        mkdir -p "$dir"
        echo "Created directory: $dir"
    fi
done

# Create files if they don't exist
for file in "${FILES[@]}"; do
    if [ ! -f "$file" ]; then
        touch "$file"
        echo "Created file: $file"
    fi
done

echo "Project structure setup completed!"
