import { Module } from '@nestjs/common';
import { modules } from './routes';
import { ConfigureModule } from './config.module';

@Module({
  imports: [ConfigureModule, ...modules],
})
export class AppModule {}
