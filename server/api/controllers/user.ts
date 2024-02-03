import { Request, Response } from "express";

export const createUser = async (req: Request, res: Response) => {
  try {
    const sendbirdRes = await (await fetch(`https://api-${process.env.APPLICATION_ID}.sendbird.com/v3/users`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        "Api-Token": process.env.API_TOKEN as string,
      },
      body: JSON.stringify(req.body),
    })).json();

    res.status(200).json(sendbirdRes);
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).json({
        message: e.message,
        error: true,
      });
    }

    if (e instanceof String) {
      res.status(403).json({
        message: e,
        error: true,
      });
    }
  }
};