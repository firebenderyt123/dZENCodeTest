import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersResolver } from '../resolvers/users.resolver';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/lib/enums/rabbitmq.enum';
import { RMQModule } from 'src/lib/modules/rabbitmq.module';

@Module({
  imports: [
    RMQModule.register({
      name: RABBIT_CLIENT_NAME.USER,
      queue: RABBIT_QUEUE.USER,
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
