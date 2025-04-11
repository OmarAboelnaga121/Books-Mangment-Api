import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongoDbModule } from 'src/mongo-db/mongo-db.module';

@Module({
  imports:[
    MongoDbModule,
    
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
