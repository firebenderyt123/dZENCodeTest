import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SecretInfo } from './user-secret-info.entity';
import { SecretInfoService } from './user-secret-info.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SecretInfo, User])],
  controllers: [UsersController],
  providers: [SecretInfoService, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
