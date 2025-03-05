import mongoose, { Model } from "mongoose";
import { productSchema } from "../schemas/product.schema.js";
import { IProduct } from "../interfaces/product.interface.js";

export const productModel: Model<IProduct> = mongoose.model<IProduct>('Product', productSchema)