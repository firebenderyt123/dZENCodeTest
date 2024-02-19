import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultipartFile } from '@fastify/multipart';
import { Repository } from 'typeorm';
import { CommentsService } from '../comments/comments.service';
import { File } from '../files/file.entity';
import { FilesService } from '../files/files.service';
import { CommentAttachment } from './comment-attachment.entity';

@Injectable()
export class CommentAttachmentsService {
  constructor(
    @InjectRepository(CommentAttachment)
    private commentAttachmentRepository: Repository<CommentAttachment>,
    private commentService: CommentsService,
    private filesService: FilesService,
  ) {}

  async addAttachment(
    userId: number,
    commentId: number,
    file: MultipartFile,
  ): Promise<File> {
    const comment =
      await this.commentService.findCommentWithUserById(commentId);

    if (!comment) throw new NotFoundException('Comment not found');

    if (comment.user.id !== userId) {
      throw new ForbiddenException(
        'You are not allowed to add attachment to this comment',
      );
    }

    const uploadedFile = await this.filesService.upload(file);

    const commentAttachment = this.commentAttachmentRepository.create({
      file: uploadedFile,
      commentId,
    });

    await this.commentAttachmentRepository.save(commentAttachment);

    return uploadedFile;
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
