import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { userProfile } from 'src/auth/decorators/user.decorator';
import { userDto } from 'src/auth/dto/user.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@UseGuards(ThrottlerGuard)
export class UserController {
    // Constructor
    constructor() {}

    // Get User Profile
    @Get('profile')
    // Swagger API documentation
    @ApiOperation({ summary: 'Get User Profile' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User profile' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    async getUser(@userProfile() user : userDto){
        return user;
    }
}
