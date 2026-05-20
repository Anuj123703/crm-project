import { Response, NextFunction } from "express";
import { AuthRequest } from "./authMiddleware";

export const requireRole = (role: "Admin") => {
    return (req: AuthRequest, res: Response, next: NextFunction): void => {
        if (req.user?.role !== role) {
            res.status(403).json({ message: "Forbidden" });
            return;
        }
        next();
    };
};