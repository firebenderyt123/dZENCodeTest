import { User } from 'src/app/users/entities/user.entity';

export interface Auth {
  accessToken: string;
  user: User;
}
