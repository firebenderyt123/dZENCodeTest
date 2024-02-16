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
  async createUser(
    @Body() userData: CreateUserDto,
    @Res() reply: FastifyReply,
  ) {
    const user = await this.usersService.createUser(userData);

    if (!user) return reply.code(400).send({ message: 'User already exists!' });

    reply.send(user);
  }
}
