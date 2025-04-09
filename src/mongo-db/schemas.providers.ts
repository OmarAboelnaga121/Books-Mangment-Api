
import { Connection } from 'mongoose';
import { BookSchema } from 'src/schemas/book.schema';
import { RequestSchema } from 'src/schemas/request.schema';
import { UserSchema } from 'src/schemas/user.schema';

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
  {
    provide: 'Requests',
    useFactory: (connection: Connection) => connection.model('Requests', RequestSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
