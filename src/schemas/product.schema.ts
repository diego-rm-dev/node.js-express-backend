import mongoose, { Schema } from "mongoose";

export const productSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        defaults: 100
    },
    quantity: {
        type: Number
    }
})