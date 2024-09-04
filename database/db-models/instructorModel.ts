import { IInstructorInfo } from "@/types";
import mongoose, { Schema, Model, model } from "mongoose";

const instructorSchema: Schema<IInstructorInfo> = new Schema(
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
    role: { type: String, required: true, default: "instructor" },
    expertise: { type: [String], required: true },
    courses: { type: [String], default: [] },
    biography: { type: String, required: false, default: null },
    education: [
      {
        degree: { type: String, required: true },
        institution: { type: String, required: true },
        yearOfCompletion: { type: String, required: true },
      },
    ],
    teachingExperience: { type: Number, required: false, default: null },
    certifications: [
      {
        title: { type: String, required: true },
        issuer: { type: String, required: true },
        dateOfIssue: { type: String, required: true },
      },
    ],
    socialLinks: {
      linkedin: { type: String, required: false, default: null },
      twitter: { type: String, required: false, default: null },
      website: { type: String, required: false, default: null },
    },
  },
  { timestamps: true }
);

const Instructor: Model<IInstructorInfo> =
  mongoose.models.users || model<IInstructorInfo>("users", instructorSchema);

export default Instructor;
