import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import {
  FileInput,
  FileUpload,
} from 'src/app/files/interfaces/file-input.interface';

export async function isValidationError(
  dto: ClassConstructor<object>,
  data: object,
): Promise<Error | null> {
  const dtoToValidate = plainToInstance(dto, data);
  try {
    await validateOrReject(dtoToValidate);
  } catch (errors) {
    if (Array.isArray(errors)) {
      return new Error(errors[0]);
    }
    return new Error(errors);
  }
  return null;
}

export function getValidFiles(files: FileUpload[]): FileInput[] {
  const processedFiles: FileInput[] = [];
  for (const file of files) {
    if (
      /(jpg|jpeg|gif|png|text\/plain)$/i.test(file.type) &&
      file.size <= getMaxSizeForFileType(file.type)
    ) {
      processedFiles.push({ ...file, buffer: Buffer.from(file.buffer) });
    }
  }
  return processedFiles;
}

function getMaxSizeForFileType(fileType: string): number {
  switch (fileType) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/gif':
      return 5242880; // 5mb
    case 'text/plain':
      return 102400; // 100kb
    default:
      return 102400;
  }
}
