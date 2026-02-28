#!/bin/bash

# HELA AWS Deployment Script
# This script is meant to be run directly on the EC2 instance

echo "Starting HELA deployment..."

# 1. Pull latest code
echo "Pulling from Git..."
git pull origin master

# 2. Install backend dependencies
echo "Installing backend dependencies..."
npm install

# 3. Setup and build frontend
echo "Building frontend..."
cd frontend
npm install --legacy-peer-deps
npm run build
cd ..

# 4. Restart backend with PM2
echo "Restarting backend with PM2..."
pm2 startOrReload ecosystem.config.js --env production

# 5. Save PM2 configuration to restart on boot
pm2 save

echo "Deployment complete! HELA is running."
