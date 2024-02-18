import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultipartFile } from '@fastify/multipart';
import { Repository } from 'typeorm';
import { File } from 'src/helpers/files/file.entity';
import { FilesService } from 'src/helpers/files/files.service';
import { CommentAttachment } from './comment-attachment.entity';

@Injectable()
export class CommentAttachmentsService {
  constructor(
    @InjectRepository(CommentAttachment)
    private commentAttachmentRepository: Repository<CommentAttachment>,
    private filesService: FilesService,
  ) {}

  async addAttachment(commentId: number, file: MultipartFile): Promise<File> {
    const uploadedFile = await this.filesService.upload(file);

    const commentAttachment = this.commentAttachmentRepository.create({
      file: uploadedFile,
      commentId,
    });

    await this.commentAttachmentRepository.save(commentAttachment);

    return uploadedFile;
  }

  async removeAttachment(fileId: number): Promise<void> {
    await this.filesService.remove(fileId);
  }
}
