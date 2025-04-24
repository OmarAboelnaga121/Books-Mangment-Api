import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateBooksDto {
  @ApiProperty({ description: 'The title of the book', example: 'Book Title' })
    @IsString()
    title: string;
  
    @ApiProperty({ description: 'The description of the book', example: 'This is a great book.' })
    @IsString()
    description: string;
  
    @ApiProperty({ description: 'The URL of the book cover', example: 'http://example.com/cover.jpg', required: false })
    @IsString()
    coverUrl: string;
  
    @ApiProperty({ description: 'The URL of the book content', example: 'http://example.com/content.pdf', required: false })
    @IsString()
    contentUrl: string;
}