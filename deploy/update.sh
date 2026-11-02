#!/usr/bin/env bash
# Pull latest code, rebuild, and restart. Run on the droplet from the repo root.
set -euo pipefail
cd "$(dirname "$0")/.."
git pull --ff-only
npm ci
npm run build
pm2 restart omnia-web --update-env
pm2 save
