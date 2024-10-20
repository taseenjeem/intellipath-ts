import { updateCourseThumbnail } from "@/database/server-actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("thumbnail") as File;
    const courseID = formData.get("courseID") as string;

    if (!file || !courseID) {
      return NextResponse.json({
        success: false,
        message: "Invalid input: file or course ID missing",
      });
    }

    const result = await updateCourseThumbnail(courseID, file);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: `Server error: ${(error as Error).message}`,
    });
  }
}
