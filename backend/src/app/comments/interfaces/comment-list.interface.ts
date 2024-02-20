import { Comment } from '../comment.entity';

export interface CommentList {
  comments: Comment[];
  total: { pages: number; comments: number };
}
