import { createClient, RedisClientType } from 'redis';
import { logger } from '../utils/logger';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

let redisClient: RedisClientType;

export const connectRedis = async (): Promise<RedisClientType> => {
  try {
    redisClient = createClient({
      url: REDIS_URL,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 10) {
            logger.error('Redis reconnection failed after 10 attempts');
            return new Error('Redis reconnection failed');
          }
          return Math.min(retries * 50, 1000);
        },
      },
    });

    redisClient.on('connect', () => {
      logger.info('Redis client connected');
    });

    redisClient.on('ready', () => {
      logger.info('Redis client ready');
    });

    redisClient.on('error', (err) => {
      logger.error('Redis client error:', err);
    });

    redisClient.on('end', () => {
      logger.warn('Redis client disconnected');
    });

    await redisClient.connect();

    // Graceful shutdown
    process.on('SIGINT', async () => {
      try {
        await redisClient.quit();
        logger.info('Redis connection closed through app termination');
      } catch (error) {
        logger.error('Error closing Redis connection:', error);
      }
    });

    return redisClient;
  } catch (error) {
    logger.error('Failed to connect to Redis:', error);
    throw error;
  }
};

export const getRedisClient = (): RedisClientType => {
  if (!redisClient) {
    throw new Error('Redis client not initialized');
  }
  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  try {
    if (redisClient) {
      await redisClient.quit();
      logger.info('Redis connection closed');
    }
  } catch (error) {
    logger.error('Error closing Redis connection:', error);
    throw error;
  }
};

// Cache helper functions
export const cacheService = {
  async get(key: string): Promise<string | null> {
    try {
      return await redisClient.get(key);
    } catch (error) {
      logger.error('Redis GET error:', error);
      return null;
    }
  },

  async set(key: string, value: string, ttlSeconds?: number): Promise<boolean> {
    try {
      if (ttlSeconds) {
        await redisClient.setEx(key, ttlSeconds, value);
      } else {
        await redisClient.set(key, value);
      }
      return true;
    } catch (error) {
      logger.error('Redis SET error:', error);
      return false;
    }
  },

  async del(key: string): Promise<boolean> {
    try {
      await redisClient.del(key);
      return true;
    } catch (error) {
      logger.error('Redis DEL error:', error);
      return false;
    }
  },

  async exists(key: string): Promise<boolean> {
    try {
      const result = await redisClient.exists(key);
      return result === 1;
    } catch (error) {
      logger.error('Redis EXISTS error:', error);
      return false;
    }
  },

  async incr(key: string): Promise<number> {
    try {
      return await redisClient.incr(key);
    } catch (error) {
      logger.error('Redis INCR error:', error);
      return 0;
    }
  },

  async expire(key: string, seconds: number): Promise<boolean> {
    try {
      await redisClient.expire(key, seconds);
      return true;
    } catch (error) {
      logger.error('Redis EXPIRE error:', error);
      return false;
    }
  },

  async hget(key: string, field: string): Promise<string | null> {
    try {
      return await redisClient.hGet(key, field);
    } catch (error) {
      logger.error('Redis HGET error:', error);
      return null;
    }
  },

  async hset(key: string, field: string, value: string): Promise<boolean> {
    try {
      await redisClient.hSet(key, field, value);
      return true;
    } catch (error) {
      logger.error('Redis HSET error:', error);
      return false;
    }
  },

  async hgetall(key: string): Promise<Record<string, string> | null> {
    try {
      return await redisClient.hGetAll(key);
    } catch (error) {
      logger.error('Redis HGETALL error:', error);
      return null;
    }
  },

  async sadd(key: string, member: string): Promise<boolean> {
    try {
      await redisClient.sAdd(key, member);
      return true;
    } catch (error) {
      logger.error('Redis SADD error:', error);
      return false;
    }
  },

  async srem(key: string, member: string): Promise<boolean> {
    try {
      await redisClient.sRem(key, member);
      return true;
    } catch (error) {
      logger.error('Redis SREM error:', error);
      return false;
    }
  },

  async smembers(key: string): Promise<string[]> {
    try {
      return await redisClient.sMembers(key);
    } catch (error) {
      logger.error('Redis SMEMBERS error:', error);
      return [];
    }
  },

  async sismember(key: string, member: string): Promise<boolean> {
    try {
      return await redisClient.sIsMember(key, member);
    } catch (error) {
      logger.error('Redis SISMEMBER error:', error);
      return false;
    }
  },
};