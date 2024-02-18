import { Routes } from '@nestjs/core';
import { CommentsModule } from './comments/comments.module';
import { CommentAttachmentsModule } from './comment-attachments/comment-attachments.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';

export const routes: Routes = [
  {
    path: '/api/v1',
    children: [
      {
        path: '/comments',
        module: CommentsModule,
        children: [
          {
            path: '/attachments',
            module: CommentAttachmentsModule,
          },
        ],
      },
      { path: '/profile', module: ProfileModule },
      { path: '/users', module: UsersModule },
    ],
  },
];

export const modules = [
  CommentsModule,
  CommentAttachmentsModule,
  ProfileModule,
  UsersModule,
];
