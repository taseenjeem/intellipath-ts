import User from "@/database/db-models/userModel";
import { getUserByEmail } from "@/database/server-actions";
import connectMongodb from "@/database/services/connectMongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const learnerInfo = await request.json();

  const userAlreadyExists = await getUserByEmail(learnerInfo.email);

  if (userAlreadyExists?.email === learnerInfo.email) {
    return new NextResponse("Email already exists", { status: 400 });
  } else {
    await connectMongodb();

    let { firstName, lastName, fullName } = learnerInfo;

    if (firstName && lastName) {
      fullName = `${firstName} ${lastName}`.trim();
    } else if (!firstName && !lastName && fullName) {
      const fullNameParts = fullName.trim().split(" ");
      lastName = fullNameParts.pop();
      firstName = fullNameParts.join(" ");
    } else {
      return new NextResponse(
        "Either firstName and lastName, or fullName must be provided",
        { status: 400 }
      );
    }

    let baseUsername = (firstName + lastName).toLowerCase().replace(/\s+/g, "");
    let username = baseUsername;

    let userExists = await User.exists({ username });

    while (userExists) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      username = `${baseUsername}${randomSuffix}`;
      userExists = await User.exists({ username });
    }

    const hashedPassword = await bcrypt.hash(learnerInfo.password, 10);

    const newUser = {
      ...learnerInfo,
      firstName,
      lastName,
      fullName,
      username,
      role: "learner",
      password: hashedPassword,
      authenticationMethod: "credential",
    };

    try {
      await User.create(newUser);
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
  }
};
