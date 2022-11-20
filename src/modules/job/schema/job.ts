import mongoose, { Schema } from "mongoose";
import { RawJob } from "../types/raw-job";

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    active: { type: Boolean, required: true },
    image: { type: String, required: true },
    salary: { type: Number, required: true },
    company: { type: String, required: true },
  },
  { timestamps: true }
);

const Job = mongoose.model<RawJob>("Job", jobSchema);

export default Job;
