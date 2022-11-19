import { Request, Response } from "express";
import { successResponse, errorResponse } from "../../utils/common";
import service from "./service";
import { Login } from "./types/login";
import type { User } from "./types/user";
import applicationService from "../job-application/service";
import { Job } from "../job/types";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users: Array<User> = await service.getUsers(req);
    res.status(200).json(successResponse(users));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const user: User = await service.getUser(req);
    res.status(200).json(successResponse(user));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const saveUser = async (req: Request, res: Response) => {
  try {
    const user: User = await service.saveUser(req);
    res.status(201).json(successResponse(user));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const loginRes: Login = await service.login(req);
    res.status(201).json(successResponse(loginRes));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const applyJob = async (req: Request, res: Response) => {
  try {
    await applicationService.applyJob(req);
    res.status(200).json(successResponse("Job applied sucessfully"));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};

export const getAppliedJobs = async (req: Request, res: Response) => {
  try {
    const application: Array<Job> = await applicationService.getAppliedJobs(req);
    res.status(200).json(successResponse(application));
  } catch (error: any) {
    res.status(400).json(errorResponse(error.message));
  }
};