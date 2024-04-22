import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUser } from "@/app/api/_services/user";
import { CustomMiddleware } from "@/app/api/_middleware/handler";

/**
 * Authenticates the user based on the provided request.
 *
 * @method
 * @async
 * @param request - The NextRequest object representing the incoming request.
 * @returns A Promise that resolves to the authenticated user object, or null if authentication fails.
 */
export const userAuthenticate = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("roleRallyUserToken")?.value;

    if (!token) {
      return null;
    }

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);

    if (typeof jwtPayload === "string") {
      return null;
    }

    return await getUser({ _id: jwtPayload._id }, ["email", "rolesId"]);
  } catch (e) {
    return null;
  }
};

/**
 * Middleware function to validate a token.
 *
 * @method
 * @async
 * @param request - The incoming request object.
 * @param _ - The response object (not used in this middleware).
 * @param next - The next function to call in the middleware chain.
 * @returns A NextResponse object with an appropriate JSON response.
 */
export const validateTokenMiddleware: CustomMiddleware = async (
  request,
  _,
  next
) => {
  try {
    console.log("validateTokenMiddleware request", request);

    const token = request.cookies.get("roleRallyUserToken")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof jwtPayload === "string") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    next?.();
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};

/**
 * Middleware function to authenticate a user with an ID.
 *
 * @method
 * @async
 * @param request - The request object.
 * @param params - The parameters object containing the user ID.
 * @param next - The next function to be called in the middleware chain.
 * @returns A NextResponse object with an appropriate JSON response.
 */
export const userAuthenticateWithIdMiddleware: CustomMiddleware<{
  params: { id: string };
}> = async (request, { params }, next) => {
  try {
    const token = request.cookies.get("roleRallyUserToken")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof jwtPayload === "string") {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (jwtPayload._id !== params.id) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (next != undefined) {
      next();
    }
  } catch (e) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};
