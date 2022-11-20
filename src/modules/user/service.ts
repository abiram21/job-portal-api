import { findOneUser, findUsers, insertUser } from "./data";
import { Request } from "express";
import { User, RawUser } from "./types/user";
import convert from "./helpers/convert";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config/common";
import userValidator from "./helpers/user-validator";
import { isValidId } from "../../utils/common";
import loginValidator from "./helpers/login-validator";

const getUsers = async (req: Request): Promise<User[]> => {
  const rawUsers: Array<RawUser> = await findUsers({});
  const users: Array<User> = rawUsers.map(convert);
  return users;
};

const getUser = async (req: any): Promise<User> => {
  if (!isValidId(req.userData.userId)) throw new Error("Invalid user id");

  const rawUser: RawUser | null = await findOneUser(req.userData.userId);
  if (rawUser) {
    return convert(rawUser);
  }
  throw new Error("User not found");
};

const saveUser = async (req: any): Promise<User> => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
  };
  userValidator(user);
  const checkUser = await findUsers({ email: req.body.email });
  if (checkUser.length > 0) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  const insertedUser: RawUser | null = await insertUser(user);
  if (insertedUser) {
    return convert(insertedUser);
  }
  throw new Error("User not inserted");
};

const login = async (req: Request) => {
  loginValidator({ email: req.body.email, password: req.body.password });
  const checkUser = await findUsers({ email: req.body.email });
  if (checkUser.length === 0) throw new Error("Invalid credentials");

  const compareRes: Boolean = await bcrypt.compare(
    req.body.password,
    checkUser[0].password
  );
  if (compareRes) {
    const token = jwt.sign(
      {
        email: checkUser[0].email,
        userId: checkUser[0]._id,
        role: checkUser[0].role,
      },
      config.jwt.secret,
      {
        expiresIn: "6h",
      }
    );
    return {
      userId: checkUser[0]._id.toString(),
      token,
    };
  }
  throw new Error("Invalid credentials");
};

const service = {
  getUsers,
  saveUser,
  login,
  getUser,
};

export default service;
