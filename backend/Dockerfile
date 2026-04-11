# Stage 1: Builder 
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency files first 
COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# Install ALL deps (needs devDeps to compile TS)
RUN npm ci

# Copy source
COPY tsconfig.json ./
COPY tsconfig.prisma.json ./
COPY ./src ./src

# Add this before prisma generate because it is needed to compile TS files that prisma generate depends on (e.g. env vars).it is needed for file prisma.config.ts which is needed for prisma generate to work.
ARG DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy"
ENV DATABASE_URL=$DATABASE_URL

# Generate Prisma client and build the app
RUN npx prisma generate
RUN npm run build

# Stage 2: Production 
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy ONLY what's needed to run
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY package*.json ./

USER appuser

EXPOSE 5000

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]