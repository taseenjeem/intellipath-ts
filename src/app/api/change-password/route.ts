import { changeUserPassword } from "@/database/server-actions";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    // Parse the incoming request body
    const { userID, updatedData } = await req.json();

    // Check if required fields are present
    if (!userID || !updatedData) {
      return NextResponse.json(
        { message: "Missing userID or password data" },
        { status: 400 }
      );
    }

    // Call the changeUserPassword function and handle the process
    await changeUserPassword(userID, updatedData);

    // Respond with success message
    return NextResponse.json(
      { message: "Password updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Catch and handle errors (e.g., invalid password, user not found)
    console.error("Error in changing password:", error);

    // Return appropriate error message
    if (error.message === "User not found") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (error.message === "Current password is incorrect") {
      return NextResponse.json(
        { message: "Current password is incorrect" },
        { status: 400 }
      );
    }

    if (
      error.message ===
      "New password cannot be the same as the current password"
    ) {
      return NextResponse.json(
        { message: "New password cannot be the same as the current password" },
        { status: 400 }
      );
    }

    // For any other errors, return a generic server error message
    return NextResponse.json(
      { message: "An error occurred while updating the password" },
      { status: 500 }
    );
  }
};
