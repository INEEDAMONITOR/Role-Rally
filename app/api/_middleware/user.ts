import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getUser } from "@/app/api/_services/user";

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