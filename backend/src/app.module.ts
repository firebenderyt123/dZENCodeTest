import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';
import { routes, modules } from './routes';
import { ConfigureModule } from './queue/config.module';

@Module({
  imports: [ConfigureModule, RouterModule.register(routes), ...modules],
})
export class AppModule {}
