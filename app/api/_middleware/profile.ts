import { CustomMiddleware } from "@/app/api/_middleware/handler";
import { getRoles } from "@/app/api/_services/role";
import { getUser } from "@/app/api/_services/user";
import { profile } from "console";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextResponse } from "next/server";

export const validateProfileIdWithJWT: CustomMiddleware = async (
  req,
  _,
  next
) => {
  const { id: profileId } = await req.clone().json();
  if (!profileId) {
    return NextResponse.json(
      { message: "No profile id provided" },
      { status: 400 }
    );
  }
  const token = req.cookies.get("roleRallyUserToken")?.value as string;
  const jwtPayload = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as JwtPayload;
  const profileIds = (
    (await getRoles({ ownerId: jwtPayload._id })) as any[]
  ).map(role => role.profileId.toString());
  const userProfileId = (await getUser(jwtPayload._id, "profileId"))?.profileId;
  profileIds.push(userProfileId.toString());
  if (profileIds.includes(profileId)) {
    next?.();
  }
  return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
};
