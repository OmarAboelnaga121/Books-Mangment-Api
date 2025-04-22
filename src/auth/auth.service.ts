import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/mongo-db/user.interface';
import * as argon from 'argon2';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class AuthService {
    // Constructor
    constructor(
        @Inject('User') private readonly userModel: Model<IUser>,
        private jwtService : JwtService,
        private cloudnaryService : CloudinaryService
    ) {}

    // Register User
    async registerUser(user: registerDto, file: Express.Multer.File): Promise<registerDto> {
        // Check if user mail already exists
        const checkUser = await this.userModel.findOne({ email: user.email });
        
        if (checkUser) {
            throw new BadRequestException('User already exists');
        }

        // Hash password
        const hashPassword = await argon.hash(user.password);
        user.password = hashPassword;

        // Upload image to cloudinary
        const uploadImage = await this.cloudnaryService.uploadFile(file);
        if (!uploadImage) {
            throw new BadRequestException('Image upload failed');
        }
        user.profileImageUrl = uploadImage.secure_url;

        // Create new user
        const newUser = new this.userModel(user);
        await newUser.save();
        return newUser;
    }

    // Login to registed user
    async loginUser(user: loginDto): Promise<string> {
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
        
        // Genrate JWT Token
        const token = this.tokenGenrator(checkUser);

        return token;
    }

    // JWT Token Generation
    private tokenGenrator(user: any) {
        const payload = { email: user.email, sub: user.id };
                
        return this.jwtService.sign(payload);
    }

}
