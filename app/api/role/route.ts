import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { deleteRole, getRolesWithProfile } from "@/app/api/_services/role";
import { handler } from "@/app/api/_middleware/handler";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";

/**
 * Retrieves roles based on the user's cookies.
 *
 * @method
 * @async
 * @param req - The NextRequest object representing the incoming request.
 * @returns A NextResponse object containing the roles in JSON format.
 */
const getRolesByCookies = async (req: NextRequest) => {
  try {
    console.log("getRolesByCookies request", req);

    const token = req.cookies.get("roleRallyUserToken")?.value as string;
    console.log("getRolesByCookies token", token);

    const jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    console.log("getRolesByCookies jwt payload", jwtPayload);

    const roles = await getRolesWithProfile({ ownerId: jwtPayload._id });
    return NextResponse.json(roles);
  } catch (e) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};
export const GET = handler(validateTokenMiddleware, getRolesByCookies);

/**
 * Deletes a role by its role ID.
 *
 * @method
 * @async
 * @param request - The NextRequest object representing the incoming request.
 * @returns A NextResponse object with a JSON response indicating the result of the operation.
 */
const deleteRoleByRoleId = async (request: NextRequest) => {
  const body = await request.json();

  try {
    await deleteRole(body.id);
    return NextResponse.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
export const DELETE = handler(validateTokenMiddleware, deleteRoleByRoleId);
