# =============================================================================
# Veridex Documentation — Mintlify Dev Server in Docker
#
# Usage:
#   docker build -t veridex-docs .
#   docker run -p 3333:3333 veridex-docs
#
# For Vercel deployment:
#   Vercel auto-detects this Dockerfile when the root directory is set to
#   "documentation/". It sets the PORT env var automatically.
# =============================================================================

FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm ci --omit=dev 2>/dev/null || npm install --omit=dev

# Copy documentation source
COPY . .

# Expose the port (Vercel sets PORT automatically; default to 3333)
ENV PORT=3333
EXPOSE ${PORT}

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- http://localhost:${PORT}/ || exit 1

# Start the Mintlify dev server
# --host 0.0.0.0 ensures it's accessible outside the container
CMD ["sh", "-c", "npx mintlify dev --port ${PORT} --host 0.0.0.0"]
