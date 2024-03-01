import { ValidationPipe } from '@nestjs/common';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      // transform: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
      // transformOptions: {
      //   enableImplicitConversion: true,
      // },
    });
  }
}
