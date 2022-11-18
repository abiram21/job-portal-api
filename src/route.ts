import { Application } from "express";
import userRouter from "./modules/user";

const router = (app: Application) => {
  app.use("/api/v1/users", userRouter);
};

export default router;
