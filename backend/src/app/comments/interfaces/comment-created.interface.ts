import { ChildComment } from './comment-child.interface';
import { CommentParent } from './comment-parent.interface';

export interface CommentCreated extends ChildComment {
  parent: CommentParent | null;
}
