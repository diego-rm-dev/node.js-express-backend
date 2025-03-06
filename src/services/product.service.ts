import { IProduct } from "../interfaces/product.interface.js"
import { productModel } from "../models/product.model.js"
import { AppError } from "../interfaces/errors/appError.interface.js"

/** 🔹 Obtener todos los productos */
export const getProductsService = async (): Promise<IProduct[]> => {
    try {
        const products = await productModel.find() as IProduct[]
        if (!products || products.length === 0) {
            throw new AppError("Products not found", 404)
        }
        return products
    } catch (err) {
        throw new AppError(`Error finding products: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Obtener un producto por ID */
export const getProductByPkService = async (id: string): Promise<IProduct> => {
    try {
        const product = await productModel.findById(id) as IProduct | null
        if (!product) {
            throw new AppError("Product not found", 404)
        }
        return product
    } catch (err) {
        throw new AppError(`Error finding product: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Guardar un nuevo producto */
export const saveProductService = async (productSave: IProduct): Promise<IProduct> => {
    try {
        const savedProduct = await productModel.create(productSave) as IProduct
        return savedProduct
    } catch (err) {
        throw new AppError(`Error saving product: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Actualizar un producto */
export const updateProductService = async (id: string, productSave: IProduct): Promise<IProduct> => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, productSave, { new: true }) as IProduct | null
        if (!updatedProduct) {
            throw new AppError("Product not found", 404)
        }
        return updatedProduct
    } catch (err) {
        throw new AppError(`Error updating product: ${(err as Error).message}`, 500)
    }
}

/** 🔹 Eliminar un producto */
export const deleteProductService = async (id: string): Promise<IProduct> => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id) as IProduct | null
        if (!deletedProduct) {
            throw new AppError("Product not found", 404)
        }
        return deletedProduct
    } catch (err) {
        throw new AppError(`Error deleting product: ${(err as Error).message}`, 500)
    }
}
