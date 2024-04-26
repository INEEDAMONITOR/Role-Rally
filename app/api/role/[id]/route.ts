import { handler } from "@/app/api/_middleware/handler";
import { validateRoleIdWithJWT } from "@/app/api/_middleware/role";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";
import { deleteRole, getRoleWithProfile } from "@/app/api/_services/role";
import { getProfile, getProfileVisibility } from "@/app/api/_services/profile";
import { NextRequest, NextResponse } from "next/server";

/**
 * Retrieves a role by its ID.
 * This endpoint is for search roles for add friends.
 * - If the role is public, it will be returned.
 * - If it is private, a 404 error will be returned.
 *
 * @method
 * @async
 * @param req - The NextRequest object.
 * @param params - The parameters object containing the role ID.
 * @returns A NextResponse object with the role data or an error message.
 */
const getRoleByRoleId = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  if (!id) {
    return NextResponse.json({
      message: "Role Id cannot be undefined"
    });
  }

  const idArr = id.split(",");

  const searchParams = req.nextUrl.searchParams;
  // visible===1: show visible profile
  // visible===0: show complete profile
  const visible = searchParams.get("visible");

  try {
    if (idArr.length === 1) {    
      let role;
  
      if (visible && visible === "1") {
        const profile = await getProfile({ ownerRoleId: id as any });
        const profileSelector = await getProfileVisibility({ profileId: profile._id });
        
        role = await getRoleWithProfile({ _id: id }, {}, profileSelector);
      } else {
        role = await getRoleWithProfile({ _id: id });
      }
  
      role = {
        _id: role._id,
        profile: role.profile,
      };
      return NextResponse.json({
        message: "Role fetched successfully",
        data: role,
      });
    } else if (idArr.length > 1) {
      let roles = [];

      if (visible && visible === "1") {
        roles = idArr.map(async (i) => {
          const profile = await getProfile({ ownerRoleId: id as any });
          const profileSelector = await getProfileVisibility({ profileId: profile._id });
          
          return await getRoleWithProfile({ _id: id }, {}, profileSelector);
        });
      } else { 
        roles = idArr.map(async (i) => {
          return await getRoleWithProfile({ _id: id });
        });
      }

      return NextResponse.json({
        message: "Role fetched successfully",
        data: roles,
      });
    } else {
      return NextResponse.json({
        message: "Role Id illegal",
      });
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
/**
 * Deletes a role by its ID.
 *
 * @method
 * @async
 * @param request - The NextRequest object.
 * @param params - An object containing the route parameters, with the `id` property representing the ID of the role to be deleted.
 * @returns A NextResponse object with a JSON response indicating the result of the deletion operation.
 */
const deleteRoleByRoleId = async (
  _: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { 
        result: false,
        message: "role id cannot be undefined"
      },
      { status: 500 }
    );
  }
  try {
    await deleteRole(id);

    return NextResponse.json({ 
      result: true,
      message: "Role deleted successfully"
    });
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
