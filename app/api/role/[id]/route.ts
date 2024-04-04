import { handler } from "@/app/api/_middleware/handler";
import { validateRoleIdWithJWT } from "@/app/api/_middleware/role";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";
import { deleteRole, getRoleWithProfile } from "@/app/api/_services/role";
import { NextRequest, NextResponse } from "next/server";

/**
 * Retrieves a role by its ID.
 * This endpoint is for search roles for add friends.
 * - If the role is public, it will be returned.
 * - If it is private, a 404 error will be returned.
 * @param req - The NextRequest object.
 * @param params - The parameters object containing the role ID.
 * @returns A NextResponse object with the role data or an error message.
 */
const getRoleByRoleId = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;
  try {
    let role = await getRoleWithProfile({ _id: id });

    role = {
      _id: role._id,
      profile: role.profile,
    };
    return NextResponse.json({
      message: "Role fetched successfully",
      data: role,
    });

  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
const deleteRoleByRoleId = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  console.log("hello");
  const id = params.id;
  const body = await request.json();
  console.log(body);

  try {
    await deleteRole(id);
    return NextResponse.json({ message: "Role deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
export const GET = getRoleByRoleId;
export const DELETE = handler(
  validateTokenMiddleware,
  validateRoleIdWithJWT,
  deleteRoleByRoleId
);
