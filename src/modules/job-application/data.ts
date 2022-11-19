import ApplicationSchema from "./schema/application";
import { RawApplicationJob } from "./types";
import { RawApplication, Application } from "./types";

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
