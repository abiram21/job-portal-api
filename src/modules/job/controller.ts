import { Request, Response } from "express";
import service from "./service";
import type { Job } from "./types";
import fs from "fs";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs: Array<Job> = await service.getJobs(req);
    res.status(200).json(jobs);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const job: Job = await service.getJob(req);
    res.status(200).json(job);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const saveJob = async (req: any, res: Response) => {
  try {
    const job: Job = await service.saveJob(req);
    res.status(201).json(job);
  } catch (error: any) {
    fs.unlinkSync(req.file.path);
    res.status(400).json({ message: error.message });
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    await service.deleteJob(req);
    res.status(200).json({ message: "Job deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const applyJob = async (req: Request, res: Response) => {
  try {
    await service.applyJob(req);
    res.status(200).json({ message: "Job applied sucessfully" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAppliedJob = async (req: Request, res: Response) => {
  try {
    const application: Array<Job> = await service.getAppliedJob(req);
    res.status(200).json(application);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
