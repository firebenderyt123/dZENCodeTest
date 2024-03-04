import { Module } from '@nestjs/common';
import { UsersProfileController } from '../controllers/users-profile.controller';
import { AuthTokenModule } from 'src/app/auth/modules/auth-token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';
import { UsersResolver } from '../resolvers/users.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/rabbitmq.enum';

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
    AuthTokenModule,
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UsersProfileController],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
