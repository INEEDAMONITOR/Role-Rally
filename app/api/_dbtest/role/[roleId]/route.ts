import { dbConnect } from "@/app/api/_utils";
import RoleModel, { IRole } from "@/app/api/_models/Role";
import { NextResponse } from "next/server";
interface Params {
  roleId: string;
}

/**
 * Handles the GET request for retrieving a role by ID.
 *
 * @param {Request} _ - The request object.
 * @param {Object} params - The parameters object containing the role ID.
 * @param {string} params.roleId - The ID of the role to retrieve.
 * @returns {Promise<NextResponse>} A promise that resolves to the response object.
 */
export async function GET(_: Request, { params }: { params: Params }) {
  try {
    await dbConnect();
    const role = await RoleModel.findById(params.roleId);
    return NextResponse.json(role);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
