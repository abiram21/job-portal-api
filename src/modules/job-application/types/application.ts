import { ObjectId } from "mongoose";
export type Application = {
  id?: ObjectId;
  userId: ObjectId;
  jobs: ObjectId[];
};
