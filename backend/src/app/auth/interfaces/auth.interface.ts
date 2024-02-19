import { User } from '../../users/user.entity';

export interface Auth {
  accessToken: string;
  user: User;
}
