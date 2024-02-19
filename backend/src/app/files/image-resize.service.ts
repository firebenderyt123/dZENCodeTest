import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';
import { ImageUpload } from './interfaces/image-upload.interface';

@Injectable()
export class ImageResizeService {
  async resizeImageIfNeeded(
    image: ImageUpload,
    maxWidth: number,
    maxHeight: number,
  ): Promise<ImageUpload> {
    const metadata = await sharp(image.buffer).metadata();
    if (!metadata.width || !metadata.height) return image;

    if (metadata.width > maxWidth || metadata.height > maxHeight) {
      const buffer = await sharp(image.buffer)
        .resize({
          width: maxWidth,
          height: maxHeight,
          fit: 'inside',
        })
        .toBuffer();

      image.buffer = buffer;
      return image;
    }
  }
}
