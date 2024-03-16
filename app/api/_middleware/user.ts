import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUser } from "@/app/api/_services/user";
import { CustomMiddleware } from "@/app/api/_middleware/handler";

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

export const validateTokenMiddleware: CustomMiddleware = async (
  request,
  _,
  next
) => {
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

    next?.();
  } catch (e) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};

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
