import { Request, Response } from "express";
import service from "./service";
import type { Job } from "./model/type";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs: Array<Job> = await service.getJobs(req, res);
    res.status(200).json(jobs);
  } catch (error: any) {
    res
      .status(400)
      .json({  message: error.message });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const job: Job = await service.getJob(req, res);
    res.status(200).json(job);
  } catch (error: any) {
    res
      .status(400)
      .json({  message: error.message });
  }
};

export const saveJob = async (req: Request, res: Response) => {
  try {
    const job: Job = await service.saveJob(req, res);
    res.status(201).json(job);
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    await service.deleteJob(req, res);
    res.status(201).json({ message: "Job deleted" });
  } catch (error: any) {
    res
      .status(400)
      .json({ message: error.message });
  }
};
