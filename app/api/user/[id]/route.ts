import { handler } from "@/app/api/_middleware/handler";
import { userAuthenticateWithIdMiddleware } from "@/app/api/_middleware/user";
import { getUserWithProfile } from "@/app/api/_services/user";
import { NextRequest, NextResponse } from "next/server";

const getUserById = async (
  _: NextRequest,
  { params }: { params: { id: string } } = { params: { id: "" } }
) => {
  try {
    const { id } = params;
    const user = await getUserWithProfile({ _id: id }, ["-password"]);
    return NextResponse.json(user);
  } catch (e) {
    return NextResponse.json({ message: "Internal error" }, { status: 500 });
  }
};

export const GET = handler(userAuthenticateWithIdMiddleware, getUserById);
