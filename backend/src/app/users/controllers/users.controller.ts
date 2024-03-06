import { Controller } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { MessagePattern } from '@nestjs/microservices';
import { USERS_MESSAGES } from '../enums/users-messages.enum';
import { UserIdWithData } from 'src/lib/interfaces/user-id-with-data.interface';
import { PatchUserDto } from '../dto/patch-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern({ cmd: USERS_MESSAGES.GET_PROFILE })
  async getUser(userId: number): Promise<User> {
    try {
      return await this.usersService.findOneById(userId);
    } catch (error) {
      return error;
    }
  }

  @MessagePattern({ cmd: USERS_MESSAGES.PATCH_PROFILE })
  async patchUser(args: UserIdWithData<PatchUserDto>): Promise<User> {
    const { userId, data } = args;
    try {
      return await this.usersService.patchUser(userId, data);
    } catch (error) {
      return error;
    }
  }
}
