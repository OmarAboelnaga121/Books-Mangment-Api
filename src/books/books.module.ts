import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongoDbModule } from 'src/mongo-db/mongo-db.module';
import { AuthModule } from 'src/auth/auth.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports:[AuthModule, MongoDbModule, CloudinaryModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
