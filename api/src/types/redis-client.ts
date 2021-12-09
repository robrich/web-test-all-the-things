
import { RedisClientType } from '@node-redis/client/dist/lib/client';
import { RedisScripts, RedisModules } from '@node-redis/client/dist/lib/commands';

export type RedisClient = RedisClientType<RedisModules, RedisScripts>;
