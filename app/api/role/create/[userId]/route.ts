import { NextRequest, NextResponse } from "next/server";
import { handler } from "@/app/api/_middleware/handler";
import { validateTokenMiddleware } from "@/app/api/_middleware/user";
import { createRole } from "@/app/api/_services/role";
import { Types } from "mongoose";

/**
 * Handles the POST request to create a role for a specific user.
 *
 * @method
 * @async
 * @param request - The NextRequest object representing the incoming request.
 * @param params - The parameters extracted from the URL, including the userId.
 * @returns A NextResponse object with the created role data or an error message.
 */
export const POST = handler(
  validateTokenMiddleware,
  async (
    request: NextRequest,
    { params }: { params: { userId: string | Types.ObjectId } }
  ) => {
    const { userId } = params;
    const payload = await request.json();

    try {
      // TODO: validate if userId exists
      // TODO: validate if the current operator has this user

      const data = await createRole(userId, payload);

      if (!data) {
        throw new Error("Error when creating role");
      }

      return NextResponse.json(
        {
          data,
        },
        {
          status: 200,
        }
      );
    } catch (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Internal server error", error: error },
        { status: 500 }
      );
    }
  }
);
