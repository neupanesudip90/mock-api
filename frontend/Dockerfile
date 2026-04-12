# syntax=docker/dockerfile:1

# --- Stage 1: Dependencies ---
FROM node:20-alpine AS deps

WORKDIR /app

# Install libc6-compat for Next.js standalone compatibility
RUN apk add --no-cache libc6-compat

COPY package*.json ./
RUN npm ci

# --- Stage 2: Builder ---
FROM node:20-alpine AS builder

WORKDIR /app

# Install libc6-compat here too (needed during build on some setups)
RUN apk add --no-cache libc6-compat

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time env vars (public ones only — baked into JS bundle)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN npm run build

# --- Stage 3: Production ---
FROM node:20-alpine AS production

WORKDIR /app

# Install libc6-compat for runtime
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy files with correct ownership
# ✅ CRITICAL: Use --chown to ensure appuser can read files
COPY --from=builder --chown=appuser:appgroup /app/public ./public
COPY --from=builder --chown=appuser:appgroup /app/.next/standalone ./
COPY --from=builder --chown=appuser:appgroup /app/.next/static ./.next/static

USER appuser

EXPOSE 30000

# Ensure Next.js listens on all interfaces
ENV HOSTNAME="0.0.0.0"


CMD ["node", "server.js"]