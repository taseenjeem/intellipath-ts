import { updateUserProfileImage } from "@/database/server-actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const userId = formData.get("userId") as string;

    if (!file || !userId) {
      return NextResponse.json({
        success: false,
        message: "Invalid input: file or userId missing",
      });
    }

    const result = await updateUserProfileImage(userId, file);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Server error: ${(error as Error).message}`,
    });
  }
}
