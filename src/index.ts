import express, { Application, Request, Response } from 'express';
import './config/database/connection.ts';
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { productRouter } from './routes/product.routes.js';
import Dotenv from 'dotenv';
import { userRouter } from './routes/user.routes.js';
Dotenv.config();


const app: Application = express();
app.use(express.json());
app.use(errorHandler);
app.use('/product', productRouter);
app.use('/user', userRouter);

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.get('/hi', (req: Request, res: Response) => {
    res.json({ message: "Hi from server!" })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
