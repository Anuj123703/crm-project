import mongoose, { Schema, Document } from "mongoose";

export type Role = "Admin" | "Sales User";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: Role;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "Sales User"], required: true },
});

export const User = mongoose.model<IUser>("User", userSchema);