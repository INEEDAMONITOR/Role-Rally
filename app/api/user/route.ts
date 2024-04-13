import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getUser } from "@/app/api/_services/user";
import { handler } from "@/app/api/_middleware/handler";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";
/**
 * Retrieves user information based on the cookies in the request.
 *
 * @method
 * @async
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the user information in JSON format.
 */
const getUserByCookies = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("roleRallyUserToken")?.value as string;

    const jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const user = await getUser({ _id: jwtPayload._id }, ["-password"]);
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};

export const GET = handler(validateTokenMiddleware, getUserByCookies);
