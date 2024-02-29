import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-redis-store';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QUEUE } from './queue.enums';
import { CommentsModule } from 'src/app/comments/modules/comments.module';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        return {
          store: redisStore,
          ...configService.get('redis'),
        };
      },
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: configService.get('redis'),
        defaultJobOptions: {
          removeOnComplete: 1000,
          removeOnFail: 5000,
          attempts: 3,
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueueAsync(
      ...Object.keys(QUEUE).map((key) => ({
        name: QUEUE[key],
      })),
    ),
    CommentsModule,
  ],
})
export class ConfigureModule {}
