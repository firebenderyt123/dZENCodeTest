import { FastifyReply } from 'fastify';
import { Controller } from '@nestjs/common';
import { CommentAttachmentsService } from './comment-attachments.service';

@Controller()
export class CommentAttachmentsController {
  constructor(
    private readonly commentAttachmentsService: CommentAttachmentsService,
  ) {}
}
