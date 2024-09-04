import Learner from "@/database/db-models/learnerModel";
import connectMongodb from "@/database/services/connectMongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const learnerInfo = await request.json();

  await connectMongodb();

  let baseUsername = (learnerInfo.firstName + learnerInfo.lastName)
    .toLowerCase()
    .replace(/\s+/g, "");

  let username = baseUsername;

  let userExists = await Learner.exists({ username });

  while (userExists) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    username = `${baseUsername}${randomSuffix}`;
    userExists = await Learner.exists({ username });
  }

  const hashedPassword = await bcrypt.hash(learnerInfo.password, 10);

  const newUser = { ...learnerInfo, username, password: hashedPassword };

  try {
    await Learner.create(newUser);
    return new NextResponse("User created successfully", { status: 201 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Failed to create new user:", err.message);
      return new NextResponse("Failed to create new user", { status: 500 });
    } else {
      console.error("Failed to create new user due to an unknown error");
      return new NextResponse(
        "Failed to create new user due to an unknown error",
        { status: 500 }
      );
    }
  }
};
