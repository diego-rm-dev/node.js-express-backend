import mongoose from 'mongoose';

const MONGO_URI: string = 'mongodb://127.0.0.1:27017/productnode';


mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error: Error) => {
        console.error('Error connecting to MongoDB:', error);
    });

