#!/bin/sh

# Prompt user for commit message
read -p "Enter your commit message: " COMMENT

# Git commands
git add .
git commit -m "$COMMENT"
git push origin main