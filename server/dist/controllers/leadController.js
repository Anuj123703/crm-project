"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportCSV = exports.deleteLead = exports.updateLead = exports.getLeadById = exports.getLeads = exports.createLead = void 0;
const Lead_1 = require("../models/Lead");
const leadSchema_1 = require("../schemas/leadSchema");
const json2csv_1 = require("json2csv");
/**
 * CREATE LEAD
 */
const createLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = leadSchema_1.leadSchema.parse(req.body);
    const lead = yield Lead_1.Lead.create(data);
    res.status(201).json(lead);
});
exports.createLead = createLead;
/**
 * GET ALL LEADS (FILTER + PAGINATION + SEARCH)
 */
const getLeads = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page = "1", status, source, search, sort } = req.query;
    const query = {};
    if (status)
        query.status = status;
    if (source)
        query.source = source;
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ];
    }
    const limit = 10;
    const skip = (Number(page) - 1) * limit;
    const total = yield Lead_1.Lead.countDocuments(query);
    const leads = yield Lead_1.Lead.find(query)
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
});
exports.getLeads = getLeads;
/**
 * GET SINGLE LEAD (❗ MISSING FEATURE ADDED)
 */
const getLeadById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lead = yield Lead_1.Lead.findById(req.params.id);
    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
});
exports.getLeadById = getLeadById;
/**
 * UPDATE LEAD
 */
const updateLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = leadSchema_1.leadSchema.parse(req.body);
    const lead = yield Lead_1.Lead.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }
    res.json(lead);
});
exports.updateLead = updateLead;
/**
 * DELETE LEAD
 */
const deleteLead = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lead = yield Lead_1.Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
        return res.status(404).json({ message: "Lead not found" });
    }
    res.json({ message: "Lead Deleted" });
});
exports.deleteLead = deleteLead;
/**
 * EXPORT CSV (ADMIN ONLY)
 */
const exportCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const leads = yield Lead_1.Lead.find();
    const parser = new json2csv_1.Parser();
    const csv = parser.parse(leads);
    res.header("Content-Type", "text/csv");
    res.attachment("leads.csv");
    res.send(csv);
});
exports.exportCSV = exportCSV;
