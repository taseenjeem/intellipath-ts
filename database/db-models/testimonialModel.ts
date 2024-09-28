import { ITestimonial } from "@/types";
import mongoose, { model, Model, Schema } from "mongoose";

const TestimonialSchema: Schema<ITestimonial> = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    content: { type: String, required: true },
    rating: { type: Number, required: true },
    date: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Testimonials: Model<ITestimonial> =
  mongoose.models.testimonials ||
  model<ITestimonial>("testimonials", TestimonialSchema);

export default Testimonials;
