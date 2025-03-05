import { NextFunction, Request, Response, Router } from "express";
import { deleteProductController, getProductByPkController, getProductsController, saveProductController, updateProductController } from "../controllers/product.controller.js";

export const productRouter: Router = Router();

productRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await getProductsController(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await getProductByPkController(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await saveProductController(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateProductController(req, res, next);
    } catch (error) {
        next(error);
    }
});

productRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await deleteProductController(req, res, next);
    } catch (error) {
        next(error);
    }
});
