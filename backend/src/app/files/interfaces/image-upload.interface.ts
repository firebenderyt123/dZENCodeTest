import { FileUpload } from './file-upload.interface';

export interface ImageUpload extends FileUpload {
  mimetype: 'image/jpeg' | 'image/jpg' | 'image/png' | 'image/gif';
}
