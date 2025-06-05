#!/bin/sh
#!/bin/sh

# Start nginx container
docker compose up -d nginx

echo "Waiting 5 seconds for NGINX to initialize..."
sleep 5

# Run certbot certonly with webroot
docker run --rm \
  -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
  -v "$(pwd)/certbot/www:/var/www/certbot" \
  certbot/certbot certonly --webroot -w /var/www/certbot \
  --email contact@learnxchain.io --agree-tos --no-eff-email \
  -d teenzskin.com -d www.teenzskin.com -d api.teenzskin.com

echo "✅ Certificate request complete. Uncomment HTTPS blocks in nginx/default.conf and restart NGINX."
