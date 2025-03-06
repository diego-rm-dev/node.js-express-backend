import express, { Application, Request, Response } from 'express';
import Dotenv from 'dotenv';
import { verifyToken } from './middlewares/jwtVerify.middleware.js';
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { userRouter } from './routes/user.routes.js';
import { productRouter } from './routes/product.routes.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import './config/database/connection.ts';

Dotenv.config();

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "LogRocket Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "LogRocket",
                url: "https://logrocket.com",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT", // Indica que el formato es JWT
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ["./src/routes/*.ts"]
};

//swagger config

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
