import * as mongoose from 'mongoose';
import { ConfigService } from '@nestjs/config';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
        const mongoUri = configService.get<string>('MONGO_URI');
        if (!mongoUri) {
            throw new Error('MONGO_URI is not defined in the configuration');
        }
        return mongoose.connect(mongoUri);
    },
  },
];
