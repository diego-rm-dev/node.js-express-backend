import { IProduct } from "../interfaces/product.interface.js";
import { productModel } from "../models/product.model.js";

export const getProductsService = async (): Promise<IProduct[]> => {
    try {
        const products = await productModel.find() as IProduct[] | null;
        if (!products) {
            throw new Error(`Products not found (404)`)
        }
        return products;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error saving product: ${err.message}`);
        }
        throw new Error("Unknown error finding products");
    }
};

export const getProductByPkService = async (id: string): Promise<IProduct | null> => {
    try {
        // Utiliza await para esperar a que se resuelva la promesa
        const product = await productModel.findById(id) as IProduct | null;
        if (!product) {
            throw new Error(`Product not found (404)`)
        }
        return product;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error saving product: ${err.message}`);
        }
        throw new Error("Unknown error finding product");
    }
};

export const saveProductService = async (productSave: IProduct): Promise<IProduct> => {
    try {
        const savedProduct = await productModel.create(productSave) as IProduct;
        return savedProduct;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error saving product: ${err.message}`);
        }
        throw new Error("Unknown error saving product");
    }
}

export const updateProductService = async (id: string, productSave: IProduct): Promise<IProduct> => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(id, productSave, { new: true }) as IProduct | null;
        if (!updatedProduct) {
            throw new Error("Product not found");
        }
        return updatedProduct;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error updating product: ${err.message}`);
        }
        throw new Error("Unknown error updating product");
    }
};

export const deleteProductService = async (id: string): Promise<IProduct> => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(id) as IProduct | null;
        if (!deletedProduct) {
            throw new Error("Product not found");
        }
        return deletedProduct;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Error deleting product: ${err.message}`);
        }
        throw new Error("Unknown error deleting product");
    }
};

