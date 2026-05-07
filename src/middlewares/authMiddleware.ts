import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "Erro ao autenticar usuário: Token não fornecido." });
    }

    const [, token] = authHeader.split(" ");

    try {
        const secret = process.env.JWT || "fallback_secret";
        const decoded = jwt.verify(token, secret);

        (req as any).userId = (decoded as any).id;

        return next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido ou expirado." });
    }
}
