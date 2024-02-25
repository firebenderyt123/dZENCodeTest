import { Routes } from '@nestjs/core';
import { AuthModule } from './app/auth/modules/auth.module';
import { CommentsModule } from './app/comments/comments.module';
import { UsersModule } from './app/users/modules/users.module';

export const routes: Routes = [
  {
    path: '/api/v1',
    children: [
      { path: '/auth', module: AuthModule },
      {
        path: '/comments',
        module: CommentsModule,
      },
      { path: '/users', module: UsersModule },
    ],
  },
];

export const modules = [AuthModule, CommentsModule, UsersModule];
