import { Module } from '@nestjs/common';
import { QueueUsersService } from './queue-users.service';
import { QueueUsersProcessor } from './queue-users.processor';

@Module({
  providers: [QueueUsersService, QueueUsersProcessor],
  exports: [QueueUsersService, QueueUsersProcessor],
})
export class QueueUsersModule {}
