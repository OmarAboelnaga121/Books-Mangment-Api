import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class BooksDto {
  @ApiProperty({ description: 'The title of the book', example: 'Book Title' })
    @IsString()
    title: string;
  
    @ApiProperty({ description: 'The description of the book', example: 'This is a great book.' })
    @IsString()
    description: string;
  
    @ApiProperty({ description: 'The URL of the book cover', example: 'http://example.com/cover.jpg', required: false })
    @IsOptional()
    @IsString()
    coverUrl?: string;
  
    @ApiProperty({ description: 'The URL of the book content', example: 'http://example.com/content.pdf', required: false })
    @IsOptional()
    @IsString()
    contentUrl?: string;
  
    @ApiProperty({ description: 'The status of the book', example: 'PENDING', enum: ['PENDING', 'APPROVED'] })
    @IsEnum(['PENDING', 'APPROVED'])
    status: 'PENDING';
  
    @ApiProperty({ description: 'The ID of the seller', example: 'seller123' })
    @IsString()
    sellerId: string;
}