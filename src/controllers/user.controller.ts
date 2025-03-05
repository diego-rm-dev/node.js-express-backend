import { NextFunction, Request, Response } from "express";
import { getUsersService, getUserByPkService, updateUserService, saveUserService, deleteUserService } from "../services/user.service.js";
import { IUser } from "../interfaces/user.interface.js";

const getUsersController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const users: IUser[] = await getUsersService();
        res.json(users);
    } catch (err: unknown) {
        next(err);
    }
}

const getUserByPkController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await getUserByPkService(req.params.id) as IUser | null;
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.json(user);
    } catch (err: unknown) {
        next(err);
    }
}

const saveUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await saveUserService(req.body) as IUser;
        res.json(user);
    } catch (err: unknown) {
        next(err);
    }
}

const updateUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await updateUserService(req.params.id, req.body) as IUser;
        res.json(user);
    } catch (err: unknown) {
        next(err);
    }
}

const deleteUserController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const user = await deleteUserService(req.params.id) as IUser;
        res.json(user);
    } catch (err: unknown) {
        next(err);
    }
}

export const userController = {
    getUsersController,
    getUserByPkController,
    saveUserController,
    updateUserController,
    deleteUserController
}
