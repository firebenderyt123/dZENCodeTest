import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MultipartFile } from '@fastify/multipart';
import { Repository } from 'typeorm';
import { randomBytes } from 'crypto';
import { AzureBlobService } from '../azure/azure-blob.service';
import { File } from './file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private filesRepository: Repository<File>,
    private azureBlobService: AzureBlobService,
  ) {}

  async upload(file: MultipartFile): Promise<File> {
    const { filename, file: fileStream } = file;
    const buffer = await this.streamToBuffer(fileStream);
    const extension = filename.split('.').pop();
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

  private async streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      stream.on('data', (chunk: Buffer) => chunks.push(chunk));
      stream.on('end', () => resolve(Buffer.concat(chunks)));
      stream.on('error', reject);
    });
  }
}
