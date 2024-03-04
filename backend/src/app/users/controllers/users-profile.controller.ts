import { FastifyRequest } from 'fastify';
import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthTokenService } from 'src/app/auth/services/auth-token.service';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { User } from '../models/user.model';
import { PatchUserDto } from '../dto/patch-user.dto';

@Controller()
export class UsersProfileController {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getProfile(@Req() req: FastifyRequest): Promise<User> {
    const { id } = this.authTokenService.getTokenPayload(req);
    const user = await this.usersService.findOneById(id);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async patchProfile(
    @Req() req: FastifyRequest,
    @Body() data: PatchUserDto,
  ): Promise<any> {
    const { id } = this.authTokenService.getTokenPayload(req);
    const user = await this.usersService.patchUser(id, data);
    return user;
  }
}
