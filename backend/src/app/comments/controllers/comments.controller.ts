import {
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { CommentList } from '../models/comment-list.model';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { ClientProxy, MessagePattern } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { FilesInterceptor } from '@nest-lab/fastify-multer';
import { ParseFilePipe } from 'src/lib/pipes/parse-file.pipe';
import { FileUpload } from 'src/app/files/interfaces/file-input.interface';
import { UserIdWithData } from 'src/lib/interfaces/user-id-with-data.interface';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { RABBIT_CLIENT_NAME } from 'src/lib/enums/rabbitmq.enum';
import { RestApiAuthGuard } from 'src/lib/guards/jwt-rest-api.guard';
import { UploadAttachmentsArgs } from '../dto/upload-attachments.dto';
import { Jwt, JwtPayload } from 'src/lib/decorators/jwt-rest-api.decorator';
import { firstValueFrom } from 'rxjs';
import { CommentAttachment } from '../models/comment-attachment.model';

@Controller()
export class CommentsController {
  constructor(
    @Inject(RABBIT_CLIENT_NAME.COMMENTS) private readonly client: ClientProxy,
    private readonly commentsService: CommentsService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
  ) {}

  @Post('attachments/:id')
  @UseGuards(RestApiAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.OK)
  async uploadFiles(
    @Param('id') commentId: number,
    @Jwt() jwtPayload: JwtPayload,
    @UploadedFiles(new ParseFilePipe()) files: FileUpload[],
  ): Promise<boolean> {
    const attachments = this.client.send<boolean>(
      { cmd: COMMENTS_MESSAGES.UPLOAD_ATTACHMENTS },
      { userId: jwtPayload, data: { commentId, files } },
    );
    return await firstValueFrom(attachments);
  }

  @MessagePattern({ cmd: COMMENTS_MESSAGES.UPLOAD_ATTACHMENTS })
  async uploadAttachments(
    args: UserIdWithData<UploadAttachmentsArgs>,
  ): Promise<boolean> {
    const {
      userId,
      data: { commentId, files },
    } = args;
    // get from redis by comment id, user that must upload attachments
    try {
      const correctFiles = files.map((file) => ({
        ...file,
        buffer: Buffer.from(file.buffer.data),
      }));
      const result = await this.commentAttachmentsService.saveAttachments(
        commentId,
        correctFiles,
      );
      return !!result;
      // remove from redis comment id and user id
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: COMMENTS_MESSAGES.CREATE_COMMENT })
  async createComment(
    args: UserIdWithData<CreateCommentArgs>,
  ): Promise<number> {
    const { userId, data } = args;
    try {
      const commentId = await this.commentsService.create(userId, data);
      // save commentId and user id to redis to quickly validate who must upload files
      return commentId;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: COMMENTS_MESSAGES.GET_COMMENTS })
  async getComments(args: GetCommentListArgs): Promise<CommentList> {
    try {
      return await this.commentsService.getComments(args);
    } catch (error) {
      throw error;
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Delete('/:id')
  // @HttpCode(HttpStatus.OK)
  // async remove(
  //   @Param('id') commentId: number,
  //   @Req() req: FastifyRequest,
  // ): Promise<'ok'> {
  //   if (isNaN(commentId)) {
  //     throw new BadRequestException(':id must be a number');
  //   }

  //   const { id } = this.authTokenService.isAuthenticated(req.headers);

  //   await this.commentsService.remove(commentId, id);
  //   return 'ok';
  // }
}
