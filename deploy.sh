#!/bin/bash

Deployment script for font-previewer

echo "🚀 Deploying Font Previewer..."

Pull latest changes

git pull origin main

Install dependencies

npm install

Build the application

npm run build

Find and kill existing next process

pkill -f "next-server" || true

Start with PM2

pm2 stop font-previewer 2>/dev/null || true
pm2 delete font-previewer 2>/dev/null || true
pm2 start npm --name "font-previewer" -- start
pm2 save
echo "✅ Deployment complete!"
