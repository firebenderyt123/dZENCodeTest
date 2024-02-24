import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilesService } from '../files/files.service';
import { CommentAttachment } from './comment-attachment.entity';
import { FileUpload } from '../files/interfaces/file-upload.interface';

@Injectable()
export class CommentAttachmentsService {
  constructor(
    @InjectRepository(CommentAttachment)
    private commentAttachmentRepository: Repository<CommentAttachment>,
    private filesService: FilesService,
  ) {}

  async saveAttachments(
    commentId: number,
    files: FileUpload[],
  ): Promise<CommentAttachment[]> {
    const manager = this.commentAttachmentRepository.manager;
    const queryRunner = manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const savedFiles = await this.filesService.saveFiles(files);
    const savedAttachments: CommentAttachment[] = [];
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

  async removeAttachment(userId: number, fileId: number): Promise<void> {
    const attachment = await this.findAttachmentWithUserByFileId(fileId);

    if (!attachment) return;

    if (attachment.comment.user.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to delete this attachment',
      );
    }

    await this.filesService.remove(fileId);
  }

  private async findAttachmentWithUserByFileId(
    fileId: number,
  ): Promise<CommentAttachment | null> {
    return await this.commentAttachmentRepository.findOne({
      where: { fileId },
      relations: ['comment', 'comment.user'],
    });
  }
}
