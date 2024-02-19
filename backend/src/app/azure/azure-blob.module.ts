import { Module } from '@nestjs/common';
import { AzureBlobService } from '../azure/azure-blob.service';

@Module({
  providers: [AzureBlobService],
  exports: [AzureBlobService],
})
export class AzureBlobModule {}
