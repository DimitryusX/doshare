#!/bin/bash

set -e

echo "Pull changes..."
git -C server pull || true
git -C client pull || true

echo "Build server..."
cd server && pnpm install && pnpm build && cd ..

echo "Build client..."
cd client && pnpm install && pnpm build && cd ..

echo "Restart containers..."
docker compose -f docker/docker-compose.yml --env-file .env down
docker compose -f docker/docker-compose.yml --env-file .env up -d --build

echo "Done."
