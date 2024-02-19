import { Comment } from '../comment.entity';

export interface CommentList {
  data: Comment[];
  total: { pages: number; comments: number };
}
