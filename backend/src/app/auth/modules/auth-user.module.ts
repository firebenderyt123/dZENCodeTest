import { Module } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user.service';
import { UsersProfileModule } from '../../users/modules/users-profile.module';
import { AuthTokenModule } from './auth-token.module';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthResolver } from '../resolvers/auth.resolver';
import { AuthEventEmitterService } from '../services/auth-emitter.service';
import { AuthEventListenerService } from '../services/auth-listener.service';
import { AuthQueueService } from '../services/auth-queue.service';
import { BullModule } from '@nestjs/bull';
import { NAMESPACE } from 'src/queue/queue.enums';
import { AuthQueueProcessor } from '../proccessors/auth-queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: NAMESPACE.AUTH,
    }),
    AuthTokenModule,
    UsersProfileModule,
  ],
  providers: [
    AuthUserService,
    LocalStrategy,
    AuthResolver,
    AuthEventEmitterService,
    AuthEventListenerService,
    AuthQueueService,
    AuthQueueProcessor,
  ],
  exports: [AuthEventEmitterService, AuthResolver],
})
export class AuthUserModule {}
