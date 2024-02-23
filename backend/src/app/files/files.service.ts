import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { AzureBlobService } from '../azure/azure-blob.service';
import { File } from './file.entity';
import { FileUpload } from './interfaces/file-upload.interface';
import { ImageResizeService } from './image-resize.service';
import { ImageUpload } from './interfaces/image-upload.interface';

@Injectable()
export class FilesService {
  private readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private azureBlobService: AzureBlobService,
    private imageResizeService: ImageResizeService,
  ) {}

  async upload(file: FileUpload): Promise<File> {
    const { originalname, buffer } = file;
    const extension = originalname.split('.').pop();
    const newFileName = randomBytes(16).toString('hex') + '.' + extension;

    const containerName = extension === 'txt' ? 'files' : 'images';

    const currentDate = new Date();
    const directoryName = `${currentDate.getFullYear()}/${(
      currentDate.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}`;

    const blobName = directoryName + '/' + newFileName;

    const fileUrl = await this.azureBlobService.uploadBlob(
      containerName,
      blobName,
      buffer,
    );

    const newFile = this.filesRepository.create({
      containerName,
      blobName,
      fileUrl,
    });

    await this.filesRepository.save(newFile);

    return newFile;
  }

  async remove(id: number): Promise<void> {
    const file = await this.filesRepository.findOneBy({ id });
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }

    const { containerName, blobName } = file;

    await this.azureBlobService.deleteBlob(containerName, blobName);

    await this.filesRepository.delete(id);
  }

  isFileImage(file: FileUpload): boolean {
    return this.allowedImageTypes.includes(file.mimetype);
  }

  async resizeImage(
    file: ImageUpload,
    maxWidth: number = 320,
    maxHeight: number = 240,
  ): Promise<ImageUpload> {
    return await this.imageResizeService.resizeImageIfNeeded(
      file,
      maxWidth,
      maxHeight,
    );
  }
}
