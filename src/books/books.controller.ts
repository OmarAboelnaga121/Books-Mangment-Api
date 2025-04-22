import { BadRequestException, Body, Controller, Get, Param, Post, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { BooksService } from './books.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { BooksDto } from './dto/books.dto';
import { userProfile } from 'src/auth/decorators/user.decorator';
import { userDto } from 'src/auth/dto/user.dto';
import { FileFieldsInterceptor, FileInterceptor } from '@nestjs/platform-express';

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
    @ApiBody({ type: BooksDto })
    @UseInterceptors(
        FileFieldsInterceptor([
          { name: 'bookImage', maxCount: 1 },
          { name: 'bookContent', maxCount: 1 },
        ])
      )
    async createBooks(
        @Body() bookData: BooksDto,
        @userProfile() user : userDto, 
        @UploadedFiles() files: { 
            bookImage?: Express.Multer.File[], 
            bookContent?: Express.Multer.File[] 
        }
    ) { 
        const bookImage = files.bookImage?.[0];
        const bookContent = files.bookContent?.[0];

        // Validate file presence
        if (!bookImage || !bookContent) {
            throw new BadRequestException('Book image and content are required');
        }

        // Validate image type
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedImageTypes.includes(bookImage.mimetype)) {
            throw new BadRequestException('Invalid image type. Only JPG, JPEG and PNG are allowed');
        }

        // Validate PDF type
        if (bookContent.mimetype !== 'application/pdf') {
            throw new BadRequestException('Invalid content type. Only PDF files are allowed');
        }

        return this.booksService.createBook(bookData, user.id, bookImage, bookContent);
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
    // Delete Book
    // Download Book
    // Book Requets
    // Accept Or Rejected Book Request
}
