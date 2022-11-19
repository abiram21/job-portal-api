import JobSchema from "./schema/job";
import ApplicationSchema from "./schema/application";
import { Job, RawApplicationJob, RawJob } from "./types";
import { RawApplication, Application } from "./types";

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

export async function insertApplication(
  applicationPayload: Application
): Promise<string | null> {
  const application = new ApplicationSchema({
    user: applicationPayload.userId,
    jobs: applicationPayload.jobs,
  });
  const { _id } = await application.save();
  return _id.toString();
}

export async function updateApplication(condition: any, setQuery: any) {
  const res = await ApplicationSchema.updateOne(condition, setQuery);
  return res;
}

export async function findOneApplication(
  userId: string
): Promise<RawApplication | null> {
  const application: RawApplication | null = await ApplicationSchema.findOne({
    user: userId,
  });
  return application;
}

export async function findApplications(query: any) {
  const application: RawApplicationJob | null = await ApplicationSchema.findOne(query).populate("jobs");
  return application;
}
