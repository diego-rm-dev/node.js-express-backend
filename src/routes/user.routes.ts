import { NextFunction, Request, Response, Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter: Router = Router();

userRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.getUsersController(req, res, next);
    } catch (error) {
        next(error);
    }
});

userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.getUserByPkController(req, res, next);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.saveUserController(req, res, next);
    } catch (error) {
        next(error);
    }
});

userRouter.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.updateUserController(req, res, next);
    } catch (error) {
        next(error);
    }
});

userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.deleteUserController(req, res, next);
    } catch (error) {
        next(error);
    }
});

userRouter.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.loginController(req, res, next);
    } catch (error) {
        next(error);
    }
});