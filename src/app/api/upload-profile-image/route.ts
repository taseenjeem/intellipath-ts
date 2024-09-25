import { updateUserProfileImage } from "@/database/server-actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData(); // Parse form data from the request
    const file = formData.get("image") as File; // Get the image file from form data
    const userId = formData.get("userId") as string; // Get the userId from form data

    // Validate the presence of both file and userId
    if (!file || !userId) {
      return NextResponse.json({
        success: false,
        message: "Invalid input: file or userId missing",
      });
    }

    // Call the function to update user profile image
    const result = await updateUserProfileImage(userId, file);

    // Return the result of the operation
    return NextResponse.json(result);
  } catch (error) {
    // Return a server error with the error message
    return NextResponse.json({
      success: false,
      message: `Server error: ${(error as Error).message}`,
    });
  }
}
