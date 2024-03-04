import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthTokenService } from 'src/app/auth/services/auth-token.service';
import { UsersService } from '../services/users.service';
import { User } from '../models/user.model';
import { PatchUserDto } from '../dto/patch-user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { USERS_MESSAGES } from '../enums/users-messages.enum';
import { UnauthorizedError } from 'src/lib/models/app-error.model';

@Controller()
export class UsersProfileController {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly usersService: UsersService,
  ) {}

  @MessagePattern({ cmd: USERS_MESSAGES.GET_PROFILE })
  async getUser(userId: number): Promise<User> {
    try {
      const user = await this.usersService.findOneById(userId);
      if (!user) throw new UnauthorizedError();
      return user;
    } catch (error) {
      return error;
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // async getProfile(@Req() req: FastifyRequest): Promise<User> {
  //   const { id } = this.authTokenService.getTokenPayload(req);
  //   const user = await this.usersService.findOneById(id);
  //   return user;
  // }

  // @UseGuards(JwtAuthGuard)
  // @Patch()
  // async patchProfile(
  //   @Req() req: FastifyRequest,
  //   @Body() data: PatchUserDto,
  // ): Promise<any> {
  //   const { id } = this.authTokenService.getTokenPayload(req);
  //   const user = await this.usersService.patchUser(id, data);
  //   return user;
  // }
}
