import { sendbirdRequests } from "@/app/_lib/sendbird";
import { dbConnect } from "@/app/api/_utils";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { deleteUser } from "@/app/api/_services/user";
import { deleteProfile } from "@/app/api/_services/profile";

// FIXME: Leave for now
export async function POST(req: Request) {
  await sendbirdRequests.createUser(req);
}

export async function DELETE(request: Request) {
  const { userId } = await request.json();
  try {
    await dbConnect();
    await deleteUser(userId as Types.ObjectId);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { id } = await request.json();
  deleteProfile(id);
  return new Response(null, { status: 200 });
}
