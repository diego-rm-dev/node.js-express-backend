import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"

configDotenv()

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization

    if (!header) {
        res.status(401).json({ message: "Authorization header is missing" })
        return
    }
    const parts = header.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        res.status(401).json({ message: "Invalid token format" })
        return
    }

    const token = parts[1]

    jwt.verify(token, process.env.SECRET_KEY as string, (err) => {
        if (err) {
            res.status(401).json({ message: "Invalid token" })
            return
        }
        next()
    })
}
