import { Routes } from '@nestjs/core';
import { CommentsModule } from './app/comments/comments.module';
import { CommentAttachmentsModule } from './app/comment-attachments/comment-attachments.module';
import { UsersModule } from './app/users/users.module';

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
      { path: '/users', module: UsersModule },
    ],
  },
];

export const modules = [CommentsModule, CommentAttachmentsModule, UsersModule];
