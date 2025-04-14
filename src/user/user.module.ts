import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';
import { MongoDbModule } from 'src/mongo-db/mongo-db.module';

@Module({
  imports: [AuthModule, MongoDbModule],
  providers: [UserService],
  controllers: [UserController]
})
export class UserModule {}
