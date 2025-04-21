import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { IUser } from 'src/mongo-db/user.interface';
import { UserUpdateDto } from './dto/userUpdate.dto';

@Injectable()
export class UserService {
    // constructor
    constructor(@Inject('User') private userModel: Model<IUser>) {}

    // Update User Data
    async editUser(userId: string, newData: UserUpdateDto){
        // Check if user exists
        const checkUser = await this.userModel.findById(userId);
        if (!checkUser) {
            throw new BadRequestException('User not found');
        }

        // Update user data
        const updatedUser = await this.userModel.findByIdAndUpdate(userId, newData, { new: true });
        return updatedUser;
    }

}
