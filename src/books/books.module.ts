import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongoDbModule } from 'src/mongo-db/mongo-db.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports:[AuthModule, MongoDbModule],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
