import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FastifyMulterModule } from '@nest-lab/fastify-multer';
import { AuthModule } from '../auth/auth.module';
import { FilesModule } from '../files/files.module';
import { CommentsModule } from '../comments/comments.module';
import { CommentAttachmentsController } from './comment-attachments.controller';
import { CommentAttachmentsService } from './comment-attachments.service';
import { CommentAttachment } from './comment-attachment.entity';

@Module({
  imports: [
    AuthModule,
    CommentsModule,
    FilesModule,
    FastifyMulterModule,
    TypeOrmModule.forFeature([CommentAttachment]),
  ],
  controllers: [CommentAttachmentsController],
  providers: [CommentAttachmentsService],
})
export class CommentAttachmentsModule {}
