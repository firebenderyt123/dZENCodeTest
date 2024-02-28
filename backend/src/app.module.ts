import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import configuration from './config/configuration';
import { routes, modules } from './routes';
import './config/configuration';
import { ConfigureModule } from './queue/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath:
        configuration().NODE_ENV !== 'production'
          ? '.env.development'
          : '.env.production',
    }),
    GoogleRecaptchaModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        secretKey: configService.get('recaptcha.secretKey'),
        response: (req) => req.headers.recaptcha,
        skipIf: configService.get('NODE_ENV') !== 'production',
        debug: configService.get('NODE_ENV') !== 'production',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        database: configService.get('database.name'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        autoLoadEntities: true,
        synchronize: false,
      }),
      inject: [ConfigService],
    }),
    ConfigureModule,
    RouterModule.register(routes),
    ...modules,
  ],
})
export class AppModule {}
