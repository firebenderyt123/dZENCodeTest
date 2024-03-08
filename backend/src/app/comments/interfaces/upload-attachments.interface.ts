import { FileUpload } from 'src/app/files/interfaces/file-input.interface';

export interface UploadAttachmentsArgs {
  commentId: number;
  files: FileUpload[];
}
