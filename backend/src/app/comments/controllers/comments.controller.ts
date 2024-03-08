import { Controller, ForbiddenException, Inject } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { ClientProxy, EventPattern } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { UserIdWithData } from 'src/lib/interfaces/user-id-with-data.interface';
import { CreateCommentArgs } from '../dto/create-comment.dto';
import { UploadAttachmentsArgs } from '../interfaces/upload-attachments.interface';
import { CommentsCacheService } from '../services/comments-cache.service';
import { RedisPubSub } from 'graphql-redis-subscriptions/dist';
import { PUB_SUB } from 'src/pubsub.module';
import { CommentsListPayload } from '../interfaces/comments-list-payload.interface';
import { RABBIT_CLIENT_NAME } from 'src/lib/enums/rabbitmq.enum';

@Controller()
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
    private readonly cacheService: CommentsCacheService,
    @Inject(RABBIT_CLIENT_NAME.COMMENTS) private readonly client: ClientProxy,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @EventPattern(COMMENTS_MESSAGES.UPLOAD_ATTACHMENTS)
  async uploadAttachments(
    args: UserIdWithData<UploadAttachmentsArgs>,
  ): Promise<void> {
    const {
      userId,
      data: { commentId, files },
    } = args;

    const ownerId =
      await this.cacheService.getCommentWaitingForUploads(commentId);
    if (ownerId !== userId)
      throw new ForbiddenException(
        "Not allowed to upload attachments to stranger's comment",
      );

    try {
      const correctFiles = files.map((file) => ({
        ...file,
        buffer: Buffer.from(file.buffer.data),
      }));
      await this.commentAttachmentsService.saveAttachments(
        commentId,
        correctFiles,
      );
      await this.cacheService.delCommentWaitingForUploads(commentId);
    } catch (error) {
      throw error;
    }
  }

  @EventPattern(COMMENTS_MESSAGES.CREATE_COMMENT)
  async createComment(args: UserIdWithData<CreateCommentArgs>): Promise<void> {
    const { userId, data } = args;
    const { parentId, text } = data;
    try {
      const commentId = await this.commentsService.create(
        userId,
        parentId,
        text,
      );
      if (data.hasAttachments)
        await this.cacheService.setCommentWaitingForUploads(commentId, userId);
      await this.cacheService.delCommentsList();
    } catch (error) {
      throw error;
    }
  }

  @EventPattern(COMMENTS_MESSAGES.GET_COMMENTS)
  async getComments(args: GetCommentListArgs): Promise<void> {
    try {
      const cachedData = await this.cacheService.getCommentsList(args);
      if (cachedData) {
        return this.pubSub.publish<CommentsListPayload>(
          COMMENTS_MESSAGES.RESPONSE_COMMENT_LIST,
          { uuid: args.uuid, commentsList: cachedData },
        );
      }
      const commentsList = await this.commentsService.getComments(args);
      await this.cacheService.setCommentsList(args, commentsList);
      return this.pubSub.publish<CommentsListPayload>(
        COMMENTS_MESSAGES.RESPONSE_COMMENT_LIST,
        { uuid: args.uuid, commentsList },
      );
    } catch (error) {
      throw error;
    }
  }
}
