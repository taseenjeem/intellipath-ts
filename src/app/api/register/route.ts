import User from "@/database/db-models/userModel";
import { getUserByEmail } from "@/database/server-actions";
import connectMongodb from "@/services/connectMongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  const userInfo = await request.json(); // Parse the request body

  // Check if a user with the provided email already exists
  const userAlreadyExists = await getUserByEmail(userInfo.email);

  if (userAlreadyExists?.email === userInfo.email) {
    return new NextResponse("Email already exists", { status: 400 }); // Return an error if the email already exists
  } else {
    await connectMongodb(); // Connect to the MongoDB database

    const { firstName, lastName } = userInfo;

    // Generate a base username from first and last name, and ensure uniqueness
    let baseUsername = (firstName + lastName).toLowerCase().replace(/\s+/g, "");
    let username = baseUsername;
    let userExists = await User.exists({ username });

    // Append a random suffix to the username if it already exists
    while (userExists) {
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      username = `${baseUsername}${randomSuffix}`;
      userExists = await User.exists({ username });
    }

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);

    // Construct a new user object
    const newUser = {
      ...userInfo,
      firstName,
      lastName,
      fullName: firstName + " " + lastName,
      username,
      password: hashedPassword,
      authenticationMethod: "credential",
    };

    try {
      await User.create(newUser); // Create the new user in the database
      return new NextResponse("User created successfully", { status: 201 }); // Respond with success
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log("Failed to create new user:", err.message); // Log the error message
        return new NextResponse("Failed to create new user", { status: 500 }); // Respond with a server error
      } else {
        console.log("Failed to create new user due to an unknown error"); // Log an unknown error
        return new NextResponse(
          "Failed to create new user due to an unknown error",
          { status: 500 }
        );
      }
    }
  }
};
