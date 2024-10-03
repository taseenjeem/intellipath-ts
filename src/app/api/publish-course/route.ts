import { publishCourse, uploadImage } from "@/database/server-actions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();
    const file = formData.get("image") as File;
    const courseDataRaw = formData.get("courseData");
    const userID = formData.get("userID") as string;

    if (!file || !courseDataRaw || !userID) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    let courseData;

    try {
      courseData = JSON.parse(courseDataRaw as string);
    } catch (error) {
      return NextResponse.json(
        { success: false, message: "Invalid course data format" },
        { status: 400 }
      );
    }

    const { success, imageUrl, message } = await uploadImage(file);

    if (!success) {
      return NextResponse.json({ success: false, message }, { status: 500 });
    }

    const result = await publishCourse(userID, courseData, imageUrl);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Error in POST /api/publish-course:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
};
