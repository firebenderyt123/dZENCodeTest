import {
  PipeTransform,
  Injectable,
  HttpStatus,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInput } from 'src/app/files/interfaces/file-input.interface';

@Injectable()
export class ParseFilePipe implements PipeTransform {
  async transform(files: FileInput[] | undefined): Promise<FileInput[]> {
    if (!files.length) return [];

    const processedFiles: FileInput[] = [];
    for await (const file of files) {
      const result = await new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|gif|png|text\/plain)$/i,
        })
        .addMaxSizeValidator({
          maxSize: this.getMaxSizeForFileType(file.type),
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
        .transform(file);

      if (!result) {
        throw new Error('Invalid file type or size');
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
        return 5242881; // 5mb
      case 'text/plain':
        return 102401; // 100kb
      default:
        return 102401;
    }
  }
}
