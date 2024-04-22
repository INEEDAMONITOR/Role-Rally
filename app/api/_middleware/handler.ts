import { NextRequest, NextResponse } from "next/server";

export type NextFunction = () => Promise<void>;

export type CustomMiddleware<Params = {}> = (
  request: NextRequest,
  params: Params,
  next?: NextFunction
) => Promise<NextResponse | void>;

/**
 * Executes a chain of middlewares and returns the result.
 *
 * @method
 * @async
 * @template Params The type of the parameters passed to the middlewares.
 * @param {...CustomMiddleware<Params>} middlewares The middlewares to be executed.
 * @returns {Promise<NextResponse>} A promise that resolves with the result of the middleware chain.
 * @throws {Error} Throws an error if the handler or middleware does not return a NextResponse.
 */
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
