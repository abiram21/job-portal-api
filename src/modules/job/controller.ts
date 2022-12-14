import { Request, Response } from "express";
import service from "./service";
import type { Job } from "./types";
import fs from "fs";
import { successResponse, errorResponse } from "../../utils/common";

export const getJobs = async (req: Request, res: Response) => {
  try {
    const jobs: Array<Job> = await service.getJobs(req);
    res.status(200).json(successResponse(jobs));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const getJob = async (req: Request, res: Response) => {
  try {
    const job: Job = await service.getJob(req);
    res.status(200).json(successResponse(job));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const saveJob = async (req: any, res: Response) => {
  try {
    const job: Job = await service.saveJob(req);
    res.status(201).json(successResponse(job));
  } catch (error: any) {
    if (req?.file?.path) fs.unlinkSync(req.file.path);

    res.status(400).json(errorResponse(error.message));
  }
};

export const deleteJob = async (req: Request, res: Response) => {
  try {
    await service.deleteJob(req);
    res.status(200).json(successResponse("Job deleted"));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};
