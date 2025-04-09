import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { schemasProviders } from './schemas.providers';

@Module({
    providers: [...databaseProviders, ...schemasProviders],
    exports: [...databaseProviders, ...schemasProviders],
})
export class MongoDbModule {}
