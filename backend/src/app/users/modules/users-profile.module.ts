import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersProfileService } from '../services/users-profile.service';
import { User } from '../entities/user.entity';
import { UsersSecretInfoModule } from './users-secret-info.module';
import { AuthTokenModule } from 'src/app/auth/modules/auth-token.module';

@Module({
  imports: [
    AuthTokenModule,
    UsersSecretInfoModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [UsersProfileService],
  exports: [UsersProfileService],
})
export class UsersProfileModule {}
