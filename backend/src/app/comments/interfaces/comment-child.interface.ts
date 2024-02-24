import { CommentAttachment } from './comment-attachment';
import { CommentAuthor } from './comment-author';

export interface ChildComment {
  id: number;
  text: string;
  user: CommentAuthor;
  createdAt: Date;
  replies: ChildComment[];
  attachments: CommentAttachment[];
}
