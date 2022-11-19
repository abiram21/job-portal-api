import { ObjectId } from "mongoose";
import { RawJob } from "../../job/types/raw-job";

export interface RawApplicationJob {
  _id?: ObjectId;
  userId: ObjectId;
  jobs: RawJob[];
};