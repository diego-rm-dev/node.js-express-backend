import { NextFunction, Request, Response } from "express"
import {
    getUsersService,
    getUserByPkService,
    updateUserService,
    saveUserService,
    deleteUserService,
    loginService
} from "../services/user.service.js"
import { IUser } from "../interfaces/user.interface.js"

/** 🔹 Obtener todos los usuarios */
const getUsersController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users: IUser[] = await getUsersService()
        res.status(200).json({ success: true, data: users })
    } catch (err) {
        next(err)
    }
}

/** 🔹 Obtener usuario por ID */
const getUserByPkController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUserByPkService(req.params.id)
        res.status(200).json({ success: true, data: user })
    } catch (err) {
        next(err)
    }
}

/** 🔹 Crear un nuevo usuario */
const saveUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await saveUserService(req.body)
        res.status(201).json({ success: true, message: "User created successfully", data: user })
    } catch (err) {
        next(err)
    }
}

/** 🔹 Actualizar usuario */
const updateUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await updateUserService(req.params.id, req.body)
        res.status(200).json({ success: true, message: "User updated successfully", data: user })
    } catch (err) {
        next(err)
    }
}

/** 🔹 Eliminar usuario */
const deleteUserController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        await deleteUserService(req.params.id)
        res.status(200).json({ success: true, message: "User deleted successfully" })
    } catch (err) {
        next(err)
    }
}

/** 🔹 Login de usuario */
const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        const token = await loginService(email, password)
        res.status(200).json({ success: true, token })
    } catch (err) {
        next(err)
    }
}

export const userController = {
    getUsersController,
    getUserByPkController,
    saveUserController,
    updateUserController,
    deleteUserController,
    loginController
}
