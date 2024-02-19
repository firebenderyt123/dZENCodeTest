import { FastifyRequest } from 'fastify';
import {
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { File } from '../files/file.entity';
import { CommentAttachmentsService } from './comment-attachments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';

@Controller()
export class CommentAttachmentsController {
  constructor(
    private readonly authService: AuthService,
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
  @UseGuards(JwtAuthGuard)
  @Post(':commentId')
  async addAttachment(
    @Param('commentId') commentId: number,
    @Req() req: FastifyRequest,
  ): Promise<File[]> {
    const { id } = this.authService.getTokenPayload(req);
    const multiPart = req.files();
    const uploadedFiles: File[] = [];

    for await (const part of multiPart) {
      uploadedFiles.push(
        await this.commentAttachmentsService.addAttachment(id, commentId, part),
      );
    }
    return uploadedFiles;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':fileId')
  async removeAttachemnt(
    @Param('fileId') fileId: number,
    @Req() req: FastifyRequest,
  ): Promise<'ok'> {
    const { id } = this.authService.getTokenPayload(req);
    await this.commentAttachmentsService.removeAttachment(id, fileId);
    return 'ok';
  }
}
