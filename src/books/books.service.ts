import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { BookI } from '../mongo-db/book.interface';
import { IUser } from '../mongo-db/user.interface';
import { BooksDto } from './dto/books.dto';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateBooksDto } from './dto/createBook.dto';
import { updateStatusDto } from './dto/updateStatus.dto';
import { UploadcareService } from '../upload-care/upload-care.service';

@Injectable()
export class BooksService {
    // Constructor
    constructor(
        @Inject('Books') private bookModel : Model<BookI>,
        @Inject('User') private userModel: Model<IUser>,
        private cloudnaryService : CloudinaryService,
        private readonly uploadcareService: UploadcareService,    ) {}

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
    async createBook(bookData: CreateBooksDto, userId : string, bookImage: Express.Multer.File, pdf: Express.Multer.File) {
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

        // Upload Book Image
        const uploadPdf = await this.uploadcareService.uploadPdf(pdf);
        if (!uploadPdf) {
            throw new BadRequestException('Image upload failed');
        }
        book.contentUrl = uploadPdf.cdnUrl;

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
    async updateBook(id: string, userId: string, bookData: BooksDto) {
        // Check if user exists
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Check if book exists
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new BadRequestException('Book not found');
        }

        // Check if book belongs to user
        if (book.sellerId.toString() !== userId) {
            throw new BadRequestException('You are not the owner of this book');
        }

        // Update Book
        const updatedBook = await this.bookModel.findByIdAndUpdate(id, bookData, { new: true });

        return updatedBook;
    }

    // Delete Book
    async deleteBook(id: string, userId: string) {
        // Check if user exists
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Check if book exists
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new BadRequestException('Book not found');
        }

        // Check if book belongs to user
        if (book.sellerId.toString() !== userId) {
            throw new BadRequestException('You are not the owner of this book');
        }

        // Delete Book
        await this.bookModel.findByIdAndDelete(id);

        // Update User Books
        await this.userModel.findByIdAndUpdate(
            userId,
            { $pull: { books: id } },
            { new: true }
        );

        return { message: 'Book deleted successfully' };
    }
    // Download Book

    // Book Requets
    async booksOnRequest(){
        const books = await this.bookModel.find({ status: 'PENDING' });

        return books;
    }

    // Accept Or Rejected Book Request
    async updateBookStatus(id: string, userId: string, status: updateStatusDto) {
        // Check if user exists
        const user = await this.userModel.findById(userId);
        if (!user) {
            throw new BadRequestException('User not found');
        }

        // Check if book exists
        const book = await this.bookModel.findById(id);
        if (!book) {
            throw new BadRequestException('Book not found');
        }

        // Check if book belongs to user
        if (book.sellerId.toString() !== userId) {
            throw new BadRequestException('You are not the owner of this book');
        }

        if(status.status) {
            const updatedBook = await this.bookModel.findByIdAndUpdate(id, { status: 'APPROVED' }, { new: true });
        } else {
            this.deleteBook(id, userId);
        }

    }
}
