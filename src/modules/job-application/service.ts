import { Application, RawApplication, RawApplicationJob } from "./types";
import {
  findApplications,
  findOneApplication,
  insertApplication,
  updateApplication,
} from "./data";
import { Job, RawJob } from "../job/types";
import convert from "../job/helpers/convert";
import { findOneJob } from "../job/data";
import { isValidId } from "../../utils/common";

const applyJob = async (req: any): Promise<boolean> => {
  if (!isValidId(req.params.jobId)) throw new Error("Invalid job id");
  const rawJob: RawJob | null = await findOneJob(req.params.jobId);
  if (!rawJob) throw new Error("Invalid job");
  const application: RawApplication | null = await findOneApplication(
    req.userData.userId
  );

  if (!application) {
    const newApplication: Application = {
      userId: req.userData.userId,
      jobs: [req.params.jobId],
    };
    const application: string | null = await insertApplication(newApplication);
    if (!application) throw new Error("Job not applied");
    return true;
  }
  if (application.jobs.includes(req.params.jobId))
    throw new Error("Job already applied");

  const query = {
    $push: {
      jobs: req.params.jobId,
    },
  };
  const { modifiedCount } = await updateApplication(
    { user: req.userData.userId },
    query
  );
  if (modifiedCount > 0) return true;

  throw new Error("Job not applied");
};

const getAppliedJobs = async (req: any) => {
  const rawApplication: RawApplicationJob | null = await findApplications({
    user: req.userData.userId,
  });
  if (rawApplication) {
    const appliedJobs: Array<Job> = rawApplication.jobs.map(convert);
    return appliedJobs;
  }
  throw new Error("No jobs applied");
};

const service = {
  applyJob,
  getAppliedJobs,
};

export default service;
