import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersResolver } from '../resolvers/users.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/lib/enums/rabbitmq.enum';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: RABBIT_CLIENT_NAME.USER,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: RABBIT_QUEUE.USER,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
