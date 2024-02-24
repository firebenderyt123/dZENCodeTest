import { BaseGateway } from '../base.gateway';
import { Injectable } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { CommentsService } from 'src/app/comments/comments.service';
import { CommentBroadcast } from './comment-broadcast.interface';

@Injectable()
@WebSocketGateway({ namespace: 'comments' })
export class CommentsGateway extends BaseGateway {
  constructor(private readonly commentsService: CommentsService) {
    super();
  }

  @SubscribeMessage('comment:publish')
  async onPublishComment(_: Socket, commentId: number) {
    const comment =
      await this.commentsService.getCommentWithSpecialParamsById(commentId);
    if (!comment) return;

    this.commentPublishedBroadcast(comment);
  }

  private commentPublishedBroadcast(comment: CommentBroadcast) {
    this.server.emit('comment:published', comment);
  }
}
