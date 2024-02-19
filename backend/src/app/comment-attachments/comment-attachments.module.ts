import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from '../files/files.module';
import { CommentAttachmentsController } from './comment-attachments.controller';
import { CommentAttachmentsService } from './comment-attachments.service';
import { CommentAttachment } from './comment-attachment.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    AuthModule,
    FilesModule,
    TypeOrmModule.forFeature([CommentAttachment]),
  ],
  controllers: [CommentAttachmentsController],
  providers: [CommentAttachmentsService],
})
export class CommentAttachmentsModule {}
