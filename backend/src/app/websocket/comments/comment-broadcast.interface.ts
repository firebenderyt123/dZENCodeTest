import { User } from 'src/app/users/user.entity';
import { CommentAttachment } from './comment-attachment.interface';
import { CommentParent } from 'src/app/comments/interfaces/comment-parent.interface';

export interface CommentBroadcast {
  parent: CommentParent;
  id: number;
  text: string;
  user: User;
  createdAt: Date;
  replies: CommentBroadcast[];
  attachments: CommentAttachment[];
}
