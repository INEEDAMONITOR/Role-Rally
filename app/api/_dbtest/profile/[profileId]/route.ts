import { dbConnect } from "@/app/api/_utils";
import { NextResponse } from "next/server";
import Profile from "@/app/api/_models/Profile";
interface Params {
    profileId: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
  
  try {
    await dbConnect();
    const role = await Profile.findById(params.profileId);
    return NextResponse.json(role);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}