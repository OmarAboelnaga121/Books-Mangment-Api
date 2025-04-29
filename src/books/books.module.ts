import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongoDbModule } from '../mongo-db/mongo-db.module';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UploadCareModule } from '../upload-care/upload-care.module';

@Module({
  imports:[AuthModule, MongoDbModule, CloudinaryModule, UploadCareModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
