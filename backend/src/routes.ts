import { Routes } from '@nestjs/core';
import { AuthModule } from './app/auth/auth.module';
import { CommentsModule } from './app/comments/comments.module';
import { CommentAttachmentsModule } from './app/comment-attachments/comment-attachments.module';

export const routes: Routes = [
  {
    path: '/api/v1',
    children: [
      { path: '/auth', module: AuthModule },
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
    ],
  },
];

export const modules = [AuthModule, CommentsModule, CommentAttachmentsModule];
