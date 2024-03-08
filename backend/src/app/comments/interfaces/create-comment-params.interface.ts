import { FileUpload } from 'src/app/files/interfaces/file-input.interface';

export interface CreateCommentParams {
  parentId: number | null;
  text: string;
  files: FileUpload[];
}
