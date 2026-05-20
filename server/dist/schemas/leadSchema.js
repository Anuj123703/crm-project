"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leadSchema = void 0;
const zod_1 = require("zod");
exports.leadSchema = zod_1.z.object({
    name: zod_1.z.string().min(2),
    email: zod_1.z.string().email(),
    status: zod_1.z.enum(["New", "Contacted", "Qualified", "Lost"]),
    source: zod_1.z.enum(["Website", "Instagram", "Referral"]),
    assignedTo: zod_1.z.string().optional()
});
