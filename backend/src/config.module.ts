import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
// import { BullModule } from '@nestjs/bull';
import { CacheModule, CacheStore } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-store';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoogleRecaptchaModule } from '@nestlab/google-recaptcha';
import configuration from 'src/lib/config/configuration';
import { getEnvFile } from 'src/lib/utils/environment.utils';
import { GraphQLModule } from '@nestjs/graphql';
import { MercuriusDriver, MercuriusDriverConfig } from '@nestjs/mercurius';
import { modules } from 'src/routes';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: getEnvFile(),
    }),
    // CacheModule.registerAsync<RedisClientOptions>({
    //   isGlobal: true,
    //   useFactory: async (configService: ConfigService) => {
    //     const store = await redisStore({
    //       name: 'cache',
    //       database: 1,
    //       socket: {
    //         host: configService.get('redis.host'),
    //         port: +configService.get('redis.port'),
    //       },
    //       password: configService.get('redis.password'),
    //       ttl: configService.get('cache.ttl'),
    //     });
    //     return {
    //       store: store as unknown as CacheStore,
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
    EventEmitterModule.forRoot(),
    GoogleRecaptchaModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        ...configService.get('recaptcha'),
        response: (req) => req.headers.recaptcha,
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<MercuriusDriverConfig>({
      driver: MercuriusDriver,
      include: modules,
      useGlobalPrefix: true,
      autoSchemaFile: 'src/schema.gql',
      subscription: true,
    }),
    // BullModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     redis: configService.get('redis'),
    //     defaultJobOptions: {
    //       removeOnComplete: 1000,
    //       removeOnFail: 4000,
    //       attempts: 3,
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
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
        ssl: configService.get('database.ssl'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ConfigureModule {}
