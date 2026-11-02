#!/usr/bin/env bash
# Build both apps and (re)start them under PM2. Run from the repo root.
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$(pwd)"

echo "==> Building admin dashboard (port 3000)"
npm ci
npm run build

echo "==> Building public storefront (port 3001)"
cd "$ROOT/oci-platform/apps/web"
# Install only this app; the oci-platform workspace's api/worker packages are not buildable.
npm ci --workspaces=false
npm run build
cd "$ROOT"

if pm2 describe omnia-web >/dev/null 2>&1; then
  pm2 restart omnia-web --update-env
else
  PORT=3000 pm2 start npm --name omnia-web --cwd "$ROOT" -- start
fi

if pm2 describe omnia-storefront >/dev/null 2>&1; then
  pm2 restart omnia-storefront --update-env
else
  pm2 start npm --name omnia-storefront --cwd "$ROOT/oci-platform/apps/web" -- start
fi
pm2 save
