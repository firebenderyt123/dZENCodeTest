import { Module } from '@nestjs/common';
import { ConfigureModule } from './config.module';
import { modules } from './modules';

@Module({
  imports: [ConfigureModule, ...modules],
})
export class AppModule {}
