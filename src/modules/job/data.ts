import JobSchema from "./schema/job";
import ApplicationSchema from "../job-application/schema/application";
import { Job, RawJob } from "./types";

export async function findJobs(query: any): Promise<RawJob[]> {
  const users = await JobSchema.find(query);
  return users;
}

export async function insertJob(userPayload: Job): Promise<RawJob | null> {
  const job = new JobSchema({
    title: userPayload.title,
    description: userPayload.description,
    active: userPayload.active,
    company: userPayload.company,
    salary: userPayload.salary,
    image: userPayload.image,
  });
  const { _id } = await job.save();
  const user = await findOneJob(_id.toString());
  return user;
}

export async function findOneJob(id: string): Promise<RawJob | null> {
  const user: RawJob | null = await JobSchema.findById(id);
  return user;
}

export async function removeJob(id: string) {
  const user = await JobSchema.deleteOne({ _id: id });
  return user;
}