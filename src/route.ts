import { Application } from "express";
import userRouter from "./modules/user";
import jobRouter from "./modules/job";

const router = (app: Application) => {
  app.use("/api/v1/users", userRouter);
  app.use("/api/v1/jobs", jobRouter);
};

export default router;
