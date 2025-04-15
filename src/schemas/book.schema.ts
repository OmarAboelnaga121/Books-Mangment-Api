import { Schema, model } from 'mongoose';

export const BookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverUrl: { type: String, required: false },
    contentUrl: { type: String, required: false },
    status: { 
        type: String, 
        enum: ['PENDING', 'APPROVED'], 
        required: true 
    },
    sellerId: { type: String, required: true },
    },
    {
        timestamps: true, 
    }
);