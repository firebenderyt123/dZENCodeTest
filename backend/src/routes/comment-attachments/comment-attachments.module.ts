import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentAttachmentsController } from './comment-attachments.controller';
import { CommentAttachmentsService } from './comment-attachments.service';
import { CommentAttachment } from './comment-attachment.entity';
import { AzureBlobService } from 'src/helpers/azure/azure-blob.service';
import { FilesService } from 'src/helpers/files/files.service';
import { File } from 'src/helpers/files/file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CommentAttachment, File])],
  controllers: [CommentAttachmentsController],
  providers: [AzureBlobService, CommentAttachmentsService, FilesService],
})
export class CommentAttachmentsModule {}
