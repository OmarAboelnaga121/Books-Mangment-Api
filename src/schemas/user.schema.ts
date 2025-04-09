import { Schema, model } from 'mongoose';

export const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'seller'],
            default: 'user',
        },
        books:{
            type: [String],
            default: [],
        }
        
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt fields
    }
);