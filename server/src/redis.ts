import Redis, { RedisOptions } from 'ioredis';

export default async function getRedisInstance() {
  let redisConnection: Redis;

  function setRedisConnection() {
    if (!redisConnection) {
      try {
        const config = {
          port: process.env.REDIS_PORT,
          host: process.env.REDIS_HOST,
          password: process.env.REDIS_PASSWORD,
          db: process.env.REDIS_DATABASE
        };

        const options: RedisOptions = {
          host: config.host,
          lazyConnect: true,
          showFriendlyErrorStack: true,
          enableAutoPipelining: true,
          maxRetriesPerRequest: 0,
          retryStrategy: (times: number) => {
            if (times > 5) {
              throw new Error(
                '[Redis] Could not connect after ${times} attempts'
              );
            }

            return Math.min(times * 1000, 5000);
          }
        };

        if (config.db) {
          options.db = Number(config.db);
        }

        if (config.port) {
          options.port = +config.port;
        }

        if (config.password) {
          options.password = config.password;
        }

        redisConnection = new Redis(options);

        redisConnection.on('error', (error: unknown) => {
          console.warn('[Redis] Error connecting', error);
        });
      } catch (e) {
        throw new Error('[Redis] Could not create a Redis instance');
      }
    }

    return redisConnection;
  }

  async function setRedisValue(key: string, value: string, time: number) {
    const EXPIRY_MS = 'EX';
    return redisConnection.set(key, value, EXPIRY_MS, time * 60);
  }

  async function getRedisValue(key: string) {
    return await redisConnection.get(key);
  }

  return {
    connection: setRedisConnection(),
    getRedisValue,
    setRedisValue
  };
}
