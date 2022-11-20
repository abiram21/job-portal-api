import { ObjectId } from "mongodb";

export type Login = {
  userId: string;
  token: string;
};
