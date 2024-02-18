import { dbConnect } from "@/app/api/utils";
import RoleModel, { IRole } from "@/app/api/models/Role";
import { NextResponse } from "next/server";
interface Params {
    roleId: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
  
  return NextResponse.json({ message: "hello" });
}