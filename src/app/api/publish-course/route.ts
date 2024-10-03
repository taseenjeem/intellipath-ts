import { uploadImage } from "@/database/server-actions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const formData = await req.formData();
  const file = formData.get("image") as File;
  const { success, imageUrl } = await uploadImage(file);

  if (success) {
  }
};
