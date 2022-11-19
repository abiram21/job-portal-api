import { Application } from "express";
import userRouter from "./modules/user";
import jobRouter from "./modules/job";
import config from "./config/common";

const router = (app: Application) => {
  app.use(config.apiBaseURL.concat("users"), userRouter);
  app.use(config.apiBaseURL.concat("jobs"), jobRouter);
};

export default router;
