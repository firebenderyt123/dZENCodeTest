import { Module } from '@nestjs/common';
import { UsersProfileController } from '../controllers/users-profile.controller';
import { AuthTokenModule } from 'src/app/auth/modules/auth-token.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

@Module({
  imports: [AuthTokenModule, TypeOrmModule.forFeature([User])],
  controllers: [UsersProfileController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
