import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class userDto {
    @ApiProperty({ description: 'The id of the user' })
    @IsString()
    id: string;

    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    name: string;

    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty({ description: 'The role of the user' })
    @IsString()
    role: string;

    @ApiProperty({ description: 'The books of the user' })
    @IsString()
    @IsOptional()
    books: string[];

    @ApiProperty({ description: 'The Profile Image Url of the user' })
    @IsString()
    profileImageUrl: string;
}