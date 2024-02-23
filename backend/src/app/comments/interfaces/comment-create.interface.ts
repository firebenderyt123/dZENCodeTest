import { User } from 'src/app/users/user.entity';

export interface CommentCreated {
  parentId: number;
  id: number;
  text: string;
  user: User;
  createdAt: Date;
}
