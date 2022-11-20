import jwt from "jsonwebtoken";
import { RoleEnum } from "../modules/user/types/user";
import { NextFunction, Response } from "express";
import config from "../config/common";

const checkToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) throw new Error();
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.jwt.secret);
    req.userData = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

const checkAdmin = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.userData || req.userData.role !== RoleEnum.ADMIN)
      throw new Error("Unauthorized");
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Forbidden",
    });
  }
};

const checkUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (
      !req.userData ||
      req.userData.role !== RoleEnum.USER ||
      req.userData.userId === req.params.id
    )
      throw new Error("Unauthorized");
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};

export { checkToken, checkAdmin, checkUser };
