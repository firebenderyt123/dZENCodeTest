import { Controller, Inject } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentAttachmentsService } from '../services/comment-attachments.service';
import { GetCommentListArgs } from '../dto/get-comment-list.dto';
import { EventPattern } from '@nestjs/microservices';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { UserIdWithData } from 'src/lib/interfaces/user-id-with-data.interface';
import { CommentsCacheService } from '../services/comments-cache.service';
import { RedisPubSub } from 'graphql-redis-subscriptions/dist';
import { PUB_SUB } from 'src/lib/modules/pubsub.module';
import { CommentsListPayload } from '../interfaces/comments-list-payload.interface';
import { CreateCommentParams } from '../interfaces/create-comment-params.interface';
import { filesUploadToFilesInput } from 'src/lib/utils/files.utils';

@Controller()
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
    private readonly cacheService: CommentsCacheService,
    @Inject(PUB_SUB) private pubSub: RedisPubSub,
  ) {}

  @EventPattern(COMMENTS_MESSAGES.CREATE_COMMENT)
  async createComment(
    args: UserIdWithData<CreateCommentParams>,
  ): Promise<void> {
    const { userId, data } = args;
    const { parentId, text } = data;
    const files = filesUploadToFilesInput(data.files);
    try {
      const commentId = await this.commentsService.create(
        userId,
        parentId,
        text,
      );
      if (!!files.length) {
        await this.commentAttachmentsService.saveAttachments(commentId, files);
      }
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
