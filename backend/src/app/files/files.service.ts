import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { AzureBlobService } from '../azure/azure-blob.service';
import { File } from './file.entity';
import { ImageResizeService } from './image-resize.service';
import { ImageUpload } from './interfaces/image-upload.interface';
import { FileInput } from 'src/app/files/interfaces/file-input.interface';

@Injectable()
export class FilesService {
  private readonly allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private azureBlobService: AzureBlobService,
    private imageResizeService: ImageResizeService,
  ) {}

  async saveFiles(files: FileInput[]) {
    const filesToUpload: FileInput[] = files.filter(async (file) => {
      const isImage = this.isFileImage(file);

      if (isImage) {
        return await this.resizeImage(file as ImageUpload);
      }
      return false;
    });

    return await this.saveFilesToDB(filesToUpload);
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

  private isFileImage(file: FileInput): boolean {
    return this.allowedImageTypes.includes(file.mimetype);
  }

  private async resizeImage(
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

  private async uploadToAzure(file: FileInput): Promise<{
    containerName: 'files' | 'images';
    blobName: string;
    fileUrl: string;
  }> {
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

    return { containerName, blobName, fileUrl };
  }

  private async saveFilesToDB(files: FileInput[]): Promise<File[]> {
    const queryRunner =
      this.filesRepository.manager.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    const savedFiles: File[] = [];
    try {
      for (const file of files) {
        const uploadedFile = await this.uploadToAzure(file);
        savedFiles.push(await queryRunner.manager.save(File, uploadedFile));
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
    return savedFiles;
  }
}
