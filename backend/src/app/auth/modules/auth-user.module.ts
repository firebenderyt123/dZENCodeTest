import { Module } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user.service';
import { AuthTokenModule } from './auth-token.module';
import { AuthResolver } from '../resolvers/auth.resolver';
import { AuthUserController } from '../controllers/auth-user.controller';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/rabbitmq.enum';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UsersModule } from 'src/app/users/modules/users.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MATH_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: 'localhost',
          port: 6379,
        },
      },
    ]),
    ClientsModule.register([
      {
        name: RABBIT_CLIENT_NAME.AUTH,
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: RABBIT_QUEUE.AUTH,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    AuthTokenModule,
    UsersModule,
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, AuthResolver],
  exports: [AuthUserService, AuthResolver],
})
export class AuthUserModule {}
