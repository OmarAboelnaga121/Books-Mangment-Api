import { Schema, model } from 'mongoose';

export const BookSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    coverUrl: { type: String, required: false },
    contentUrl: { type: String, required: false },
    status: { 
        type: String, 
        enum: ['PENDING', 'APPROVED', 'REJECTED'], 
        required: true 
    },
    sellerId: { type: String, required: true },
    seller: { type: Schema.Types.Mixed, required: true },
    request: { type: Schema.Types.Mixed, required: false },
    },
    {
        timestamps: true, 
    }
);