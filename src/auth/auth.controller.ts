import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
@UseGuards(ThrottlerGuard)

export class AuthController {
    // Constructor
    constructor(private authService : AuthService) {}

    // Register User
    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiResponse({ status: 201, description: 'User successfully registered.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: registerDto })
    @UseInterceptors(FileInterceptor('file'))

    async register(@Body() registerDto: registerDto, @UploadedFile() file: Express.Multer.File) {
        return this.authService.registerUser(registerDto, file);
    }

    // Login User
    @Post('login')
    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 201, description: 'User Successfully Logged In.' })
    @ApiResponse({ status: 400, description: 'Bad Request.' })
    @ApiBody({ type: loginDto })
    async login(@Body() loginData: loginDto) {
        return this.authService.loginUser(loginData);
    }

}
