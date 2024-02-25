import { FastifyRequest } from 'fastify';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthTokenService } from 'src/app/auth/services/auth-token.service';
import { UsersProfileService } from '../services/users-profile.service';
import { JwtAuthGuard } from 'src/app/auth/guards/jwt-auth.guard';
import { User } from '../entities/user.entity';

@Controller()
export class UsersProfileController {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly usersProfileService: UsersProfileService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: FastifyRequest): Promise<User> {
    const { id } = this.authTokenService.getTokenPayload(req);
    const user = await this.usersProfileService.findOneBy({ id });
    return user;
  }
}
