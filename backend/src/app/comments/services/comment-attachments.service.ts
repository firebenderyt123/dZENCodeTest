import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../../files/files.service';
import { CommentAttachment } from '../entities/comment-attachment.entity';
import { FileInput } from 'src/app/files/interfaces/file-input.interface';

@Injectable()
export class CommentAttachmentsService {
  constructor(
    @InjectRepository(CommentAttachment)
    private commentAttachmentRepository: Repository<CommentAttachment>,
    private filesService: FilesService,
  ) {}

  async saveAttachments(
    commentId: number,
    files: FileInput[],
  ): Promise<CommentAttachment[]> {
    const savedFiles = await this.filesService.saveFiles(files);
    if (!savedFiles.length)
      throw new BadGatewayException('Uploading files failed');
    const savedAttachments: CommentAttachment[] = [];

    const manager = this.commentAttachmentRepository.manager;
    const queryRunner = manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      for (const file of savedFiles) {
        savedAttachments.push(
          await queryRunner.manager.save(CommentAttachment, {
            file,
            commentId,
          }),
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return savedAttachments;
  }
}
