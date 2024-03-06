import {
  PipeTransform,
  Injectable,
  HttpStatus,
  ParseFilePipeBuilder,
  BadRequestException,
} from '@nestjs/common';
import { FileInput } from 'src/app/files/interfaces/file-input.interface';

const MAX_FILES_NUMBER = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 mb
const MAX_FILE_SIZE = 100 * 1024; // 100 kb

@Injectable()
export class ParseFilePipe implements PipeTransform {
  async transform(files: FileInput[] | undefined): Promise<FileInput[]> {
    if (!files.length) return [];
    else if (files.length > MAX_FILES_NUMBER)
      throw new BadRequestException(
        `Allowed max ${MAX_FILES_NUMBER} files to attach`,
      );

    const processedFiles: FileInput[] = [];
    for await (const file of files) {
      const result = await new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|gif|png|text\/plain)$/i,
        })
        .addMaxSizeValidator({
          maxSize: this.getMaxSizeForFileType(file.mimetype) + 1,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
        .transform(file);

      if (!result) {
        throw new BadRequestException('Invalid file type or size');
      }

      processedFiles.push(file);
    }

    return processedFiles;
  }

  private getMaxSizeForFileType(fileType: string): number {
    switch (fileType) {
      case 'image/jpeg':
      case 'image/jpg':
      case 'image/png':
      case 'image/gif':
        return MAX_IMAGE_SIZE; // 5mb
      case 'text/plain':
        return MAX_FILE_SIZE; // 100kb
      default:
        return MAX_FILE_SIZE;
    }
  }
}
