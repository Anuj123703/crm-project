"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const leadController_1 = require("../controllers/leadController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const roleMiddleware_1 = require("../middlewares/roleMiddleware");
const router = (0, express_1.Router)();
// 🔒 protect all routes
router.use(authMiddleware_1.authMiddleware);
router.get("/export", (0, roleMiddleware_1.requireRole)("Admin"), leadController_1.exportCSV);
router.get("/", leadController_1.getLeads);
router.get("/:id", leadController_1.getLeadById);
router.post("/", leadController_1.createLead);
router.put("/:id", leadController_1.updateLead);
router.delete("/:id", (0, roleMiddleware_1.requireRole)("Admin"), leadController_1.deleteLead);
exports.default = router;
