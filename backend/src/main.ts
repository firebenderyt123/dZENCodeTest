import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { AppModule } from './app.module';
import { GlobalValidationPipe } from './pipes/global-validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  // app.useGlobalPipes(new GlobalValidationPipe());

  const configService = app.get(ConfigService);

  app.enableCors({ origin: configService.get('cors.origin') });
  app.useWebSocketAdapter(new IoAdapter(app));
  app.setGlobalPrefix('api/v1');

  const port = configService.get('port');
  await app.listen(port, '0.0.0.0');
}
bootstrap();
