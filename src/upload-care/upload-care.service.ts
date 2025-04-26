import { Injectable } from '@nestjs/common';
import { UploadClient } from '@uploadcare/upload-client';

@Injectable()
export class UploadcareService {
  private uploadClient: UploadClient;

  constructor() {
    if (!process.env.UPLOADCARE_PUBLIC_KEY) {
      throw new Error('UPLOADCARE_PUBLIC_KEY environment variable is not defined');
    }
    this.uploadClient = new UploadClient({
      publicKey: process.env.UPLOADCARE_PUBLIC_KEY,
    });
  }

  async uploadPdf(file: Express.Multer.File) {
    try {
      const result = await this.uploadClient.uploadFile(file.buffer, {
        contentType: file.mimetype,
        fileName: file.originalname,
        store: true,
      });

      return {
        fileId: result.uuid,
        cdnUrl: `https://ucarecdn.com/${result.uuid}/`,
        originalName: file.originalname,
      };
    } catch (error) {
      throw new Error('Failed to upload PDF');
    }
  }
}