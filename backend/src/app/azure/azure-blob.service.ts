import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  BlobServiceClient,
  BlockBlobParallelUploadOptions,
  StorageSharedKeyCredential,
} from '@azure/storage-blob';

@Injectable()
export class AzureBlobService {
  private readonly blobServiceClient: BlobServiceClient;

  constructor(private readonly configService: ConfigService) {
    const accountName = this.configService.get('azure.storage.accountName');
    const accountKey = this.configService.get('azure.storage.accountKey');
    const sharedKeyCredential = new StorageSharedKeyCredential(
      accountName,
      accountKey,
    );
    const endpoint = `https://${accountName}.blob.core.windows.net`;
    this.blobServiceClient = new BlobServiceClient(
      endpoint,
      sharedKeyCredential,
    );
  }

  async uploadBlob(
    containerName: 'images' | 'files',
    blobName: string,
    buffer: Buffer,
    options?: BlockBlobParallelUploadOptions,
  ): Promise<string> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    await blockBlobClient.uploadData(buffer, options);

    return blockBlobClient.url;
  }

  async deleteBlob(containerName: string, blobName: string): Promise<void> {
    const containerClient =
      this.blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlockBlobClient(blobName);

    await blobClient.delete();
  }
}
