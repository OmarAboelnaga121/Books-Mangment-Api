
import { Connection } from 'mongoose';
import { BookSchema } from '../schemas/book.schema';
import { UserSchema } from '../schemas/user.schema';

export const schemasProviders = [
  {
    provide: 'User',
    useFactory: (connection: Connection) => connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  {
    provide: 'Books',
    useFactory: (connection: Connection) => connection.model('Books', BookSchema),
    inject: ['DATABASE_CONNECTION'],
  },
  
];
