import { FastifyRequest } from 'fastify';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller()
export class ProfileController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProfile(@Req() req: FastifyRequest): Promise<User> {
    const { id } = this.authService.getTokenPayload(req);
    const user = await this.usersService.findOneBy({ id });
    return user;
  }
}
