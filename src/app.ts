import { json } from "body-parser";
import { Application, Request, Response } from "express";
import mongoose from "mongoose";
import route from "./route";

const appMiddleware = function (app: Application) {
  app.use(json());

  // DB conncection
  mongoose
  .connect(
    "mongodb://127.0.0.1:27017/jobportal",
  )
  .then(() => {
    console.log("Successfully connected to MongoDB!");
  })
  .catch((error) => {
    console.log("Unable to connect to MongoDB!");
    console.error(error);
  });

  //All defined endpoints
  route(app);

  //All undefined endpoints
  app.use((req: Request, res: Response, next: (arg0: Error) => void) => {
    const error: Error = new Error("Invalid API!");
    res.status(404);
    next(error);
  });

  //All unhandled errors
  app.use(
    (
      error: { status: any; message: any },
      req: any,
      res: {
        status: (arg0: any) => void;
        json: (arg0: { message: any }) => void;
      },
      next: any
    ) => {
      res.status(error.status || 500);
      res.json({
        message: error.message,
      });
    }
  );
};

export default appMiddleware;
