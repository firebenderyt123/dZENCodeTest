import { Module } from '@nestjs/common';
import { AuthTokenModule } from './auth-token.module';
import { AuthUserModule } from './auth-user.module';

@Module({
  imports: [AuthTokenModule, AuthUserModule],
  exports: [AuthTokenModule, AuthUserModule],
})
export class AuthModule {}
