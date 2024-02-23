import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { CommentCreated } from 'src/app/comments/interfaces/comment-create.interface';
import { BaseGateway } from '../base.gateway';

@Injectable()
@WebSocketGateway({ namespace: 'comments' })
export class CommentsGateway extends BaseGateway {
  commentPublishedBroadcast(comment: CommentCreated) {
    this.server.emit('commentPublished', comment);
  }
}
