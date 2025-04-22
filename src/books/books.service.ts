import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookI } from 'src/mongo-db/book.interface';
import { IUser } from 'src/mongo-db/user.interface';
import { BooksDto } from './dto/books.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class BooksService {
    // Constructor
    constructor(
        @Inject('Books') private bookModel : Model<BookI>,
        @Inject('User') private userModel: Model<IUser>,
        private cloudnaryService : CloudinaryService
    ) {}

    // Get Books
    async getBooks(){
        const books = await this.bookModel.find({ status: 'APPROVED' });

        return books;
    }
    // Get Book by ID
    async getBookById(id: string) {
        const book = await this.bookModel.findById(id);

        if (!book) {
            throw new BadRequestException('Book not found');
        }
        return book;
    }

    // Create Book
    async createBook(bookData: BooksDto, userId : string, bookImage: Express.Multer.File, bookContent: Express.Multer.File) {
        // Check User
        const checkUser = await this.userModel.findById(userId);
        if (!checkUser) {
            throw new BadRequestException('User not found');
        }

        // Create Book
        const book = await this.bookModel.create({
            ...bookData,
            sellerId: userId,
            status: 'PENDING',
        });

        // Upload Book Image
        const uploadImage = await this.cloudnaryService.uploadFile(bookImage);
        if (!uploadImage) {
            throw new BadRequestException('Image upload failed');
        }
        book.coverUrl = uploadImage.secure_url;

        // Upload The Book File
        const uploadContent = await this.cloudnaryService.uploadFile(bookContent);
        if (!uploadContent) {
            throw new BadRequestException('Content upload failed');
        }
        book.contentUrl = uploadContent.secure_url;

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

    // Get User Books
    async getUserBooks(userId: string) {
        // Check if user exists
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        

        // get user books
        const books = await this.bookModel.find({ sellerId: userId });
        if (!books) {
            return [];
        }

        // return user books
        return books;
    }
    // Update Book
    // Delete Book
    // Download Book
    // Book Requets
    // Accept Or Rejected Book Request
}
