import User from "@/database/db-models/userModel";
import connectMongodb from "@/database/services/connectMongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const learnerInfo = await request.json();
  await connectMongodb();
  const hashedPassword = await bcrypt.hash(learnerInfo.password, 5);
  const newUser = { ...learnerInfo, password: hashedPassword };

  try {
    await User.create(newUser);
    return new NextResponse("User created successfully", { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw new Error("Failed to create new user", { cause: err });
    } else {
      throw new Error("Failed to create new user due to an unknown error");
    }
  }
};
