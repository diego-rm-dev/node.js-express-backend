import { IUser } from "../interfaces/user.interface.js"
import { userModel } from "../models/user.model.js"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"
import Bcrypt from "bcrypt"
import { AppError } from "../interfaces/errors/appError.interface.js"

configDotenv()

const SECRET_KEY = process.env.SECRET_KEY as string

/** 🔹 Obtener todos los usuarios */
export const getUsersService = async (): Promise<IUser[]> => {
    try {
        const users = await userModel.find() as IUser[]
        if (!users || users.length === 0) {
            throw new AppError("Users not found", 404)
        }
        return users
    } catch (err) {
        throw new AppError(`Error finding users: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Obtener usuario por ID */
export const getUserByPkService = async (id: string): Promise<IUser> => {
    try {
        const user = await userModel.findById(id) as IUser | null
        if (!user) {
            throw new AppError("User not found", 404)
        }
        return user
    } catch (err) {
        throw new AppError(`Error finding user: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Guardar un nuevo usuario */
export const saveUserService = async (userSave: IUser): Promise<IUser> => {
    try {
        // Hashear la contraseña antes de guardar
        userSave.password = await Bcrypt.hash(userSave.password, 12)

        const savedUser = await userModel.create(userSave) as IUser
        return savedUser
    } catch (err) {
        throw new AppError(`Error saving user: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Actualizar usuario */
export const updateUserService = async (id: string, userSave: IUser): Promise<IUser> => {
    try {
        if (userSave.password) {
            userSave.password = await Bcrypt.hash(userSave.password, 12)
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, userSave, { new: true }) as IUser | null
        if (!updatedUser) {
            throw new AppError("User not found", 404)
        }
        return updatedUser
    } catch (err) {
        throw new AppError(`Error updating user: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Eliminar usuario */
export const deleteUserService = async (id: string): Promise<IUser> => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(id) as IUser | null
        if (!deletedUser) {
            throw new AppError("User not found", 404)
        }
        return deletedUser
    } catch (err) {
        throw new AppError(`Error deleting user: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Login de usuario */
export const loginService = async (email: string, password: string): Promise<string> => {
    try {
        const user = await userModel.findOne({ email }) as IUser | null
        if (!user) {
            throw new AppError("User not found", 404)
        }

        const isMatch = await Bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new AppError("Invalid credentials", 401)
        }

        // Crear payload con la información del usuario
        const payload = {
            email: user.email,
            role: user.role
        }

        // Generar JWT con expiración de 1 hora
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
        return token
    } catch (err) {
        throw new AppError(`Error logging in: ${(err as Error).message}`, 500)
    }
}
