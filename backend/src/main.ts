import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUE } from './rabbitmq.enum';
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
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: configService.get('rabbitmq.urls'),
      queue: RABBIT_QUEUE.AUTH,
      queueOptions: {
        durable: false,
      },
    },
  });
  // app.connectMicroservice<MicroserviceOptions>(
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: configService.get('rabbitmq.urls'),
  //       queueOptions: {
  //         durable: configService.get('rabbitmq.queueDurable'),
  //       },
  //       prefetchCount: 1,
  //     },
  //   },
  //   { inheritAppConfig: true },
  // );

  app.enableCors({ origin: configService.get('cors.origin') });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('api/v1');

  const port = configService.get('port');
  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
}
bootstrap();
