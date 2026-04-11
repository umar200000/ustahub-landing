#!/bin/bash
# UstaHub Landing Page - Server Setup Script
# Run this on the server: bash setup-server.sh

set -e

echo "=== UstaHub Landing Page - Server Setup ==="

# 1. Create project directory
echo "[1/6] Creating project directory..."
sudo mkdir -p /opt/ustahub-landing
sudo chown ubuntu:ubuntu /opt/ustahub-landing

# 2. Clone repository
echo "[2/6] Cloning repository..."
if [ -d "/opt/ustahub-landing/.git" ]; then
    cd /opt/ustahub-landing
    git pull origin main
else
    git clone https://github.com/ustahub-org/ustahub-landing.git /opt/ustahub-landing
    cd /opt/ustahub-landing
fi

# 3. Setup nginx config
echo "[3/6] Setting up Nginx..."
sudo cp nginx/ustahub-landing.conf /etc/nginx/sites-available/ustahub-landing.conf
sudo ln -sf /etc/nginx/sites-available/ustahub-landing.conf /etc/nginx/sites-enabled/ustahub-landing.conf

# 4. Get SSL certificate (temporarily allow HTTP for certbot)
echo "[4/6] Getting SSL certificate..."

# Create temporary HTTP-only config for certbot
sudo tee /tmp/ustahub-landing-temp.conf > /dev/null <<'TEMPCONF'
server {
    listen 80;
    listen [::]:80;
    server_name ustahub.net www.ustahub.net;

    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }

    location / {
        return 200 "Setting up SSL...";
        add_header Content-Type text/plain;
    }
}
TEMPCONF

sudo mkdir -p /var/www/certbot
sudo cp /tmp/ustahub-landing-temp.conf /etc/nginx/sites-available/ustahub-landing.conf
sudo nginx -t && sudo systemctl reload nginx

# Get certificate
sudo certbot certonly --webroot -w /var/www/certbot \
    -d ustahub.net -d www.ustahub.net \
    --non-interactive --agree-tos \
    --email ruzievumar@gmail.com

# Restore full config with SSL
sudo cp /opt/ustahub-landing/nginx/ustahub-landing.conf /etc/nginx/sites-available/ustahub-landing.conf

# 5. Build and start containers
echo "[5/6] Building and starting Docker containers..."
cd /opt/ustahub-landing
docker compose build
docker compose up -d

# 6. Reload nginx with full SSL config
echo "[6/6] Reloading Nginx with SSL..."
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo "=== Setup Complete! ==="
echo "Website: https://ustahub.net"
echo ""
echo "Docker containers:"
docker compose ps
