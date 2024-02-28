import { ValidationPipe, BadRequestException } from '@nestjs/common';

export class GlobalValidationPipe extends ValidationPipe {
  constructor() {
    super({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property: error.property,
          message: error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    });
  }
}
