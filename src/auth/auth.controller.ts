import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ThrottlerGuard } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { userDto } from './dto/user.dto';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
    @ApiBody({ type: userDto })
    async register(@Body() registerDto: userDto) {
        return this.authService.registerUser(registerDto);
    }

}
