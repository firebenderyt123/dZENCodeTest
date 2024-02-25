import { Module } from '@nestjs/common';
import { UsersProfileController } from '../controllers/users-profile.controller';
import { UsersSecretInfoModule } from './users-secret-info.module';
import { UsersProfileModule } from './users-profile.module';
import { AuthTokenModule } from 'src/app/auth/modules/auth-token.module';

@Module({
  imports: [AuthTokenModule, UsersProfileModule, UsersSecretInfoModule],
  controllers: [UsersProfileController],
})
export class UsersModule {}
