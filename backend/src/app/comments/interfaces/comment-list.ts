import { ChildComment } from './comment-child.interface';

export interface CommentList {
  comments: ChildComment[];
  total: { pages: number; comments: number };
}
