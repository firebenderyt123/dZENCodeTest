import { AuthModule } from './auth/modules/auth.module';
import { AuthResolver } from './auth/resolvers/auth.resolver';
import { CommentsModule } from './comments/modules/comments.module';
import { CommentsResolver } from './comments/resolvers/comments.resolver';
import { UsersModule } from './users/modules/users.module';
import { UsersResolver } from './users/resolvers/users.resolver';

export const modules = [AuthModule, CommentsModule, UsersModule];
export const resolvers = [AuthResolver, CommentsResolver, UsersResolver];
