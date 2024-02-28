import { Module } from '@nestjs/common';
import { AuthTokenModule } from './auth-token.module';
import { AuthUserModule } from './auth-user.module';
import { AuthUserController } from '../controllers/auth-user.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { AuthEventEmitterService } from 'src/app/auth/services/auth-emitter.service';
import { AuthEventListenerService } from 'src/app/auth/services/auth-listener.service';
import { AuthGateway } from 'src/app/auth/gateways/auth.gateway';

@Module({
  imports: [AuthTokenModule, AuthUserModule],
  controllers: [AuthUserController],
  providers: [
    JwtStrategy,
    AuthEventEmitterService,
    AuthEventListenerService,
    AuthGateway,
  ],
  exports: [AuthTokenModule, AuthEventEmitterService],
})
export class AuthModule {}
