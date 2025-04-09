import { Schema, model } from 'mongoose';


export enum RequestStatusEnum {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
}

export const RequestSchema = new Schema({
    bookId: { type: String, required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    userId: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: Object.values(RequestStatusEnum), required: true },
    reason: { type: String, required: false },
});