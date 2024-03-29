import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import { deleteRole, getRolesWithProfile } from "@/app/api/_services/role";
import { handler } from "@/app/api/_middleware/handler";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";

const getRolesByCookies = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("roleRallyUserToken")?.value as string;

    const jwtPayload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    const roles = await getRolesWithProfile({ ownerId: jwtPayload._id });
    return NextResponse.json(roles);
  } catch (e) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};
export const GET = handler(validateTokenMiddleware, getRolesByCookies);

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
