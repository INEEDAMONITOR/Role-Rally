import { sendbirdRequests } from "@/app/_lib/sendbird";
import { NextRequest, NextResponse } from "next/server";
import { userAuthenticate } from "@/app/api/_middleware/user";

interface Params {
    userId: string;
}

export async function GET(req: NextRequest, { params }: { params: Params }) {
  const user = await userAuthenticate(req);

  if (!user) {
    return NextResponse.json(
      {
        message: "Auth failed",
      },
      {
        status: 401,
      }
    );
  }

  return await sendbirdRequests.fetchUser(params.userId);
}