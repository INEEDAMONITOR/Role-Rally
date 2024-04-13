import { dbConnect, validateEmail } from "@/app/api/_utils";
import { Types } from "mongoose";
import UserModel from "@/app/api/_models/User";
import { NextResponse } from "next/server";
import { createUser, deleteUser } from "@/app/api/_services/user";
import { deleteProfile } from "@/app/api/_services/profile";

/**
 * Handles the HTTP POST request for creating a new user.
 *
 * @param request - The NextApiRequest object representing the incoming request.
 * @param response - The NextApiResponse object representing the outgoing response.
 * @returns A Promise that resolves to void.
 */
export async function POST(request: Request) {
  const { name, email } = await request.json();

  // Basic validation
  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ message: "Invalid name" }, { status: 400 });
  }

  if (!email || typeof email !== "string" || !validateEmail(email)) {
    return NextResponse.json(
      { message: "Invalid email", error: "Invalid email" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const newUser = await createUser({
      name,
      email,
      password: "",
    });
    if (newUser) {
      return NextResponse.json({
        message: "Created successful",
        payload: newUser,
      });
    } else {
      return NextResponse.json(
        { message: "Create fail. Email may already registered" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}

// Get 10 users
/**
 * Retrieves a list of users from the database.
 *
 * @param request - The request object.
 * @returns A JSON response containing the list of users.
 */
export async function GET(request: Request) {
  try {
    await dbConnect();
    const users = await UserModel.find().limit(10);
    return NextResponse.json(users);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Deletes a user from the database.
 *
 * @param request - The HTTP request object.
 * @returns A JSON response indicating the result of the operation.
 */
export async function DELETE(request: Request) {
  const { userId } = await request.json();
  try {
    await dbConnect();
    await deleteUser(userId as Types.ObjectId);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * Updates a user profile by deleting the profile with the specified ID.
 *
 * @param request - The request object containing the user ID.
 * @returns A response object with a status code of 200.
 */
export async function PUT(request: Request) {
  const { id } = await request.json();
  deleteProfile(id);
  return new Response(null, { status: 200 });
}
