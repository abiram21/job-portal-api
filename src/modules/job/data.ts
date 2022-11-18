import JobModel from "./model/schema";
import { Job, RawJob } from "./model/type";

export async function findJobs(query:any): Promise<RawJob[]> {
  const users = await JobModel.find(query);
  return users;
}

export async function insertJob(userPayload: Job): Promise<RawJob|null> {
  const job = new JobModel({
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

export async function findOneJob(id: string): Promise<RawJob|null> {
  const user: RawJob | null = await JobModel.findById(id);
  return user;
}

export async function removeJob(id: string){
  const user = await JobModel.deleteOne({id});
  return user;
}
