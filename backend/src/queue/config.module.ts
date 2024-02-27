import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { QUEUE } from './queue.enums';
import { CommentsModule } from 'src/app/comments/modules/comments.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    BullModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        redis: {
          host: configService.get('redis.host'),
          port: configService.get('redis.port'),
        },
        defaultJobOptions: {
          removeOnComplete: 1000,
          removeOnFail: 5000,
          attempts: 3,
        },
      }),
      inject: [ConfigService],
    }),
    ...Object.keys(QUEUE).map((key) =>
      BullModule.registerQueue({
        name: QUEUE[key],
      }),
    ),
    CommentsModule,
  ],
})
export class ConfigureModule {}
