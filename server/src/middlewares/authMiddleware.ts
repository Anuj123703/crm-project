import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: { id: string; role: string };
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
            id: string;
            role: string;
        };

        req.user = decoded;
        console.log("AUTH HEADER:", req.headers.authorization);

        console.log("JWT_SECRET:", process.env.JWT_SECRET);
        console.log("DECODED USER:", req.user);

        next();
    } catch (err) {
        console.log("JWT ERROR:", err);
        res.status(401).json({ message: "Invalid Token" });
    }
};