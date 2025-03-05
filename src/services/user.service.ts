import { IUser } from "../interfaces/user.interface.js";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { configDotenv } from "dotenv";

configDotenv();

const SECRET_KEY = process.env.SECRET_KEY as string;

export const getUsersService = async (): Promise<IUser[]> => {
    try {
        const users = await userModel.find() as IUser[] | null;
        if (!users) {
            throw new Error(`Users not found (404)`)
        }
        return users;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error saving user: ${err.message}`);
        }
        throw new Error("Unknown error finding users");
    }
}

export const getUserByPkService = async (id: string): Promise<IUser | null> => {
    try {
        const user = await userModel.findById(id) as IUser | null;
        if (!user) {
            throw new Error(`User not found (404)`)
        }
        return user;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error saving user: ${err.message}`);
        }
        throw new Error("Unknown error finding user");
    }
}

export const saveUserService = async (userSave: IUser): Promise<IUser> => {
    try {
        const savedUser = await userModel.create(userSave) as IUser;
        return savedUser;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error saving user: ${err.message}`);
        }
        throw new Error("Unknown error saving user");
    }
}

export const updateUserService = async (id: string, userSave: IUser): Promise<IUser> => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate
            (id, userSave, { new: true }) as IUser | null;
        if (!updatedUser) {
            throw new Error("User not found");
        }
        return updatedUser;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error updating user: ${err.message}`);
        }
        throw new Error("Unknown error updating user");
    }
}

export const deleteUserService = async (id: string): Promise<IUser> => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(id) as IUser | null;
        if (!deletedUser) {
            throw new Error("User not found");
        }
        return deletedUser;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error deleting user: ${err.message}`);
        }
        throw new Error("Unknown error deleting user");
    }
}

export const loginService = async (email: string, password: string): Promise<string | null> => {
    try {
        const user = await userModel.findOne({ email, password }) as IUser | null
        if (!user) {
            throw new Error("User not found")
        }

        // Crear payload con la información que quieres incluir en el token
        const payload = {
            email: user.email,
            role: user.role,
        }

        // Generar JWT (expira en 1 hora)
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })

        return token
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error logging in: ${err.message}`)
        }
        throw new Error("Unknown error logging in")
    }
}