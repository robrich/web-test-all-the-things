import { createClient } from 'redis';
import { RedisClientType } from '@node-redis/client/dist/lib/client';
import dotenv from 'dotenv';
import { RedisClient } from './types/redis-client';

export default async (): Promise<RedisClient> => {
  dotenv.config();

  // after import dotenv
  const { DBHOST, DBPORT } = process.env;

  const redisClient = createClient({
    url: `redis://${DBHOST}:${DBPORT}`
  }) as unknown as RedisClient;
  redisClient.on('error', (err: Error) => console.log('Redis Client Error', err));
  await redisClient.connect();

  return redisClient;
}
