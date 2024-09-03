import { ILearnerInfo } from "@/types";
import mongoose, { Schema, Model, model } from "mongoose";

const userSchema: Schema<ILearnerInfo> = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, required: false, default: null },
    gender: { type: String, required: false, default: null },
    birthDate: { type: String, required: false, default: null },
    country: { type: String, required: false, default: null },
    email: { type: String, required: true },
    phone: { type: String, required: false, default: null },
    address: { type: String, required: false, default: null },
    role: { type: String, required: true, default: "learner" },
    courses: { type: [String], default: [] },
  },
  { timestamps: true }
);

const User: Model<ILearnerInfo> =
  mongoose.models.users || model<ILearnerInfo>("users", userSchema);

export default User;
