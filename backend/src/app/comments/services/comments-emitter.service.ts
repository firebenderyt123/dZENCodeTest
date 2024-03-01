import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { COMMENTS_EVENTS } from '../enums/comments-events.enum';
import { Comment } from '../models/comment.model';

@Injectable()
export class CommentsEventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitCreatedComment(data: Comment) {
    await this.eventEmitter.emitAsync(COMMENTS_EVENTS.COMMENT_CREATED, data);
  }

  async emitCommentCreationError(error: Error) {
    await this.eventEmitter.emitAsync(
      COMMENTS_EVENTS.COMMENT_CREATION_FAILED,
      error.message,
    );
  }
}
