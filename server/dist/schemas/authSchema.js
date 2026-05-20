"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().min(2, "Name required"),
    email: zod_1.z.string().email("Invalid email"),
    role: zod_1.z.enum(["Admin", "Sales User"]),
    password: zod_1.z.string().min(6, "Password must be 6+ chars")
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email"),
    password: zod_1.z.string().min(6, "Password must be 6+ chars")
});
