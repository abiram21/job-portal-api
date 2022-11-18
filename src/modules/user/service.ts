import { findUsers, insertUser } from "./data";
import { Request, Response } from "express";
import { User, RawUser, RoleEnum } from "./model/type";
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
    role: req.body.role? req.body.role: RoleEnum.USER
  };
  const insertedUser: RawUser | null = await insertUser(user);
  if (insertedUser) {
    return convert(insertedUser);
  }
  throw new Error("User not inserted");
};


const login = async (req: Request, res: Response)=> {
  const checkUser = await findUsers({ email: req.body.email });
  if (checkUser.length === 0) throw new Error("Invalid credentials");
  const compareRes: Boolean = await bcrypt.compare(req.body.password, checkUser[0].password);

  if(compareRes) {
    const token = jwt.sign(
      {
        email: checkUser[0].email,
        userId: checkUser[0]._id,
        role: checkUser[0].role
      },
      "abiramjobportal",
      {
        expiresIn: "6h",
      }
    );
    return {
      userId: checkUser[0]._id,
      token
    }
  }
  throw new Error("Invalid credentials")
  
}
const service = {
  getUsers,
  saveUser,
  login
};

export default service;
