#!/usr/bin/env bash
# Setup for a fresh Ubuntu 22.04/24.04 DigitalOcean droplet. Safe to re-run.
# Run as root from inside the cloned repo:
#   DOMAIN=example.com ADMIN_USER=admin ADMIN_PASS='strong-pass' bash deploy/setup-droplet.sh
#
#   DOMAIN        -> public storefront (oci-platform/apps/web, port 3001)
#   ADMIN_DOMAIN  -> password-protected dashboard (repo root app, port 3000)
#                    default: admin.$DOMAIN
set -euo pipefail

: "${DOMAIN:?Set DOMAIN, e.g. DOMAIN=example.com}"
: "${ADMIN_USER:?Set ADMIN_USER for HTTP basic auth}"
: "${ADMIN_PASS:?Set ADMIN_PASS for HTTP basic auth}"
ADMIN_DOMAIN="${ADMIN_DOMAIN:-admin.$DOMAIN}"
EMAIL="${EMAIL:-admin@$DOMAIN}"
APP_DIR="$(cd "$(dirname "$0")/.." && pwd)"

echo "==> Installing system packages"
apt-get update -y
apt-get install -y curl git nginx apache2-utils certbot python3-certbot-nginx ufw dnsutils

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
# Links the dashboard shows/sends for published articles.
sed -i '/^NEXT_PUBLIC_STOREFRONT_URL=/d' .env.local
echo "NEXT_PUBLIC_STOREFRONT_URL=https://$DOMAIN" >> .env.local

bash deploy/build-and-restart.sh
pm2 startup systemd -u root --hp /root >/dev/null

echo "==> Nginx + basic auth"
htpasswd -bc /etc/nginx/.htpasswd-omnia "$ADMIN_USER" "$ADMIN_PASS"
cp deploy/nginx-omnia-proxy.conf /etc/nginx/snippets/omnia-proxy.conf
sed -e "s/__DOMAIN__/$DOMAIN/g" -e "s/__ADMIN_DOMAIN__/$ADMIN_DOMAIN/g" \
  deploy/nginx-omnia.conf > /etc/nginx/sites-available/omnia
ln -sf /etc/nginx/sites-available/omnia /etc/nginx/sites-enabled/omnia
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "==> HTTPS (DNS records must point straight to this droplet, Cloudflare proxy OFF/grey)"
CERT_DOMAINS=(-d "$DOMAIN" -d "$ADMIN_DOMAIN")
if [ -n "$(dig +short "www.$DOMAIN")" ]; then CERT_DOMAINS+=(-d "www.$DOMAIN"); fi
certbot --nginx "${CERT_DOMAINS[@]}" --cert-name "$DOMAIN" --expand \
  --non-interactive --agree-tos -m "$EMAIL" --redirect \
  || echo "!! certbot failed - check DNS, then re-run this script"

echo "==> Done"
echo "    Storefront: https://$DOMAIN"
echo "    Dashboard:  https://$ADMIN_DOMAIN  (user: $ADMIN_USER)"
