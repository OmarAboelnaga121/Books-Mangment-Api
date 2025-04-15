import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum } from 'class-validator';

export class UpdateBookDto {
  @ApiProperty({ description: 'The title of the book', example: 'Updated Book Title', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'The description of the book', example: 'Updated description.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The URL of the book cover', example: 'http://example.com/updated-cover.jpg', required: false })
  @IsOptional()
  @IsString()
  coverUrl?: string;

  @ApiProperty({ description: 'The URL of the book content', example: 'http://example.com/updated-content.pdf', required: false })
  @IsOptional()
  @IsString()
  contentUrl?: string;

  @ApiProperty({ description: 'The status of the book', example: 'APPROVED', enum: ['PENDING', 'APPROVED'], required: false })
  @IsOptional()
  @IsEnum(['PENDING', 'APPROVED'])
  status?: 'PENDING' | 'APPROVED';
}