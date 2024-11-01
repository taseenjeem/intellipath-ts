import { IEnrollments } from "@/types";
import mongoose, { model, Model, Schema } from "mongoose";

const enrollmentsSchema: Schema<IEnrollments> = new mongoose.Schema(
  {
    stripe_session_id: { type: String, required: true },
    amount_subtotal: { type: Number, required: true },
    amount_total: { type: Number, required: true },
    currency: { type: String, default: null },
    created: { type: Number, required: true },
    expires_at: { type: Number, required: true },
    payment_intent: { type: String, default: null },
    payment_status: { type: String, required: true },
    mode: { type: String, required: true },
    status: { type: String, default: null },
    success_url: { type: String, default: null },
    cancel_url: { type: String, default: null },
    customer_details: {
      email_while_payment: { type: String, default: null },
      name_while_payment: { type: String, default: null },
      address_while_payment: { type: String, default: null },
    },
    payment_method_type: { type: [String], required: true },
    purchased_by: { type: Schema.Types.ObjectId, ref: "users" },
    purchased_course: { type: Schema.Types.ObjectId, ref: "courses" },
  },
  {
    timestamps: true,
  }
);

const Enrollments: Model<IEnrollments> =
  mongoose.models.enrollments ||
  model<IEnrollments>("enrollments", enrollmentsSchema);

export default Enrollments;
