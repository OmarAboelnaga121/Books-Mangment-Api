import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/mongo-db/user.interface';
import { userDto } from './dto/user.dto';
import * as argon from 'argon2';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    // Constructor
    constructor(
        @Inject('User') private readonly userModel: Model<IUser>,
    ) {}

    // Register User
    async registerUser(user: registerDto): Promise<registerDto> {
        // Check if user mail already exists
        const checkUser = await this.userModel.findOne({ email: user.email });
        
        if (checkUser) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hashPassword = await argon.hash(user.password);
        user.password = hashPassword;

        // Create new user
        const newUser = new this.userModel(user);
        await newUser.save();
        return newUser;
    }

    // Login to registed user
    async loginUser(user: loginDto): Promise<loginDto> {
        // Check if user mail already exists
        const checkUser = await this.userModel.findOne({ email: user.email });
        
        if (!checkUser) {
            throw new BadRequestException('Invalid Credentials');
        }

        // Check password
        const passwordMatch = await argon.verify(checkUser.password, user.password);
        
        if (!passwordMatch) {
            throw new BadRequestException('Invalid Credentials');
        }

        return checkUser;
    }
    // Logout user
    // JWT Token Generation
}
