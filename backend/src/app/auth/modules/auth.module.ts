import { Module } from '@nestjs/common';
import { AuthTokenModule } from './auth-token.module';
import { AuthUserModule } from './auth-user.module';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [AuthTokenModule, AuthUserModule],
  providers: [JwtStrategy],
  exports: [AuthTokenModule, AuthUserModule],
})
export class AuthModule {}
