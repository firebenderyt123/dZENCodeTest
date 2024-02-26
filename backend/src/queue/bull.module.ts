import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { QUEUE } from './queue.enums';
import { modules } from './modules';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
      }),
      inject: [ConfigService],
    }),
    ...Object.keys(QUEUE).map((key) =>
      BullModule.registerQueue({
        name: QUEUE[key],
      }),
    ),
    ...modules,
  ],
})
export class QueueModule {}
