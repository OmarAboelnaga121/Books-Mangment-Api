import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BooksDto } from './dto/books.dto';
import { userProfile } from 'src/auth/decorators/user.decorator';
import { userDto } from 'src/auth/dto/user.dto';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
@UseGuards(ThrottlerGuard)
export class BooksController {
    // Constructor
    constructor(
        private booksService : BooksService
    ) {}

    // Get Books
    @Get('/books')
    @ApiOperation({ summary: 'Get All Approved Books' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'All Books' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBooks() {
        return this.booksService.getBooks();
    }
    // Get Book by ID
    // Create Book
    @Post('/books')
    @ApiOperation({ summary: 'Create Book' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'All Books' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiBody({ type: BooksDto })
    async createBooks(@Body() bookData: BooksDto, @userProfile() user : userDto) {
        return this.booksService.createBook(bookData, user.id);
    }
    // Update Book
    // Delete Book
    // Download Book
    // Book Requets
    // Accept Or Rejected Book Request
}
