import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BooksDto } from './dto/books.dto';
import { userProfile } from 'src/auth/decorators/user.decorator';
import { userDto } from 'src/auth/dto/user.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { CreateBooksDto } from './dto/createBook.dto';
import { Status } from 'cloudinary';
import { updateStatusDto } from './dto/updateStatus.dto';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
@UseGuards(ThrottlerGuard)
export class BooksController {
    // Constructor
    constructor(
        private booksService : BooksService,
    ) {}

    // Get Books
    @Get('')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get All Approved Books' })
    @ApiResponse({ status: 200, description: 'All Books' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBooks() {
        return this.booksService.getBooks();
    }
    // Get Book by ID
    @Get('/books/:id')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get Book by ID' })
    @ApiResponse({ status: 200, description: 'All Books' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getBookById(@Param('id') id : string) {
        return this.booksService.getBookById(id);
    }

    // Create Book
    @Post('/book')
    @ApiOperation({ summary: 'Create Book' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Single Book By Id' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiBody({ type: CreateBooksDto })
    @UseInterceptors(FileInterceptor('bookImage'))
    async createBooks(
        @Body() bookData: CreateBooksDto,
        @userProfile() user : userDto, 
        @UploadedFile() bookImage: Express.Multer.File
    ) { 
        return this.booksService.createBook(bookData, user.id, bookImage);
    }
    
    // Get User Books
    @Get('/user')
    @ApiOperation({ summary: 'Get User Books' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User Books' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getUserBooks(@userProfile() user : userDto) {        
        return this.booksService.getUserBooks(user.id);
    }

    // Update Book
    @Put('/book/:id')
    @ApiOperation({ summary: 'Update Book Data' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Book Updated' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async updateBook(@userProfile() user : userDto, @Param('id') id : string, @Body() bookData : BooksDto) {        
        return this.booksService.updateBook(id, user.id, bookData);
    }

    // Delete Book
    @Delete('/book/:id')
    @ApiOperation({ summary: 'Delete Book By Id' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Book Has Deleted Successfully' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async deleteBook(@Param('id') id : string, @userProfile() user : userDto) {
        this.booksService.deleteBook(id, user.id);
    }
    // Download Book
    // Book Requets
    @Get('booksOnRequest')
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get All Pended Books' })
    @ApiResponse({ status: 200, description: 'All Books' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async booksOnRequest() {
        return this.booksService.booksOnRequest();
    }

    // Accept Or Rejected Book Request
    @Put('/book/updateStatus/:id')
    @ApiOperation({ summary: 'Update Book Status' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Book Updated' })
    @ApiResponse({ status: 400, description: 'Bad Request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiBody({ type: updateStatusDto })
    async updateBookStatus(@userProfile() user : userDto, @Param('id') id : string,@Body() status : updateStatusDto) {        
        return this.booksService.updateBookStatus(id, user.id, status);
    }
}
