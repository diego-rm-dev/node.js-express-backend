import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { configDotenv } from "dotenv"

configDotenv()

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
    const header = req.headers.authorization

    // Validar que el header de autorización existe
    if (!header) {
        res.status(401).json({ message: "Authorization header is missing" })
        return
    }

    // Validar que el formato del token sea correcto (Bearer <token>)
    const parts = header.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        res.status(401).json({ message: "Invalid token format" })
        return
    }

    const token = parts[1]

    jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: "Invalid token" })
            return
        }

        (req as any).user = decoded

        next()
    })
}
