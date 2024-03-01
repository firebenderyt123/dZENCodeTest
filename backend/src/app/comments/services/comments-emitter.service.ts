import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { COMMENTS_EVENTS } from '../enums/comments-events.enum';
import { NewComment } from '../models/new-comment.model';

@Injectable()
export class CommentsEventEmitterService {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emitCreatedComment(data: NewComment) {
    await this.eventEmitter.emitAsync(COMMENTS_EVENTS.COMMENT_CREATED, data);
  }

  async emitCommentCreationError(error: Error) {
    await this.eventEmitter.emitAsync(
      COMMENTS_EVENTS.COMMENT_CREATION_FAILED,
      error.message,
    );
  }
}
