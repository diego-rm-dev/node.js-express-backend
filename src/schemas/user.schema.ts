import { Schema } from "mongoose";

export const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxlength: 100,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100,
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN', 'USER'],
        default: 'USER'
    },
    active: {
        type: Boolean,
        default: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})