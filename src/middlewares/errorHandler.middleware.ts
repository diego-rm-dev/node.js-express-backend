import { Request, Response, NextFunction } from "express"
import { AppError } from "../interfaces/errors/appError.interface.js"

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${err.message}`)

    // Definir códigos de estado específicos para diferentes errores
    const statusCode = err.status && Number.isInteger(err.status) ? err.status : 500
    let message = err.message || "Internal Server Error"

    // Manejo de errores específicos
    if (err.name === "ValidationError") {
        message = "Invalid request data"
    } else if (err.name === "JsonWebTokenError") {
        message = "Invalid token"
    } else if (err.name === "TokenExpiredError") {
        message = "Token expired"
    } else if (err.name === "SyntaxError") {
        message = "Malformed JSON"
    }

    // Enviar respuesta JSON con el error
    res.status(statusCode).json({
        error: message,
        status: statusCode,
        path: req.originalUrl,
        method: req.method,
        timestamp: new Date().toISOString(),
    })
}
