import { json } from "body-parser";
import { Application, NextFunction, Request, Response } from "express";
import route from "../route";
import express from "express";
import mongoConnect from "../db/mongo";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

const swaggerDocument = require("../../swagger.json");

const appMiddleware = function (app: Application) {
  app.use(json());
  app.use(morgan("dev"));
  app.use("/src/assets", express.static("src/assets"));

  // Mongo DB conncection
  mongoConnect();

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  //All defined endpoints
  route(app);

  app.use((req: Request, res: Response, next: NextFunction) => {
    const error: any = new Error("Page not found!");
    error.status = 404;
    next(error);
  });

  //All unhandled errors
  app.use((error: any, req: Request, res: Response, next: NextFunction) => {
    res.status(error.status || 500);
    res.json({
      message: error.message,
    });
  });
};

export default appMiddleware;
