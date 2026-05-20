import mongoose, { Schema, Document } from "mongoose";

export type Status = "New" | "Contacted" | "Qualified" | "Lost";
export type Source = "Website" | "Instagram" | "Referral";

export interface ILead extends Document {
    name: string;
    email: string;
    status: Status;
    source: Source;
    createdAt: Date;
}

const leadSchema = new Schema<ILead>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        status: { type: String, enum: ["New", "Contacted", "Qualified", "Lost"], default: "New" },
        source: { type: String, enum: ["Website", "Instagram", "Referral"], required: true }
    },
    { timestamps: true }
);

export const Lead = mongoose.model<ILead>("Lead", leadSchema);