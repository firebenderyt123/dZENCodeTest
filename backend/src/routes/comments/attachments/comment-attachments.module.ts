import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentAttachmentsController } from './comment-attachments.controller';
import { CommentAttachmentsService } from './comment-attachments.service';
import { CommentAttachment } from './comment-attachment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentAttachment])],
  controllers: [CommentAttachmentsController],
  providers: [CommentAttachmentsService],
})
export class CommentAttachmentsModule {}
