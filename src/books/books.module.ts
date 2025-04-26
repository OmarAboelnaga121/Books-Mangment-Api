import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongoDbModule } from 'src/mongo-db/mongo-db.module';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UploadCareModule } from 'src/upload-care/upload-care.module';

@Module({
  imports:[AuthModule, MongoDbModule, CloudinaryModule, UploadCareModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
