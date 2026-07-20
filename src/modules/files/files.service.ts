import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { randomUUID } from 'crypto';
import { extname, join, resolve } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import sharp from 'sharp';

export interface StoredFile {
  fileName: string;
  filePath: string;
  url: string;
  mimeType: string;
  sizeBytes: number;
}

const IMAGE_MAX_WIDTH = 1920;

@Injectable()
export class FilesService {
  private readonly storageRoot: string;

  constructor(private readonly configService: ConfigService) {
    this.storageRoot = resolve(
      this.configService.get<string>('fileStorage.localPath') ?? './storage',
    );
  }

  async storeFile(
    file: Express.Multer.File,
    subfolder = 'general',
  ): Promise<StoredFile> {
    const targetDir = join(this.storageRoot, subfolder);
    await mkdir(targetDir, { recursive: true });

    const isImage = file.mimetype.startsWith('image/');
    const buffer = isImage
      ? await this.optimizeImage(file.buffer)
      : file.buffer;

    const fileName = `${randomUUID()}${extname(file.originalname)}`;
    const filePath = join(targetDir, fileName);
    await writeFile(filePath, buffer);

    return {
      fileName,
      filePath: join(subfolder, fileName),
      url: `/uploads/${subfolder}/${fileName}`,
      mimeType: file.mimetype,
      sizeBytes: buffer.byteLength,
    };
  }

  private async optimizeImage(buffer: Buffer): Promise<Buffer> {
    return sharp(buffer)
      .rotate()
      .resize({ width: IMAGE_MAX_WIDTH, withoutEnlargement: true })
      .toBuffer();
  }
}
