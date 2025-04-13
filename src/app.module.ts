import { Module } from '@nestjs/common';
import { MongoDbModule } from './mongo-db/mongo-db.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongoDbModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 600, 
      limit: 10,
    }]),
    UserModule,

  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
