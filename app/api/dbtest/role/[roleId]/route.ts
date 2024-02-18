import { dbConnect } from "@/app/api/utils";
import RoleModel, { IRole } from "@/app/api/models/Role";
import { NextResponse } from "next/server";
interface Params {
    roleId: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
  
  try {
    await dbConnect();
    const role = await RoleModel.findById(params.roleId);
    return NextResponse.json(role);
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: error }, { status: 500 });
  }
}