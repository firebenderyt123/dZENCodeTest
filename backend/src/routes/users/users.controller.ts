import { FastifyReply } from 'fastify';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() userData: CreateUserDto,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    const user = await this.usersService.create(userData);
    reply.send(user);
  }
}
