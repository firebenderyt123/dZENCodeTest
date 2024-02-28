import { Module } from '@nestjs/common';
import { AuthTokenModule } from './auth-token.module';
import { AuthUserModule } from './auth-user.module';
import { AuthUserController } from '../controllers/auth-user.controller';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [AuthTokenModule, AuthUserModule],
  controllers: [AuthUserController],
  providers: [JwtStrategy],
  exports: [AuthTokenModule],
})
export class AuthModule {}
