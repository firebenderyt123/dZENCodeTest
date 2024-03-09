import { Module, DynamicModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from '../enums/rabbitmq.enum';

interface RMQModuleOptions {
  name: RABBIT_CLIENT_NAME;
  queue: RABBIT_QUEUE;
  prefetchCount?: number;
}

@Module({})
export class RMQModule {
  static register({
    name,
    queue,
    prefetchCount = 0,
  }: RMQModuleOptions): DynamicModule {
    return {
      module: RMQModule,
      imports: [
        ClientsModule.registerAsync({
          clients: [
            {
              name,
              useFactory: (configService: ConfigService) => ({
                transport: Transport.RMQ,
                options: {
                  urls: configService.get('rabbitmq.urls'),
                  queue,
                  queueOptions: {
                    durable: configService.get('rabbitmq.queueDurable'),
                  },
                  prefetchCount: prefetchCount || 0,
                  maxConnectionAttempts: 3,
                },
              }),
              inject: [ConfigService],
            },
          ],
        }),
      ],
      exports: [ClientsModule],
    };
  }
}
