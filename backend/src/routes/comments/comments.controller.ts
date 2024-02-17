import { FastifyReply } from 'fastify';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller()
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() commentData: CreateCommentDto,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    const comment = await this.commentsService.create(commentData);
    reply.send(comment);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @Query('orderBy')
    orderBy: 'username' | 'email' | 'created_at' = 'created_at',
    @Query('order') order: 'ASC' | 'DESC' | 'asc' | 'desc' = 'DESC',
    @Res() reply: FastifyReply,
  ): Promise<void> {
    if (isNaN(page)) {
      throw new BadRequestException('Page must be a number');
    }

    if (isNaN(limit)) {
      throw new BadRequestException('Limit must be a number');
    }

    if (!['username', 'email', 'created_at'].includes(orderBy)) {
      throw new BadRequestException('Invalid orderBy parameter');
    }

    if (!['ASC', 'DESC', 'asc', 'desc'].includes(order)) {
      throw new BadRequestException('Invalid order parameter');
    }

    const obj = {
      [orderBy]: order.toUpperCase(),
    };
    const orderObj =
      orderBy === 'username' || orderBy === 'email'
        ? {
            user: obj,
          }
        : obj;
    const comment = await this.commentsService.find(page, limit, orderObj);
    reply.send(comment);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') commentId: number,
    @Res() reply: FastifyReply,
  ): Promise<void> {
    if (isNaN(commentId)) {
      throw new BadRequestException(':id must be a number');
    }

    await this.commentsService.remove(commentId);
    reply.send('ok');
  }
}
