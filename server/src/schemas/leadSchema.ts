import { z } from "zod";

export const leadSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    status: z.enum(["New", "Contacted", "Qualified", "Lost"]),
    source: z.enum(["Website", "Instagram", "Referral"]),
    assignedTo: z.string().optional()
});