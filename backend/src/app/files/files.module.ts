import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AzureBlobModule } from '../azure/azure-blob.module';
import { FilesService } from './files.service';
import { File } from './file.entity';
import { ImageResizeService } from './image-resize.service';

@Module({
  imports: [AzureBlobModule, TypeOrmModule.forFeature([File])],
  providers: [FilesService, ImageResizeService],
  exports: [FilesService],
})
export class FilesModule {}
