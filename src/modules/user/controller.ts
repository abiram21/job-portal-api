import { Request, Response } from "express";
import service from "./service";
import type { User } from "./types/user";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: Array<User> = await service.getUsers(req);
    res.status(200).json(users);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user: User = await service.getUser(req);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const user: User = await service.saveUser(req);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const user = await service.login(req);
    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
