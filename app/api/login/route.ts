import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { validateUser } from "@/app/api/_services/user";

/**
 * Handles the POST request for user login.
 *
 * @param req - The request object.
 * @returns A JSON response with a token if the login is successful, or an error message if the login fails.
 */
export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (payload?.email === undefined) {
      return NextResponse.json(
        {
          message: "Email can not be undefined",
        },
        {
          status: 401,
        }
      );
    }

    if (payload?.password === undefined) {
      return NextResponse.json(
        {
          message: "Password can not be undefined",
        },
        {
          status: 401,
        }
      );
    }

    const user = await validateUser(payload.email, payload.password);

    if (!user) {
      return NextResponse.json(
        {
          message: "Email or password is incorrect",
        },
        {
          status: 401,
        }
      );
    }
    delete user.password;

    const token = jwt.sign(user, process.env.JWT_SECRET as string, {
      expiresIn: 60 * 60 * 24 * Number(process.env.JWT_EXPIRES_IN),
    });

    return NextResponse.json(
      {
        token,
      },
      {
        status: 200,
      }
    );
  } catch (e) {
    return NextResponse.json(
      {
        message: "Payload body is undefined",
      },
      {
        status: 401,
      }
    );
  }
}
