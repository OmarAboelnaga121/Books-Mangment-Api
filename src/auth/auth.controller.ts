import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { userDto } from './dto/user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

@Controller('auth')
// @UseGuards(AuthGuard('jwt'))
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
    async register(@Body() registerDto: registerDto) {
        return this.authService.registerUser(registerDto);
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
