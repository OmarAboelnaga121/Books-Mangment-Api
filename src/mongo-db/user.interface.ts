export interface IUser {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'seller';
    books: string[];
    createdAt?: Date;
    updatedAt?: Date;
}