import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookI } from 'src/mongo-db/book.interface';
import { IUser } from 'src/mongo-db/user.interface';
import { BooksDto } from './dto/books.dto';

@Injectable()
export class BooksService {
    // Constructor
    constructor(
        @Inject('Books') private bookModel : Model<BookI>,
        @Inject('User') private userModel: Model<IUser>
    ) {}

    // Get Books
    async getBooks(){
        const books = await this.bookModel.aggregate([
            { $match: { status: 'APPROVED' } },
            { $sample: { size: 1 } }
        ]);

        return books;
    }
    // Get Book by ID

    // Create Book
    async createBook(bookData: BooksDto, userId : string) {
        // Check User
        const checkUser = await this.userModel.findById(userId);
        if (!checkUser) {
            throw new BadRequestException('User not found');
        }

        // Create Book
        const book = await this.bookModel.create({
            ...bookData,
            sellerId: userId,
            status: 'APPROVED',
        });

        // Update User
        const updateUserBooks = await this.userModel.findByIdAndUpdate(
            userId,
            { $push: { books: book._id } },
            { new: true }
        )

        if (!updateUserBooks) {
            throw new BadRequestException('User not found');
        }

        // Return Book
        return book;
    }

    // Update Book
    // Delete Book
    // Download Book
    // Book Requets
    // Accept Or Rejected Book Request
}
