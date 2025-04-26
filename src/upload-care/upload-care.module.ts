import { Module } from '@nestjs/common';
import { UploadcareService } from './upload-care.service';

@Module({
    providers: [UploadcareService],
    exports: [UploadcareService],
})
export class UploadCareModule {}
