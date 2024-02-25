import { Module } from '@nestjs/common';
import { AuthUserService } from '../services/auth-user.service';
import { UsersProfileModule } from '../../users/modules/users-profile.module';
import { AuthTokenModule } from './auth-token.module';
import { LocalStrategy } from '../strategies/local.strategy';

@Module({
  imports: [AuthTokenModule, UsersProfileModule],
  providers: [AuthUserService, LocalStrategy],
  exports: [AuthUserService],
})
export class AuthUserModule {}
