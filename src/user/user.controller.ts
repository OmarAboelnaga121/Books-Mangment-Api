import { Body, Controller, Get, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ThrottlerGuard } from '@nestjs/throttler';
import { userProfile } from 'src/auth/decorators/user.decorator';
import { userDto } from 'src/auth/dto/user.dto';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Controller('user')
@UseGuards(AuthGuard('jwt'))
@UseGuards(ThrottlerGuard)
export class UserController {
    // Constructor
    constructor(private userService : UserService) {}

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

    // Update User Profile
    @Put('profile')
    // Swagger API documentation
    @ApiOperation({ summary: 'Update User Profile' })
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'User profile' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 500, description: 'Internal Server Error' })
    @ApiBody({ type: UserUpdateDto })
    async updateUser(@userProfile() user : userDto, @Body() userData: UserUpdateDto){
        return this.userService.editUser(user.id, userData);
    }
}
