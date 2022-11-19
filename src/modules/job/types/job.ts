import { ObjectId } from "mongodb";

export type Job = {
  id?: ObjectId;
  title: string;
  description: string;
  image: string;
  active: boolean;
  company: string;
  salary: number;
  createdAt?: Date;
};