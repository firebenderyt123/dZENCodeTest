import { FastifyRequest, FastifyReply } from 'fastify';
import { Controller, Delete, Param, Post, Req, Res } from '@nestjs/common';
import { File } from 'src/helpers/files/file.entity';
import { CommentAttachmentsService } from './comment-attachments.service';

@Controller()
export class CommentAttachmentsController {
  constructor(
    private readonly commentAttachmentsService: CommentAttachmentsService,
  ) {}

  // new ParseFilePipeBuilder()
  //   .addFileTypeValidator({
  //     fileType: /\.(jpg|jpeg|gif|png|txt)$/,
  //   })
  //   .addMaxSizeValidator({
  //     maxSize: 102400,
  //   })
  //   .build({
  //     errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  //   }),
  @Post(':id')
  async addAttachment(
    @Param('id') commentId: number,
    @Req() request: FastifyRequest,
    @Res() reply: FastifyReply,
  ) {
    const multiPart = request.files();

    const uploadedFiles: File[] = [];

    for await (const part of multiPart) {
      uploadedFiles.push(
        await this.commentAttachmentsService.addAttachment(commentId, part),
      );
    }
    reply.send(uploadedFiles);
  }

  @Delete(':attachmentId')
  async removeAttachemnt(
    @Param('attachmentId') attachmentId: number,
    @Res() reply: FastifyReply,
  ) {
    await this.commentAttachmentsService.removeAttachment(attachmentId);
    reply.send('ok');
  }
}
