import { FastifyRequest } from 'fastify';
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthTokenService } from '../../auth/services/auth-token.service';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { CommentList } from '../interfaces/comment-list';
import { GetCommentsListDto } from '../dto/get-comments-list.dto';

@Controller()
export class CommentsController {
  constructor(
    private readonly authTokenService: AuthTokenService,
    private readonly commentsService: CommentsService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getList(
    @Query() getcommentsListParams: GetCommentsListDto,
  ): Promise<CommentList> {
    const { page, limit, order, orderBy } = getcommentsListParams;

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

    const { id } = this.authTokenService.getTokenPayload(req);

    await this.commentsService.remove(commentId, id);
    return 'ok';
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/attachments/:fileId')
  async removeCommentAttachment(
    @Param('fileId') fileId: number,
    @Req() req: FastifyRequest,
  ): Promise<'ok'> {
    if (isNaN(fileId)) {
      throw new BadRequestException(':id must be a number');
    }

    const { id } = this.authTokenService.getTokenPayload(req);
    await this.commentAttachmentsService.removeAttachment(id, fileId);
    return 'ok';
  }
}
