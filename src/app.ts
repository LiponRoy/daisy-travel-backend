import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import errorMiddleware from "./middlewares/errors";
import routes from "./routes";
import httpStatus from "http-status";
import notFound from "./middlewares/notFound";

const app: Application = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// route
app.use("/api/v1/", routes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// error middleware ...
app.use(errorMiddleware);

// Not found error middleware
app.use(notFound);

export default app;
