import { FastifyRequest } from 'fastify';
import {
  BadRequestException,
  Controller,
  Delete,
  Param,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nest-lab/fastify-multer';
import { File } from '../files/file.entity';
import { CommentAttachmentsService } from './comment-attachments.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AuthService } from '../auth/auth.service';
import { FileUpload } from '../files/interfaces/file-upload.interface';
import { ParseFilePipe } from '../files/pipes/parse-file.pipe';

@Controller()
export class CommentAttachmentsController {
  constructor(
    private readonly authService: AuthService,
    private readonly commentAttachmentsService: CommentAttachmentsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post(':commentId')
  @UseInterceptors(FilesInterceptor('files'))
  async addAttachment(
    @Param('commentId') commentId: number,
    @Req() req: FastifyRequest,
    @UploadedFiles(new ParseFilePipe()) files: FileUpload[],
  ): Promise<File[]> {
    if (isNaN(commentId)) {
      throw new BadRequestException(':id must be a number');
    }

    const { id } = this.authService.getTokenPayload(req);
    const uploadedFiles: File[] = [];

    for await (const file of files) {
      uploadedFiles.push(
        await this.commentAttachmentsService.addAttachment(id, commentId, file),
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
    if (isNaN(fileId)) {
      throw new BadRequestException(':id must be a number');
    }

    const { id } = this.authService.getTokenPayload(req);
    await this.commentAttachmentsService.removeAttachment(id, fileId);
    return 'ok';
  }
}
