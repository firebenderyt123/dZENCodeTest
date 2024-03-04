import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUE } from './lib/enums/rabbitmq.enum';
// import '../redis/src/main';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  const configService = app.get(ConfigService);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: 'localhost',
      port: 6379,
    },
  });
  Object.keys(RABBIT_QUEUE).forEach((key) => {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.RMQ,
      options: {
        urls: configService.get('rabbitmq.urls'),
        queue: RABBIT_QUEUE[key],
        queueOptions: {
          durable: configService.get('rabbitmq.queueDurable'),
        },
      },
    });
  });

  app.enableCors({ origin: configService.get('cors.origin') });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('api/v1');

  const port = configService.get('port');
  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
}
bootstrap();
