import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserUpdateDto{
    @ApiProperty({ description: 'The name of the user' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ description: 'The role of the user' })
    @IsString()
    @IsOptional()
    role?: string;

    @ApiProperty({ description: 'The books of the user' })
    @IsString()
    @IsOptional()
    books?: string[];
}