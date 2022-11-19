import {

  findJobs,
  findOneJob,
  insertJob,
  removeJob,
} from "./data";
import {Job, RawJob } from "./types";
import convert from "./helpers/convert";
import jobValidator from "./helpers/job-validator";
import { isValidId } from "../../utils/common";
import { updateApplication } from "../job-application/data";

const getJobs = async (req: any): Promise<Job[]> => {
  const rawJobs: Array<RawJob> = await findJobs({});
  const jobs: Array<Job> = rawJobs.map(convert);
  return jobs;
};

const getJob = async (req: any): Promise<Job> => {
  if (!isValidId(req.params.id)) throw new Error("Invalid job id");

  const rawJob: RawJob | null = await findOneJob(req.params.id);
  if (rawJob) {
    return convert(rawJob);
  }
  throw new Error("Job not found");
};

const saveJob = async (req: any): Promise<Job> => {
  const job: Job = {
    title: req.body.title,
    description: req.body.description,
    active: req.body.active,
    company: req.body.company,
    salary: req.body.salary,
    image: req?.file?.path,
  };
  jobValidator(job);
  const insertedJob: RawJob | null = await insertJob(job);
  if (insertedJob) {
    return convert(insertedJob);
  }
  throw new Error("Job not inserted");
};

const deleteJob = async (req: any): Promise<boolean> => {
  if (!isValidId(req.params.id)) throw new Error("Invalid job id");
  const rawJob: RawJob | null = await findOneJob(req.params.id);
  if (!rawJob) throw new Error("Invalid job");
  const query = {
    $pullAll: {
      jobs: [rawJob._id],
    },
  };
  await updateApplication(
    {
      user: req.userData.userId,
    },
    query
  );

  const { deletedCount } = await removeJob(req.params.id);
  if (deletedCount > 0) {
    return true;
  }
  throw new Error("Job not deleted");
};

// const applyJob = async (req: any): Promise<boolean> => {
//   if (!isValidId(req.params.id)) throw new Error("Invalid job id");
//   const rawJob: RawJob | null = await findOneJob(req.params.id);
//   if (!rawJob) throw new Error("Invalid job");
//   const application: RawApplication | null = await findOneApplication(
//     req.userData.userId
//   );

//   if (!application) {
//     const newApplication: Application = {
//       userId: req.userData.userId,
//       jobs: [req.params.id],
//     };
//     const application: string | null = await insertApplication(newApplication);
//     if (!application) throw new Error("Job not applied");
//     return true;
//   }
//   if (application.jobs.includes(req.params.id))
//     throw new Error("Job already applied");

//   const query = {
//     $push: {
//       jobs: req.params.id,
//     },
//   };
//   const { modifiedCount } = await updateApplication(
//     { user: req.userData.userId },
//     query
//   );
//   if (modifiedCount > 0) return true;

//   throw new Error("Job not applied");
// };

// const getAppliedJobs = async (req: any) => {
//   const rawApplication: RawApplicationJob | null = await findApplications({
//     user: req.userData.userId,
//   });
//   if (rawApplication) {
//     const appliedJobs: Array<Job> = rawApplication.jobs.map(convert);
//     return appliedJobs;
//   }
//   throw new Error("No jobs applied");
// };

const service = {
  getJobs,
  saveJob,
  getJob,
  deleteJob,
};

export default service;
