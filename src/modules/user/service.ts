import { findUsers, insertUser } from "./data";
import { Request, Response } from "express";
import { User, RawUser } from "./model/type";
import convert from "./helpers/convert";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const getUsers = async (req: Request, res: Response): Promise<User[]> => {
  const rawUsers: Array<RawUser> = await findUsers({});
  const users: Array<User> = rawUsers.map(convert);
  return users;
};

const saveUser = async (req: Request, res: Response): Promise<User> => {
  const checkUser = await findUsers({ email: req.body.email });
  if (checkUser.length > 0) throw new Error("User already exists");
  const hashedPassword = await bcrypt.hash(req.body.password,10)
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  };
  const insertedUser: RawUser | null = await insertUser(user);
  if (insertedUser) {
    return convert(insertedUser);
  }
  throw new Error("User not inserted");
};

const service = {
  getUsers,
  saveUser,
};

export default service;
