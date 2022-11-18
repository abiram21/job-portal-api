import { findJobs, findOneJob, insertJob, removeJob } from "./data";
import { Request, Response } from "express";
import { Job, RawJob } from "./model/type";
import convert from "./helpers/convert";

const getJobs = async (req: Request, res: Response): Promise<Job[]> => {
  const rawJobs: Array<RawJob> = await findJobs({});
  const jobs: Array<Job> = rawJobs.map(convert);
  return jobs;
};

const getJob = async (req: Request, res: Response): Promise<Job> => {
  const rawJob: RawJob | null = await findOneJob(req.params.id);
  if (rawJob) {
    return convert(rawJob);
  }
  throw new Error("Job not found");
};

const saveJob = async (req: Request, res: Response): Promise<Job> => {
  const job: Job = {
    title: req.body.title,
    description: req.body.description,
    active: true,
    company: req.body.company,
    salary: req.body.salary,
    image: req.body.image,
  };
  const insertedJob: RawJob | null = await insertJob(job);
  if (insertedJob) {
    return convert(insertedJob);
  }
  throw new Error("Job not inserted");
};

const deleteJob = async (req: Request, res: Response): Promise<boolean> => {
  const delRes = await removeJob(req.params.id);
  if (delRes.deletedCount > 0) {
    return true;
  }
  throw new Error("Job not found");
};

const service = {
  getJobs,
  saveJob,
  getJob,
  deleteJob,
};

export default service;
