import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import configuration from './config/configuration';
import { websocketModules } from './websocket';
import { routes, modules } from './routes';
import './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: ['.env.development'],
    }),
    GoogleRecaptchaModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        secretKey: configService.get('recaptcha.secretKey'),
        response: (req) => req.headers.recaptcha,
        // skipIf: process.env.NODE_ENV !== 'production',
        debug: configService.get('recaptcha.debug'),
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
    RouterModule.register(routes),
    ...modules,
    ...websocketModules,
  ],
})
export class AppModule {}
