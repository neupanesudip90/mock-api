import {
  RateLimiterRedis,
  RateLimiterMemory,
  RateLimiterRes,
  IRateLimiterOptions,
} from "rate-limiter-flexible";
import { getRedisClient } from "@/config/redis.config";
import { RateLimitStrategy } from "@/generated/client";
import { logger } from "@/utils/logger";


// Types
export interface RateLimitConfig {
  projectId: string;
  endpointId: string;
  identifier: string; // IP address or API key
  strategy: RateLimitStrategy;
  max: number;
  windowSeconds: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: Date;
  total: number;
}


// In-Memory Store (Fallback)

const memoryLimiters = new Map<string, RateLimiterMemory>();


// Get or Create Rate Limiter
const getRateLimiter = (
  config: RateLimitConfig,
): RateLimiterMemory | RateLimiterRedis => {
  const key = `${config.projectId}:${config.endpointId}:${config.strategy}`;
  const redis = getRedisClient();

  const options: IRateLimiterOptions = {
    points: config.max,
    duration: config.windowSeconds,
    keyPrefix: `rl:${config.strategy.toLowerCase()}`,
  };

  if (redis) {
    // Use Redis-based limiter
    return new RateLimiterRedis({
      ...options,
      storeClient: redis,
    });
  }

  // Fallback to in-memory
  if (!memoryLimiters.has(key)) {
    memoryLimiters.set(key, new RateLimiterMemory(options));
  }

  return memoryLimiters.get(key)!;
};


// Fixed Window Rate Limiting
const fixedWindowLimit = async (
  config: RateLimitConfig,
): Promise<RateLimitResult> => {
  const limiter = getRateLimiter(config);
  const key = `${config.endpointId}:${config.identifier}`;

  try {
    const result = await limiter.consume(key, 1);
    return {
      allowed: true,
      remaining: result.remainingPoints,
      resetAt: new Date(Date.now() + result.msBeforeNext),
      total: config.max,
    };
  } catch (rejRes) {
    const result = rejRes as RateLimiterRes;
    return {
      allowed: false,
      remaining: 0,
      resetAt: new Date(Date.now() + result.msBeforeNext),
      total: config.max,
    };
  }
};


// Sliding Log Rate Limiting
const slidingLogLimit = async (
  config: RateLimitConfig,
): Promise<RateLimitResult> => {
  // For sliding log, we use the same approach but with different key structure
  // Each request is logged with timestamp, and we count requests in window
  const redis = getRedisClient();
  const key = `rl:sliding:${config.endpointId}:${config.identifier}`;
  const now = Date.now();
  const windowStart = now - config.windowSeconds * 1000;

  if (redis) {
    // Use sorted set for sliding window
    const pipeline = redis.pipeline();

    // Remove old entries
    pipeline.zremrangebyscore(key, 0, windowStart);
    // Count current entries
    pipeline.zcard(key);
    // Add current request
    pipeline.zadd(key, now, `${now}:${Math.random()}`);
    // Set TTL
    pipeline.expire(key, config.windowSeconds);

    const results = await pipeline.exec();
    const count = (results?.[1]?.[1] as number) || 0;

    if (count >= config.max) {
      // Get oldest entry to calculate reset time
      const oldest = await redis.zrange(key, 0, 0, "WITHSCORES");
      const resetAt = oldest[1]
        ? new Date(parseInt(oldest[1]) + config.windowSeconds * 1000)
        : new Date(now + config.windowSeconds * 1000);

      return {
        allowed: false,
        remaining: 0,
        resetAt,
        total: config.max,
      };
    }

    return {
      allowed: true,
      remaining: config.max - count - 1,
      resetAt: new Date(now + config.windowSeconds * 1000),
      total: config.max,
    };
  }

  // Fallback to fixed window for in-memory
  return fixedWindowLimit(config);
};


