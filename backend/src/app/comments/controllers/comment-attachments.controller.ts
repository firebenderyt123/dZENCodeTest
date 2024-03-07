import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { COMMENTS_MESSAGES } from '../enums/comments-messages.enum';
import { FilesInterceptor } from '@nest-lab/fastify-multer';
import { ParseFilePipe } from 'src/lib/pipes/parse-file.pipe';
import { FileUpload } from 'src/app/files/interfaces/file-input.interface';
import { RestApiAuthGuard } from 'src/lib/guards/jwt-rest-api.guard';
import { Jwt, JwtPayload } from 'src/lib/decorators/jwt-rest-api.decorator';
import { firstValueFrom } from 'rxjs';
import { RABBIT_CLIENT_NAME } from 'src/lib/enums/rabbitmq.enum';
import { ClientProxy } from '@nestjs/microservices';
import { RestApiError } from 'src/lib/interfaces/rest-api-error.interface';

@Controller()
export class CommentAttachmentsController {
  constructor(
    @Inject(RABBIT_CLIENT_NAME.COMMENTS) private readonly client: ClientProxy,
  ) {}

  @Post('attachments/:id')
  @UseGuards(RestApiAuthGuard)
  @UseInterceptors(FilesInterceptor('files'))
  @HttpCode(HttpStatus.OK)
  async uploadFiles(
    @Param('id') commentId: number,
    @Jwt() jwtPayload: JwtPayload,
    @UploadedFiles(new ParseFilePipe()) files: FileUpload[],
  ): Promise<boolean> {
    const attachments = this.client.send<boolean>(
      { cmd: COMMENTS_MESSAGES.UPLOAD_ATTACHMENTS },
      { userId: jwtPayload.id, data: { commentId, files } },
    );
    const data = await firstValueFrom<boolean | RestApiError>(attachments);
    if (typeof data !== 'boolean') throw new HttpException(data, data.status);
    return data;
  }
}
