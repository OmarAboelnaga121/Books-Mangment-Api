import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { IUser } from 'src/mongo-db/user.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('User') private readonly userModel: Model<IUser>,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET, 
        });
    }

    async validate(payload: any) {
        const user = await this.userModel.findById(payload.sub);

        if (!user) {
            console.log(user);
            throw new UnauthorizedException('User not found');
        }        

        return user;
    }
}