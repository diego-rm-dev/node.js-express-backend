import express, { Application, Request, Response } from 'express';
import Dotenv from 'dotenv';
import { verifyToken } from './middlewares/jwtVerify.middleware.js';
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { userRouter } from './routes/user.routes.js';
import { productRouter } from './routes/product.routes.js';
import { options, swaggerJsdoc, swaggerUi } from './config/swagger/openapi.config.js'
import './config/database/connection.ts';

Dotenv.config();

const app: Application = express();
const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json());
app.use(errorHandler);

const specs = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.use('/products', verifyToken, productRouter);
app.use('/users', userRouter);
app.get('/hi', (req: Request, res: Response) => {
    res.json({ message: "Hi from server!" })
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});
