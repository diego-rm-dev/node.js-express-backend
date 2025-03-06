import { NextFunction, Request, Response, Router } from "express";
import { userController } from "../controllers/user.controller.js";

export const userRouter: Router = Router();



/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API para gestionar usuarios
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente.
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.getUsersController(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente.
 *       404:
 *         description: Usuario no encontrado.
 */
userRouter.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.getUserByPkController(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 */
userRouter.post('/', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.saveUserController(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Actualizar un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 */
userRouter.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.updateUserController(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por su ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 */
userRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.deleteUserController(req, res, next);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *     responses:
 *       200:
 *         description: Sesión iniciada correctamente.
 *       401:
 *         description: Credenciales incorrectas.
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await userController.loginController(req, res, next);
    } catch (error) {
        next(error);
    }
});