import { Router } from "express";
import {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
    exportCSV
} from "../controllers/leadController";

import { authMiddleware } from "../middlewares/authMiddleware";
import { requireRole } from "../middlewares/roleMiddleware";

const router = Router();

// 🔒 protect all routes
router.use(authMiddleware);

router.get("/export", requireRole("Admin"), exportCSV);
router.get("/", getLeads);
router.get("/:id", getLeadById);
router.post("/", createLead);
router.put("/:id", updateLead);
router.delete("/:id", requireRole("Admin"), deleteLead);


export default router;