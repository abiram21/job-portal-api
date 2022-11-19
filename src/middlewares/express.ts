import { json } from "body-parser";
import { Application, Request, Response } from "express";
import route from "../route";
import express from "express";
import mongoConnect from "../db/mongo";
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./swagger.json');

const appMiddleware = function (app: Application) {
  app.use(json());

  app.use("/src/assets", express.static("src/assets"));

  // Mongo DB conncection
  mongoConnect();

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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
