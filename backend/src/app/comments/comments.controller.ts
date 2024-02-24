import { FastifyRequest } from 'fastify';
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
  Req,
  UseGuards,
} from '@nestjs/common';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { CommentsService } from './comments.service';
import { CommentCreated } from './interfaces/comment-create.interface';
import { CommentList } from './interfaces/comment-list.interface';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class CommentsController {
  constructor(
    private readonly authService: AuthService,
    private readonly commentsService: CommentsService,
  ) {}

  @UseGuards(JwtAuthGuard, GoogleRecaptchaGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() commentData: CreateCommentDto,
    @Req() req: FastifyRequest,
  ): Promise<CommentCreated> {
    const { id } = this.authService.getTokenPayload(req);
    return await this.commentsService.create(id, commentData);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query('page') page = 1,
    @Query('limit') limit = 25,
    @Query('orderBy')
    orderBy: 'username' | 'email' | 'createdAt' = 'createdAt',
    @Query('order') order: 'ASC' | 'DESC' | 'asc' | 'desc' = 'DESC',
  ): Promise<CommentList> {
    if (isNaN(page)) {
      throw new BadRequestException('Page must be a number');
    }

    if (isNaN(limit)) {
      throw new BadRequestException('Limit must be a number');
    }

    if (!['username', 'email', 'createdAt'].includes(orderBy)) {
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
    return await this.commentsService.find(page, limit, orderObj);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async remove(
    @Param('id') commentId: number,
    @Req() req: FastifyRequest,
  ): Promise<'ok'> {
    if (isNaN(commentId)) {
      throw new BadRequestException(':id must be a number');
    }

    const { id } = this.authService.getTokenPayload(req);

    await this.commentsService.remove(commentId, id);
    return 'ok';
  }
}
