import { Request, Response } from "express";
import service from "./service";
import type { User } from "./model/type";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: Array<User> = await service.getUsers(req, res);
    res.status(200).json(users);
  } catch (error) {
    res
      .status(400)
      .json({ message: "400 - Internal Server Error", error: error });
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const user: User = await service.saveUser(req, res);
    res.status(201).json(user);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: "400 - Internal Server Error", error: error.message });
  }
};
