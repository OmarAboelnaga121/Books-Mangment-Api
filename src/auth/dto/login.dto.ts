import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class loginDto {
    @ApiProperty({ description: 'The email of the user' })
    @IsString()
    @IsEmail({}, { message: 'Invalid email' })
    email: string;

    @ApiProperty({ description: 'The password of the user' })
    @IsString()
    @IsStrongPassword()
    password: string;
}