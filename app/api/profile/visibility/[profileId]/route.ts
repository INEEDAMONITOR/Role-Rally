import { handler } from "@/app/api/_middleware/handler";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";
import { NextRequest, NextResponse } from "next/server";
import { getProfileVisibility } from "@/app/api/_services/profile";
import ProfileVisibilityModel from "@/app/api/_models/ProfileVisibility";

type Params = {
  profileId: string | undefined;
}

export const GET = handler(validateTokenMiddleware, async (_: NextRequest, { params }: { params: Params})  => {
  try {
    const { profileId }=params;

    if (!profileId) {
      return NextResponse.json({ message: "ownerRoleId cannot be undefined" }, { status: 500 });
    }

    return NextResponse.json({
      data: await getProfileVisibility({ profileId }),
    });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 500 });
  }
});

export const POST = handler(validateTokenMiddleware, async (_: NextRequest, { params }: { params: Params})  => {
  try {
    const { profileId }=params;

    if (!profileId) {
      return NextResponse.json({ message: "ownerRoleId cannot be undefined" }, { status: 500 });
    }

    await ProfileVisibilityModel.create({
      profileId,
      avatar: "1",
      lastName: "1",
      email: "1",
      about: "1",
      pronouns: "1",
      website: "1",
    });

    return NextResponse.json({
      result: true,
    });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ status: 500 });
  }
});