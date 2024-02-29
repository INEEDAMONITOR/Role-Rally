import { deleteProfile } from "@/app/api/_services/profile";
import { dbConnect } from "@/app/api/_utils";
import { Types } from "mongoose";
import { NextResponse } from "next/server";

export const DELETE = async (request: Request) => {
  const { id } = await request.json();
  try {
    await dbConnect();
    await deleteProfile(id as Types.ObjectId);
    return NextResponse.json({ message: "Profile deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
