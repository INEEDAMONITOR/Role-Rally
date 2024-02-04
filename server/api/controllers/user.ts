import { Request, Response } from "express";
import { SENDBIRD_API_URL } from "../external/sendbird";

export const createUser = async (req: Request, res: Response) => {
  const sendbirdRes = await fetch(`${SENDBIRD_API_URL}/users`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Api-Token": process.env.API_TOKEN as string,
    },
    body: JSON.stringify(req.body),
  });
  const sendbirdData = await sendbirdRes.json();

  res.status(200).json(sendbirdData);
};