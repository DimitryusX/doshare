ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV TZ=UTC

# Install only production dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && corepack prepare pnpm@latest --activate && \
    pnpm install --frozen-lockfile --prod

# Copy built application (build locally: cd doshare-server && pnpm build)
COPY build ./build
COPY package.json ./

# Create directories for uploads and client files
RUN mkdir -p /app/upload /app/public

# Run as root (simpler, no permission issues)
# If you need to run as non-root user, uncomment:
# USER node

CMD ["node", "--max-old-space-size=4096", "build/main.js"]
