import mongoose, { Model } from "mongoose";
import { IUser } from "../interfaces/user.interface.js";
import { userSchema } from "../schemas/user.schema.js";

export const userModel: Model<IUser> = mongoose.model<IUser>('User', userSchema);