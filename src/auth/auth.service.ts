import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/mongo-db/user.interface';
import { userDto } from './dto/user.dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    // Constructor
    constructor(
        @Inject('User') private readonly userModel: Model<IUser>,
    ) {}

    // Register User
    async registerUser(user: userDto): Promise<userDto> {
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
    // Logout user
}
