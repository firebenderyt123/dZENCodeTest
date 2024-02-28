import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersSecretInfoService } from '../services/users-secret-info.service';
import { SecretInfo } from '../entities/user-secret-info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecretInfo])],
  providers: [UsersSecretInfoService],
  exports: [UsersSecretInfoService],
})
export class UsersSecretInfoModule {}
