import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';
import { FilesModule } from '../files/files.module';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { CommentAttachmentsService } from './comment-attachments.service';
import { CommentAttachment } from './comment-attachment.entity';
import { CommentsGatewayModule } from '../websocket/comments/comments.module';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    FastifyMulterModule,
    CommentsGatewayModule,
    UsersModule,
    TypeOrmModule.forFeature([Comment]),
    TypeOrmModule.forFeature([CommentAttachment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, CommentAttachmentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
