// import { Injectable } from '@nestjs/common';
// import { OnEvent } from '@nestjs/event-emitter';
// import { COMMENTS_EVENTS } from '../enums/comments-events.enum';
// import { CommentsGateway } from '../gateways/comments.gateway';
// import { CommentsCacheService } from './comments-cache.service';
// import { NewComment } from '../models/new-comment.model';

// @Injectable()
// export class CommentsEventListenerService {
//   constructor(
//     private readonly commentsGateway: CommentsGateway,
//     private readonly cacheService: CommentsCacheService,
//   ) {}

//   @OnEvent(COMMENTS_EVENTS.COMMENT_CREATED)
//   onCommentCreated(comment: NewComment) {
//     this.cacheService.delCommentsList();
//     this.commentsGateway.commentCreationSuccess(comment);
//   }

//   @OnEvent(COMMENTS_EVENTS.COMMENT_CREATION_FAILED)
//   async emitCommentCreationError(message: string) {
//     this.commentsGateway.commentCreationFailed(message);
//   }
// }
