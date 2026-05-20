import { Response } from "express";
import { Lead } from "../models/Lead";
import { AuthRequest } from "../middlewares/authMiddleware";
import { leadSchema } from "../schemas/leadSchema";
import { Parser } from "json2csv";

/**
 * CREATE LEAD
 */
export const createLead = async (req: AuthRequest, res: Response) => {
    const data = leadSchema.parse(req.body);

    const lead = await Lead.create(data);

    res.status(201).json(lead);
};

/**
 * GET ALL LEADS (FILTER + PAGINATION + SEARCH)
 */
export const getLeads = async (req: AuthRequest, res: Response) => {
    const { page = "1", status, source, search, sort } = req.query;

    const query: any = {};

    if (status) query.status = status;
    if (source) query.source = source;

    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }

    const limit = 10;
    const skip = (Number(page) - 1) * limit;

    const total = await Lead.countDocuments(query);

    const leads = await Lead.find(query)
        .sort(sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 })
        .skip(skip)
        .limit(limit);

    res.json({
        leads,
        currentPage: Number(page),
        totalPages: Math.ceil(total / limit),
        totalLeads: total,
        hasNextPage: skip + limit < total
    });
};

/**
 * GET SINGLE LEAD (❗ MISSING FEATURE ADDED)
 */
export const getLeadById = async (req: AuthRequest, res: Response) => {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
};

/**
 * UPDATE LEAD
 */
export const updateLead = async (req: AuthRequest, res: Response) => {
    const data = leadSchema.parse(req.body);

    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        data,
        { new: true }
    );

    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }

    res.json(lead);
};

/**
 * DELETE LEAD
 */
export const deleteLead = async (req: AuthRequest, res: Response) => {
    const lead = await Lead.findByIdAndDelete(req.params.id);

    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead Deleted" });
};

/**
 * EXPORT CSV (ADMIN ONLY)
 */
export const exportCSV = async (req: AuthRequest, res: Response) => {
    const leads = await Lead.find();

    const parser = new Parser();
    const csv = parser.parse(leads);

    res.header("Content-Type", "text/csv");
    res.attachment("leads.csv");
    res.send(csv);
};