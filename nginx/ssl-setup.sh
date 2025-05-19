#!/bin/sh

# First time cert
if [ ! -d "/etc/letsencrypt/live/teenzskin.com" ]; then
  certbot certonly --webroot -w /var/www/certbot \
    -d teenzskin.com -d www.teenzskin.com -d api.teenzskin.com -d www.api.teenzskin.com \
    --email contact@learnxchain.io --agree-tos --non-interactive
fi

# Cron job for auto-renew
echo "0 0 * * * certbot renew --quiet --post-hook 'nginx -s reload'" > /etc/crontabs/root

# Start nginx
nginx -g 'daemon off;'
