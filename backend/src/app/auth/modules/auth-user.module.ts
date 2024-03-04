import { Module } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user.service';
import { AuthTokenModule } from './auth-token.module';
import { AuthResolver } from '../resolvers/auth.resolver';
import { AuthUserController } from '../controllers/auth-user.controller';
import { UsersModule } from 'src/app/users/modules/users.module';
import { RMQModule } from 'src/lib/modules/rabbitmq.module';
import { RABBIT_CLIENT_NAME, RABBIT_QUEUE } from 'src/lib/enums/rabbitmq.enum';

@Module({
  imports: [
    RMQModule.register({
      name: RABBIT_CLIENT_NAME.AUTH,
      queue: RABBIT_QUEUE.AUTH,
    }),
    AuthTokenModule,
    UsersModule,
  ],
  controllers: [AuthUserController],
  providers: [AuthUserService, AuthResolver],
  exports: [AuthUserService, AuthResolver],
})
export class AuthUserModule {}
