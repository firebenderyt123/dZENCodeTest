import { FastifyReply } from 'fastify';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async signUp(
    @Body() userData: SignUpDto,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    const user = await this.authService.signUp(userData);
    reply.send(user);
  }
}
