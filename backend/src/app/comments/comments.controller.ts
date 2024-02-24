import { FastifyRequest } from 'fastify';
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GoogleRecaptchaGuard } from '@nestlab/google-recaptcha';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { CommentAttachmentsService } from './comment-attachments.service';
import { FileUpload } from '../files/interfaces/file-upload.interface';
import { FileFieldsInterceptor } from '@nest-lab/fastify-multer';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { ParseFilePipe } from '../files/pipes/parse-file.pipe';
import { CommentCreated } from './interfaces/comment-created.interface';
import { CommentsGateway } from '../websocket/comments/comments.gateway';
import { CommentList } from './interfaces/comment-list';

@Controller()
export class CommentsController {
  constructor(
    private readonly authService: AuthService,
    private readonly commentsService: CommentsService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
    private readonly commentsGateway: CommentsGateway,
  ) {}

  @UseGuards(JwtAuthGuard, GoogleRecaptchaGuard)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'commentData', maxCount: 1 },
      { name: 'files', maxCount: 5 },
    ]),
  )
  async create(
    @Req() req: FastifyRequest,
    @UploadedFiles()
    data: { commentData: Blob; files?: FileUpload[] },
  ): Promise<CommentCreated> {
    const { id } = this.authService.getTokenPayload(req);

    const commentData = JSON.parse(
      data.commentData[0].buffer.toString('utf-8'),
    );
    if (data.files) await new ParseFilePipe().transform(data.files);
    const commentDataDto = plainToClass(CreateCommentDto, commentData);
    try {
      await validateOrReject(commentDataDto);
    } catch (errors) {
      throw new BadRequestException({
        message: 'Invalid validation',
        errors,
      });
    }
    const comment = await this.commentsService.create(
      id,
      commentDataDto,
      data.files ? data.files : [],
    );
    this.commentsGateway.commentPublishedBroadcast(comment);
    return comment;
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

  @UseGuards(JwtAuthGuard)
  @Delete('/attachments/:fileId')
  async removeCommentAttachment(
    @Param('fileId') fileId: number,
    @Req() req: FastifyRequest,
  ): Promise<'ok'> {
    if (isNaN(fileId)) {
      throw new BadRequestException(':id must be a number');
    }

    const { id } = this.authService.getTokenPayload(req);
    await this.commentAttachmentsService.removeAttachment(id, fileId);
    return 'ok';
  }
}
