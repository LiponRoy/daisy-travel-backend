import express from 'express';
import { tourRoute } from '../modules/tour/tour.route';



const router = express.Router();


router.use("/create/", tourRoute);


export default router;
