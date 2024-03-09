import { Cache } from '@nestjs/cache-manager';
import { RedisStore } from 'cache-manager-redis-store';

type RedisCacheServiceType = Cache & RedisStore;
export interface RedisCacheService extends RedisCacheServiceType {}
