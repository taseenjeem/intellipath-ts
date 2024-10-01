import mongoose, { model, Model, Schema } from "mongoose";
import { ICourse } from "@/types";

const CourseSchema: Schema<ICourse> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    instructor: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    thumbnail: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: null },
    language: { type: String, required: true },
    duration: { type: String, required: true },
    requirements: { type: String, required: true },
    level: {
      type: String,
      enum: ["beginner", "intermediate", "professional"],
      required: true,
    },
    coupons: [
      {
        code: { type: String, required: true },
        discount: { type: Number, required: true },
      },
    ],
    lessons: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
      },
    ],
    testimonials: [{ type: Schema.Types.ObjectId, ref: "testimonials" }],
    enrollments: [{ type: Schema.Types.ObjectId, ref: "users" }],
    short_description: { type: String, required: true },
    full_description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Course: Model<ICourse> =
  mongoose.models.courses || model<ICourse>("courses", CourseSchema);

export default Course;
