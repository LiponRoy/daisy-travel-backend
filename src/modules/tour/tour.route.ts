import express from "express";
import { tourController } from "./tour.controller";

const routes = express.Router();

routes.post("/create",tourController.createTour)

export const toureRoute = routes;
