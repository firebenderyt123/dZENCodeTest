import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';

@Module({
  imports: [
    GoogleRecaptchaModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('recaptcha'),
        response: (req) => req.headers.recaptcha,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class RecaptchaModule {}
