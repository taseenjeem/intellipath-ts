import { IUserInfo } from "@/types";
import mongoose, { model, Model, Schema } from "mongoose";

const UserSchema: Schema<IUserInfo> = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    authenticationMethod: {
      type: String,
      enum: ["credential", "google", "facebook"],
      required: true,
    },
    profileImageUrl: { type: String, default: null },
    gender: { type: String, default: null },
    birthDate: { type: Date, default: null },
    country: { type: String, default: null },
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
        degree: { type: String, default: null },
        institution: { type: String, default: null },
        location: { type: String, default: null },
        yearOfCompletion: { type: String, default: null },
      },
    ],
    teachingExperience: {
      totalExperience: { type: Number, default: null },
      details: [
        {
          institution: { type: String, default: null },
          platform: { type: String, default: null },
          period: { type: String, default: null },
        },
      ],
    },
    certifications: [
      {
        title: { type: String, default: null },
        issuer: { type: String, default: null },
        dateOfIssue: { type: String, default: null },
        url: { type: String, default: null },
      },
    ],
    socialLinks: {
      linkedin: { type: String, default: null },
      twitter: { type: String, default: null },
      facebook: { type: String, default: null },
      github: { type: String, default: null },
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
