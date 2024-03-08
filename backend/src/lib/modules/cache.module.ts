import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      useFactory: async (configService: ConfigService) => {
        const store = await redisStore({
          name: 'cache',
          database: 0,
          socket: {
            host: configService.get('redis.host'),
            port: +configService.get('redis.port'),
          },
          password: configService.get('redis.password'),
        });
        return {
          store: store as unknown as CacheStore,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class RedisCacheModule {}
