import { ObjectId } from "mongodb";

export interface RawJob {
  _id?: ObjectId;
  title: string;
  description: string;
  image: string;
  active: boolean;
  company: string;
  salary: number;
  createdAt: Date;
}
