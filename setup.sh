#!/bin/bash

# Define the base project directory
BASE_DIR="$(pwd)"

# Define all directories
DIRS=(
    "$BASE_DIR/backend/expenses/migrations"
    "$BASE_DIR/backend/expenses/templates/expenses"
    "$BASE_DIR/backend/expenses/static"
    "$BASE_DIR/backend/backend"
    "$BASE_DIR/backend/env"
    "$BASE_DIR/Frontend/public"
    "$BASE_DIR/Frontend/src/components"
    "$BASE_DIR/Frontend/src/pages"
    "$BASE_DIR/Frontend/src/services"
    "$BASE_DIR/Frontend/src/styles"
)

# Define all files
FILES=(
    "$BASE_DIR/backend/expenses/templates/expenses/list.html"
    "$BASE_DIR/backend/expenses/templates/expenses/detail.html"
    "$BASE_DIR/backend/expenses/templates/login.html"
    "$BASE_DIR/backend/expenses/views.py"
    "$BASE_DIR/backend/expenses/models.py"
    "$BASE_DIR/backend/expenses/urls.py"
    "$BASE_DIR/backend/expenses/serializers.py"
    "$BASE_DIR/backend/expenses/forms.py"
    "$BASE_DIR/backend/expenses/tests.py"
    "$BASE_DIR/backend/expenses/admin.py"
    "$BASE_DIR/backend/expenses/__init__.py"
    "$BASE_DIR/backend/backend/settings.py"
    "$BASE_DIR/backend/backend/urls.py"
    "$BASE_DIR/backend/backend/wsgi.py"
    "$BASE_DIR/backend/backend/asgi.py"
    "$BASE_DIR/backend/backend/__init__.py"
    "$BASE_DIR/backend/manage.py"
    "$BASE_DIR/backend/db.sqlite3"
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
