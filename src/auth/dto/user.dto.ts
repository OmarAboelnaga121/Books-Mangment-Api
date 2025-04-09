import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class user {
    @IsString()
    name: string;

    @IsString()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @IsString()
    @IsStrongPassword()
    password: string;

    @IsString()
    role: string;

    @IsString()
    @IsOptional()
    books: string[];
}