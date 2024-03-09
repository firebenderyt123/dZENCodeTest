import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RABBIT_QUEUE } from './lib/enums/rabbitmq.enum';
import MercuriusGQLUpload from 'mercurius-upload';
import { MAX_ALLOWED_UPLOAD, MAX_FILES_NUMBER } from './lib/utils/files.utils';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );

  const configService = app.get(ConfigService);
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
  app.register(MercuriusGQLUpload, {
    maxFiles: MAX_FILES_NUMBER,
    maxFieldSize: MAX_ALLOWED_UPLOAD,
  });

  app.enableCors({
    origin: configService.get('cors.origin'),
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  const port = configService.get('port');
  await app.startAllMicroservices();
  await app.listen(port, '0.0.0.0');
}
bootstrap();
