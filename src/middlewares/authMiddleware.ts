import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// faz o intermédio entre a requisição e o controller
export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    // pega o token que foi enviado no header da requisição
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Token não fornecido." });
    }

    const [, token] = authHeader.split(" ");

    // verifica se o token é valido, se for, ele manda a requisição ao controller
    try {
        const secret = process.env.JWT || "fallback_secret";
        const decoded = jwt.verify(token, secret);

        (req as any).userId = (decoded as any).id;

        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
}
