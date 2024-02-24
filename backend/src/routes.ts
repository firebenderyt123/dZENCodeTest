import { Routes } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { CommentsModule } from './app/comments/comments.module';
import { ProfileModule } from './app/profile/profile.module';

export const routes: Routes = [
  {
    path: '/api/v1',
    children: [
      { path: '/auth', module: AuthModule },
      {
        path: '/comments',
        module: CommentsModule,
      },
      { path: '/profile', module: ProfileModule },
    ],
  },
];

export const modules = [AuthModule, CommentsModule, ProfileModule];
