import { NextRequest, NextResponse } from "next/server";

export type NextFunction = () => Promise<void>;

export type CustomMiddleware<Params = {}> = (
  request: NextRequest,
  params: Params,
  next?: NextFunction
) => Promise<NextResponse | void>;

export const handler =
  <Params>(...middlewares: CustomMiddleware<Params>[]) =>
  async (request: NextRequest, params: Params) => {
    let result;
    for (const middleware of middlewares) {
      let nextInvoked = false;

      const next = async () => {
        nextInvoked = true;
      };

      result = await middleware(request, params, next);
      if (!nextInvoked) {
        break;
      }
    }
    if (result) return result;
    throw new Error("Your handler or middleware must return a NextResponse!");
  };
