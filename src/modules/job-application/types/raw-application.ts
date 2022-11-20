import { ObjectId } from "mongoose";

export interface RawApplication {
  _id?: ObjectId;
  userId: ObjectId;
  jobs: ObjectId[];
}
