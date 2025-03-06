import { Request, Response, NextFunction } from "express"
import {
    getProductsService,
    getProductByPkService,
    saveProductService,
    updateProductService,
    deleteProductService
} from "../services/product.service.js"
import { IProduct } from "../interfaces/product.interface.js"

/** 🔹 Obtener todos los productos */
export const getProductsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const products: IProduct[] = await getProductsService()
        res.status(200).json({ success: true, message: "Products found", data: products })
    } catch (error) {
        next(error)
    }
}

/** 🔹 Obtener un producto por ID */
export const getProductByPkController = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const product: IProduct = await getProductByPkService(req.params.id)
        res.status(200).json({ success: true, message: "Product found", data: product })
    } catch (error) {
        next(error)
    }
}

/** 🔹 Guardar un nuevo producto */
export const saveProductController = async (req: Request<{}, {}, IProduct>, res: Response, next: NextFunction) => {
    try {
        const savedProduct: IProduct = await saveProductService(req.body)
        res.status(201).json({ success: true, message: "Product saved successfully", data: savedProduct })
    } catch (error) {
        next(error)
    }
}

/** 🔹 Actualizar un producto */
export const updateProductController = async (req: Request<{ id: string }, {}, IProduct>, res: Response, next: NextFunction) => {
    try {
        const updatedProduct: IProduct = await updateProductService(req.params.id, req.body)
        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct })
    } catch (error) {
        next(error)
    }
}

/** 🔹 Eliminar un producto */
export const deleteProductController = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        await deleteProductService(req.params.id)
        res.status(200).json({ success: true, message: "Product deleted successfully" })
    } catch (error) {
        next(error)
    }
}
