import { Module } from '@nestjs/common';
import { ConfigureModule } from './config.module';
import { modules } from './app/modules';

@Module({
  imports: [ConfigureModule, ...modules],
})
export class AppModule {}
