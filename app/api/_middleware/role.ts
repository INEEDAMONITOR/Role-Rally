import { CustomMiddleware } from "@/app/api/_middleware/handler";
import { NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { getRole } from "@/app/api/_services/role";
/**
 * Middleware function to validate the role ID with JWT.
 *
 * @method
 * @async
 * @param request - The request object.
 * @param params - The parameters object containing the ID.
 * @param next - The next function to be called.
 * @returns A Promise that resolves to the next function or a NextResponse object.
 */
export const validateRoleIdWithJWT: CustomMiddleware<{
  params?: { id: string };
}> = async (request, { params }, next) => {
  try {
    const token = request.cookies.get("roleRallyUserToken")?.value as string;
    const jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    let body = await request.clone().json();

    if (params?.id && body?.id) {
      return NextResponse.json(
        { message: "Duplicate id in params and body" },
        { status: 400 }
      );
    }
    let roleId = params?.id || body?.id;

    const role = await getRole(roleId, { ownerId: 1 });
    if (!role) {
      return NextResponse.json({ message: "Role not found" }, { status: 404 });
    }
    if (role.ownerId.toString() !== jwtPayload._id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    next?.();
  } catch (e) {
    console.warn(e);

    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};
