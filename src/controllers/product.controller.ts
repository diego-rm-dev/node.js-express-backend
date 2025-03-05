import { Request, Response, NextFunction } from "express";
import { getProductsService, getProductByPkService, saveProductService, updateProductService, deleteProductService } from "../services/product.service.js";
import { IProduct } from "../interfaces/product.interface.js";

export const getProductsController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const foundProducts: IProduct[] = await getProductsService();
        return res.status(200).json({
            message: "Products found",
            products: foundProducts,
        });
    } catch (error: unknown) {
        next(error);
        return res;
    }
};

export const getProductByPkController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { id } = req.params;
        const foundProduct: IProduct | null = await getProductByPkService(id);
        if (!foundProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        return res.status(200).json({
            message: "Product found",
            product: foundProduct
        });
    } catch (error: unknown) {
        next(error);
        return res;
    }
};

export const saveProductController = async (req: Request<{}, {}, IProduct>, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const productData: IProduct = req.body;
        const savedProduct: IProduct = await saveProductService(productData);
        return res.status(201).json({
            message: "Product saved",
            product: savedProduct
        });
    } catch (error: unknown) {
        next(error);
        return res;
    }
};

export const updateProductController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { id } = req.params;
        const productData: IProduct = req.body;
        const updatedProduct: IProduct = await updateProductService(id, productData);
        return res.status(200).json({
            message: "Product updated",
            product: updatedProduct
        });
    } catch (error: unknown) {
        next(error);
        return res;
    }
};

export const deleteProductController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedProduct: IProduct = await deleteProductService(id);
        return res.status(200).json({
            message: "Product deleted",
            product: deletedProduct
        });
    } catch (error: unknown) {
        next(error);
        return res;
    }
};
