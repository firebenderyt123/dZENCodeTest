export interface FileInput {
  name: string;
  buffer: Buffer;
  size: number;
  type: string;
}

export interface FileUpload {
  name: string;
  buffer: ArrayBuffer;
  size: number;
  type: string;
}
