import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CommentAttachment } from './comment-attachment.entity';

@Injectable()
export class CommentAttachmentsService {
  constructor(
    @InjectRepository(CommentAttachment)
    private commentAttachmentRepository: Repository<CommentAttachment>,
  ) {}

  async remove(id: number): Promise<void> {
    await this.commentAttachmentRepository.delete(id);
  }
}
