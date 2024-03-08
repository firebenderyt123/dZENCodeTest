import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/lib/config/configuration';
import { getEnvFile } from 'src/lib/utils/environment.utils';
import { RedisCacheModule } from './lib/modules/cache.module';
import { RecaptchaModule } from './lib/modules/recaptcha.module';
import { GraphQlModule } from './lib/modules/graphql.module';
import { TypeORMModule } from './lib/modules/typeorm.module';
import { PubSubModule } from './pubsub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      envFilePath: getEnvFile(),
    }),
    RedisCacheModule,
    RecaptchaModule,
    GraphQlModule,
    TypeORMModule,
    PubSubModule,
  ],
})
export class ConfigureModule {}
