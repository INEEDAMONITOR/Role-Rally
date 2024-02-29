import UserModel from "@/app/api/_models/User";
import { createRole } from "@/app/api/_services/role";
import { NextResponse, userAgent } from "next/server";
interface Params {
  roleId: string;
  ownerId: string;
}

export async function POST(request: Request) {
  const { ownerId } = await request.json();
  try {
    if (await UserModel.exists({ _id: ownerId })) {
      const role = await createRole(ownerId);
      UserModel.findByIdAndUpdate(ownerId, {
        $addToSet: { rolesId: { $each: [role._id] } },
      }).exec();
      return NextResponse.json({ message: "Role created" });
    } else {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
