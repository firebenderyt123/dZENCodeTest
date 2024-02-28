import { FileInput } from 'src/app/files/interfaces/file-input.interface';

export interface ImageUpload extends FileInput {
  type: 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/gif';
}
