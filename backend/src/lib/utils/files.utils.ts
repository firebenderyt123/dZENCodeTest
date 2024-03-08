import { FileUpload } from 'graphql-upload-minimal';
import {
  FileInput,
  FileUpload as FU,
} from 'src/app/files/interfaces/file-input.interface';

const MAX_FILES_NUMBER = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5 mb
const MAX_FILE_SIZE = 100 * 1024; // 100 kb

export async function parseUploadedFiles(
  files: FileUpload[] | Promise<FileUpload>[],
): Promise<FileInput[]> {
  return await Promise.all(
    files.map(
      async (file: FileUpload | Promise<FileUpload>) =>
        await parseUploadedFile(file),
    ),
  );
}

export async function parseUploadedFile(
  file: FileUpload | Promise<FileUpload>,
): Promise<FileInput> {
  try {
    const { fieldName, filename, encoding, mimetype, createReadStream } =
      await file;
    const stream = createReadStream();
    const chunks = [];
    await new Promise<Buffer>((resolve, reject) => {
      let buffer: Buffer;
      stream.on('data', function (chunk) {
        chunks.push(chunk);
      });
      stream.on('end', function () {
        buffer = Buffer.concat(chunks);
        resolve(buffer);
      });
      stream.on('error', reject);
    });
    const buffer = Buffer.concat(chunks);
    const newFile = {
      fieldname: fieldName,
      originalname: filename,
      encoding,
      mimetype,
      buffer,
      size: buffer.byteLength,
    };
    return newFile;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export function filesUploadToFilesInput(files: FU[]) {
  return files.map((file) => ({
    ...file,
    buffer: Buffer.from(file.buffer.data),
  }));
}

export function validateFiles(files: FileInput[]) {
  return files.filter((file) =>
    validateFilesBySizeAndType(file.mimetype, file.size),
  );
}
function validateFilesBySizeAndType(
  fileType: string,
  fileSize: number,
): boolean {
  switch (fileType) {
    case 'image/jpeg':
    case 'image/jpg':
    case 'image/png':
    case 'image/gif':
      return fileSize <= MAX_IMAGE_SIZE; // 5mb
    case 'text/plain':
      return fileSize <= MAX_FILE_SIZE; // 100kb
    default:
      return false;
  }
}
