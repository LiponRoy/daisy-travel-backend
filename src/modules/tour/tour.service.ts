import { ITour } from "./tour.interface";
import tourModel from "./tour.model";


const createTour= async(data:ITour)=>{

    const tour = new tourModel({data});
    await tour.save();

    return tour;
    

}

export const tourService={
    createTour,
}