import { User } from 'src/app/users/user.entity';
import { CommentParent } from './comment-parent.interface';

export interface CommentCreated {
  parent: CommentParent | null;
  id: number;
  text: string;
  user: User;
  createdAt: Date;
}
