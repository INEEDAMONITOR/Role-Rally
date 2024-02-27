import UserModel from "@/app/api/_models/User";
import { IUser } from "@/app/api/_models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { dbConnect } from "@/app/api/_utils";

export async function POST(req: Request) {
  await dbConnect();
  const secretKey = process.env.JWT_SECRET as string;
  const { email, password } = await req.json();

  const user: IUser | undefined = await UserModel.findOne({ email }).exec();
  if (!user) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  }
  const isPasswordValid = bcrypt.compareSync(password, user.password);
  if (!isPasswordValid) {
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 401 }
    );
  }
  const token = jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: "1h",
  });
  return NextResponse.json(
    {
      message: "Login successes",
      payload: {
        token,
      },
    },
    { status: 200 }
  );
}
