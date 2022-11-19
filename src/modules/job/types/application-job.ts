import { ObjectId } from "mongoose";
import { RawJob } from "./raw-job";

export interface RawApplicationJob {
  _id?: ObjectId;
  userId: ObjectId;
  jobs: RawJob[];
};