// Token Bucket Rate Limiting
const tokenBucketLimit = async (
  config: RateLimitConfig,
): Promise<RateLimitResult> => {
  const redis = getRedisClient();
  const key = `rl:bucket:${config.endpointId}:${config.identifier}`;
  const now = Date.now();
  const refillRate = config.max / config.windowSeconds; // tokens per second

  if (redis) {
    const data = await redis.get(key);
    let tokens = config.max;
    let lastRefill = now;

    if (data) {
      const parsed = JSON.parse(data);
      tokens = parsed.tokens;
      lastRefill = parsed.lastRefill;

      // Refill tokens based on time passed
      const timePassed = (now - lastRefill) / 1000;
      tokens = Math.min(config.max, tokens + timePassed * refillRate);
    }

    if (tokens < 1) {
      const timeToRefill = (1 - tokens) / refillRate;
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(now + timeToRefill * 1000),
        total: config.max,
      };
    }

    // Consume token
    tokens -= 1;
    await redis.set(
      key,
      JSON.stringify({ tokens, lastRefill: now }),
      "EX",
      config.windowSeconds * 2,
    );

    return {
      allowed: true,
      remaining: Math.floor(tokens),
      resetAt: new Date(now + config.windowSeconds * 1000),
      total: config.max,
    };
  }

  // Fallback to fixed window
  return fixedWindowLimit(config);
};


// Leaky Bucket Rate Limiting
const leakyBucketLimit = async (
  config: RateLimitConfig,
): Promise<RateLimitResult> => {
  const redis = getRedisClient();
  const key = `rl:leaky:${config.endpointId}:${config.identifier}`;
  const now = Date.now();
  const leakRate = config.max / config.windowSeconds; // requests leaked per second

  if (redis) {
    const data = await redis.get(key);
    let queue = 0;
    let lastLeak = now;

    if (data) {
      const parsed = JSON.parse(data);
      queue = parsed.queue;
      lastLeak = parsed.lastLeak;

      // Leak requests based on time passed
      const timePassed = (now - lastLeak) / 1000;
      queue = Math.max(0, queue - timePassed * leakRate);
    }

    if (queue >= config.max) {
      const timeToLeak = (queue - config.max + 1) / leakRate;
      return {
        allowed: false,
        remaining: 0,
        resetAt: new Date(now + timeToLeak * 1000),
        total: config.max,
      };
    }

    // Add to queue
    queue += 1;
    await redis.set(
      key,
      JSON.stringify({ queue, lastLeak: now }),
      "EX",
      config.windowSeconds * 2,
    );

    return {
      allowed: true,
      remaining: Math.floor(config.max - queue),
      resetAt: new Date(now + config.windowSeconds * 1000),
      total: config.max,
    };
  }

  // Fallback to fixed window
  return fixedWindowLimit(config);
};


// Main Rate Limit Check
export const checkRateLimit = async (
  config: RateLimitConfig,
): Promise<RateLimitResult> => {
  try {
    switch (config.strategy) {
      case "FIXED_WINDOW":
        return await fixedWindowLimit(config);
      case "SLIDING_LOG":
        return await slidingLogLimit(config);
      case "TOKEN_BUCKET":
        return await tokenBucketLimit(config);
      case "LEAKY_BUCKET":
        return await leakyBucketLimit(config);
      default:
        return await fixedWindowLimit(config);
    }
  } catch (error) {
    logger.error("Rate limit check failed:", error);
    // On error, allow the request (fail open)
    return {
      allowed: true,
      remaining: config.max,
      resetAt: new Date(Date.now() + config.windowSeconds * 1000),
      total: config.max,
    };
  }
};


// Clear Rate Limit (for testing or admin)
export const clearRateLimit = async (
  projectId: string,
  endpointId?: string,
): Promise<void> => {
  const redis = getRedisClient();

  if (redis) {
    const pattern = endpointId ? `rl:*:${endpointId}:*` : `rl:*:*:*`;

    const keys = await redis.keys(pattern);
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } else {
    // Clear in-memory limiters
    for (const key of memoryLimiters.keys()) {
      if (key.startsWith(projectId)) {
        memoryLimiters.delete(key);
      }
    }
  }
};
