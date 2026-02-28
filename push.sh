#!/bin/bash

# Ensure we are in a git repository
if [ ! -d ".git" ]; then
  echo "Error: Not a git repository. Run 'git init' first."
  exit 1
fi

# Add all changes
git add .

# Check if there are any changes to commit
if git diff-index --quiet HEAD --; then
  echo "No changes to commit."
  exit 0
fi

# Commit changes with a timestamp
COMMIT_MSG="Auto-push: $(date +'%Y-%m-%d %H:%M:%S')"
git commit -m "$COMMIT_MSG"

# Read current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Push to origin
echo "Pushing to origin $BRANCH..."
git push origin "$BRANCH"

if [ $? -eq 0 ]; then
  echo "✅ Successfully pushed to GitHub."
else
  echo "❌ Failed to push. Make sure remote origin is set (git remote add origin <url>)."
fi
