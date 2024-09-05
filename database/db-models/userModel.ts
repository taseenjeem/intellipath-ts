import { IUserInfo } from "@/types";
import mongoose, { model, Model, Schema } from "mongoose";

const UserSchema: Schema<IUserInfo> = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
    gender: { type: String, default: null },
    birthDate: { type: Date, default: null },
    country: { type: String, default: null },
    email: { type: String, required: true, unique: true },
    phone: { type: String, default: null },
    address: { type: String, default: null },
    role: { type: String, enum: ["learner", "instructor"], required: true },
    courses: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Course", default: [] },
    ],
    expertise: { type: [String], default: [] },
    biography: { type: String, default: null },
    education: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        yearOfCompletion: { type: String, required: true },
      },
    ],
    teachingExperience: { type: Number, default: null },
    certifications: [
      {
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        dateOfIssue: { type: Date, required: true },
      },
    ],
    socialLinks: {
      linkedin: { type: String, default: null },
      twitter: { type: String, default: null },
      website: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUserInfo> =
  mongoose.models.users || model<IUserInfo>("users", UserSchema);

export default User;
