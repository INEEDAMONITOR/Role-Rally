import { handler } from "@/app/api/_middleware/handler";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";
import ProfileModel from "@/app/api/_models/Profile";
import { dbConnect } from "@/app/api/_utils";
import { cleanObject } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";

type Params = { 
  ownerId: string | undefined;
}

const updateProfile = async (req: NextRequest, { params }: { params: Params}) => {
  const { ownerId } = params;

  try {
    // TODO: validate ownerId

    const body = await req.json();

    await dbConnect();
    const profile = await ProfileModel.findOneAndUpdate(
      { ownerId },
      cleanObject(body),
      {
        new: true,
      }
    ).exec();

    return NextResponse.json({
      profile: profile?.toObject(),
    });

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { status: 500 }
    );
  }
};

export const PUT = handler(
  validateTokenMiddleware,
  updateProfile
);
