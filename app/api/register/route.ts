import { dbConnect, validateEmail } from "@/app/api/_utils";
import { NextResponse } from "next/server";
import { createUser } from "@/app/api/_services/user";
import bcrypt from "bcrypt";
/**
 * Handles the HTTP POST request for creating a new user.
 *
 * @param request - The NextApiRequest object representing the incoming request.
 * @param response - The NextApiResponse object representing the outgoing response.
 * @returns A Promise that resolves to void.
 */
export async function POST(request: Request) {
  const { name, email, password } = await request.json();

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
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = await createUser({
      name,
      email,
      password: hashedPassword,
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
