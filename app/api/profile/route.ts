import { handler } from "@/app/api/_middleware/handler";
import { validateProfileIdWithJWT } from "@/app/api/_middleware/profile";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";
import { cleanObject } from "@/app/utils";
import { NextRequest, NextResponse } from "next/server";
import ProfileModel from "@/app/api/_models/Profile";

const updateProfile = async (req: NextRequest) => {
  const body = await req.json();
  const profileId = body.id;

  let newProfile: any = {
    displayName: body.displayName,
    email: body.email,
    phone: body.phone,
    avatar: body.avatar,
    about: body.about,
    pronouns: body.pronouns,
    username: body.username,
  };
  try {
    const profile = await ProfileModel.findByIdAndUpdate(
      profileId,
      cleanObject(newProfile),
      {
        new: true,
      }
    ).exec();
    console.log(profile);

    return NextResponse.json({
      message: "Profile updated successfully",
      profile: profile?.toObject(),
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Profile update failed" },
      { status: 500 }
    );
  }
};

export const PUT = handler(
  validateTokenMiddleware,
  validateProfileIdWithJWT,
  updateProfile
);
