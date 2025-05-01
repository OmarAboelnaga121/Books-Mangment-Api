import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { MongoDbModule } from '../mongo-db/mongo-db.module';
import { AuthModule } from '../auth/auth.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { UploadCareModule } from '../upload-care/upload-care.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports:[
    AuthModule, 
    MongoDbModule, 
    CloudinaryModule, 
    UploadCareModule,
    CacheModule.register({
      store: redisStore as any,
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      ttl: 60 * 60,
      max: 100,
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService]
})
export class BooksModule {}
