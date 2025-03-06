import { NextFunction, Request, Response, Router } from "express"
import {
    deleteProductController,
    getProductByPkController,
    getProductsController,
    saveProductController,
    updateProductController,
} from "../controllers/product.controller.js"

export const productRouter: Router = Router()

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API para gestionar productos
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - name
 *         - price
 *         - quantity
 *       properties:
 *         id:
 *           type: integer
 *           description: ID único del producto (autogenerado)
 *         name:
 *           type: string
 *           description: Nombre del producto
 *         price:
 *           type: number
 *           format: float
 *           description: Precio del producto
 *         quantity:
 *           type: integer
 *           description: Cantidad disponible en stock
 *       example:
 *         id: 1
 *         name: "Laptop"
 *         price: 1200.50
 *         quantity: 10
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Retorna una lista de todos los productos disponibles en la base de datos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Product"
 *       401:
 *         description: No autorizado. El token es requerido.
 */
productRouter.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await getProductsController(req, res, next)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por su ID
 *     description: Retorna un solo producto identificado por su ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Product"
 *       404:
 *         description: Producto no encontrado.
 *       401:
 *         description: No autorizado. El token es requerido.
 */
productRouter.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await getProductByPkController(req, res, next)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Agrega un nuevo producto a la base de datos.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *     responses:
 *       201:
 *         description: Producto creado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autorizado. El token es requerido.
 */
productRouter.post("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await saveProductController(req, res, next)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Actualizar un producto
 *     description: Modifica un producto existente en la base de datos por su ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/Product"
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *       404:
 *         description: Producto no encontrado.
 *       401:
 *         description: No autorizado. El token es requerido.
 */
productRouter.put("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await updateProductController(req, res, next)
    } catch (error) {
        next(error)
    }
})

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto de la base de datos por su ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente.
 *       404:
 *         description: Producto no encontrado.
 *       401:
 *         description: No autorizado. El token es requerido.
 */
productRouter.delete("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await deleteProductController(req, res, next)
    } catch (error) {
        next(error)
    }
})
