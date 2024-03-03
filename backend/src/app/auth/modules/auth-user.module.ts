import { Module } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user.service';
import { AuthTokenModule } from './auth-token.module';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthResolver } from '../resolvers/auth.resolver';
import { AuthUserController } from '../controllers/auth-user.controller';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/rabbitmq.enum';
import { ClientsModule, Transport } from '@nestjs/microservices';

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
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, LocalStrategy, AuthResolver],
  exports: [AuthUserService, AuthResolver],
})
export class AuthUserModule {}
