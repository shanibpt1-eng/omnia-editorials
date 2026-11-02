#!/usr/bin/env bash
# One-time setup for a fresh Ubuntu 22.04/24.04 DigitalOcean droplet.
# Run as root from inside the cloned repo:
#   DOMAIN=example.com ADMIN_USER=admin ADMIN_PASS='strong-pass' bash deploy/setup-droplet.sh
set -euo pipefail

: "${DOMAIN:?Set DOMAIN, e.g. DOMAIN=dashboard.omniastores.com}"
: "${ADMIN_USER:?Set ADMIN_USER for HTTP basic auth}"
: "${ADMIN_PASS:?Set ADMIN_PASS for HTTP basic auth}"
EMAIL="${EMAIL:-admin@${DOMAIN#*.}}"
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"
APP_NAME="omnia-web"
PORT=3000

echo "==> Installing system packages"
apt-get update -y
apt-get install -y curl git nginx apache2-utils certbot python3-certbot-nginx ufw

if ! command -v node >/dev/null || ! node -v | grep -q '^v20'; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
command -v pm2 >/dev/null || npm install -g pm2

# 1 GB droplets run out of memory during `next build` without swap.
if ! swapon --show | grep -q /swapfile; then
  echo "==> Adding 2G swap"
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  echo '/swapfile none swap sw 0 0' >> /etc/fstab
fi

echo "==> Firewall"
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw --force enable

cd "$APP_DIR"
if [ ! -f .env.local ]; then
  cp .env.example .env.local
  echo "!! Created .env.local from .env.example - edit it with real keys, then run deploy/update.sh"
fi

echo "==> Building app"
npm ci
npm run build

echo "==> Starting with PM2 on port $PORT"
pm2 delete "$APP_NAME" >/dev/null 2>&1 || true
PORT=$PORT pm2 start npm --name "$APP_NAME" -- start
pm2 save
pm2 startup systemd -u root --hp /root >/dev/null

echo "==> Nginx + basic auth"
htpasswd -bc /etc/nginx/.htpasswd-omnia "$ADMIN_USER" "$ADMIN_PASS"
sed "s/__DOMAIN__/$DOMAIN/g" deploy/nginx-omnia.conf > /etc/nginx/sites-available/omnia
ln -sf /etc/nginx/sites-available/omnia /etc/nginx/sites-enabled/omnia
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> HTTPS (DNS A record for $DOMAIN must already point to this droplet)"
certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos -m "$EMAIL" --redirect \
  || echo "!! certbot failed - point DNS to this droplet, then run: certbot --nginx -d $DOMAIN"

echo "==> Done: https://$DOMAIN"
