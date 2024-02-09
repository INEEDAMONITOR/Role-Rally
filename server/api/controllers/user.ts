import { Request, Response } from "express";
import { handleCreateUser, handleFetchUser } from "../services/user";

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = await handleCreateUser(req.body);

    res.status(200).json({
      message: "User created successfully",
      data,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).json({
        error: true,
        message: e.message,
      });
    }
  }
};

export const fetchUser = async (req: Request<{ userId: string}>, res: Response) => {
  try {
    const data = await handleFetchUser(req.params.userId);

    res.status(200).json({
      data,
    });
  } catch (e) {
    if (e instanceof Error) {
      res.status(403).json({
        error: true,
        message: e.message,
      });
    }
  }
};