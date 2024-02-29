import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { COMMENTS_EVENTS } from '../enums/comments-events.enum';
import { CommentCreated } from 'src/app/comments/interfaces/comment-created.interface';
import { CommentsGateway } from '../gateways/comments.gateway';

@Injectable()
export class CommentsEventListenerService {
  constructor(private readonly commentsGateway: CommentsGateway) {}

  @OnEvent(COMMENTS_EVENTS.COMMENT_CREATED)
  onCommentCreated(comment: CommentCreated) {
    this.commentsGateway.commentCreationSuccess(comment);
  }

  @OnEvent(COMMENTS_EVENTS.COMMENT_CREATION_FAILED)
  async emitCommentCreationError(message: string) {
    this.commentsGateway.commentCreationFailed(message);
  }
}
