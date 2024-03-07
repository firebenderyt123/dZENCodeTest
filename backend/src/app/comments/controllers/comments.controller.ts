import { Controller, ForbiddenException, HttpException } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { CommentList } from '../models/comment-list.model';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { MessagePattern } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { UserIdWithData } from 'src/lib/interfaces/user-id-with-data.interface';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { UploadAttachmentsArgs } from '../dto/upload-attachments.dto';
import { CommentsCacheService } from '../services/comments-cache.service';

@Controller()
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
    private readonly cacheService: CommentsCacheService,
  ) {}

  @MessagePattern({ cmd: COMMENTS_MESSAGES.UPLOAD_ATTACHMENTS })
  async uploadAttachments(
    args: UserIdWithData<UploadAttachmentsArgs>,
  ): Promise<boolean | HttpException> {
    const {
      userId,
      data: { commentId, files },
    } = args;

    const ownerId =
      await this.cacheService.getCommentWaitingForUploads(commentId);
    if (ownerId !== userId)
      return new ForbiddenException(
        "Not allowed to upload attachments to stranger's comment",
      );

    try {
      const correctFiles = files.map((file) => ({
        ...file,
        buffer: Buffer.from(file.buffer.data),
      }));
      const result = await this.commentAttachmentsService.saveAttachments(
        commentId,
        correctFiles,
      );
      await this.cacheService.delCommentWaitingForUploads(commentId);
      return !!result;
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
      await this.cacheService.setCommentWaitingForUploads(commentId, userId);
      await this.cacheService.delCommentsList();
      return commentId;
    } catch (error) {
      throw error;
    }
  }

  @MessagePattern({ cmd: COMMENTS_MESSAGES.GET_COMMENTS })
  async getComments(args: GetCommentListArgs): Promise<CommentList> {
    try {
      const cachedData = await this.cacheService.getCommentsList(args);
      if (cachedData) return cachedData;

      const newData = await this.commentsService.getComments(args);
      await this.cacheService.setCommentsList(args, newData);
      return newData;
    } catch (error) {
      throw error;
    }
  }
}
