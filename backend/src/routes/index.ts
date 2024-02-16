import { Routes } from '@nestjs/core';
import { CommentsModule } from './comments/comments.module';
import { CommentAttachmentsModule } from './comments/attachments/comment-attachments.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';

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
      { path: '/files', module: FilesModule },
      { path: '/users', module: UsersModule },
    ],
  },
];

export const modules = [
  CommentsModule,
  CommentAttachmentsModule,
  FilesModule,
  UsersModule,
];
