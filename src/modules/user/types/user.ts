import { ObjectId } from "mongoose";

export enum RoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
}
export type User = {
  id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  role: RoleEnum;
  createdAt?: Date;
};

export interface RawUser {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: RoleEnum;
  createdAt?: Date;
}
