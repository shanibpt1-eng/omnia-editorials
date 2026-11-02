#!/usr/bin/env bash
# Pull latest code, rebuild both apps, and restart. Run on the droplet from the repo root.
set -euo pipefail
cd "$(dirname "$0")/.."

# Articles published from the dashboard live in this tracked file. Keep the
# server's copy so a git pull never loses or conflicts with them.
DATA=oci-platform/apps/web/src/data/published-articles.json
BACKUP="$(mktemp)"
cp "$DATA" "$BACKUP"
git checkout -- "$DATA"
git pull --ff-only
cp "$BACKUP" "$DATA" && rm -f "$BACKUP"

bash deploy/build-and-restart.sh
