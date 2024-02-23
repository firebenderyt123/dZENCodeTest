import { Injectable } from '@nestjs/common';
import { WebSocketGateway } from '@nestjs/websockets';
import { Comment } from 'src/app/comments/comment.entity';
import { BaseGateway } from '../base.gateway';

@Injectable()
@WebSocketGateway({ namespace: 'comments' })
export class CommentsGateway extends BaseGateway {
  commentPublishedBroadcast(comment: Comment) {
    this.server.emit('commentPublished', comment);
  }
}
