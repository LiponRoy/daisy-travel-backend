import { TourCode, TourMoment, TtourMomentCodeMapper } from './tour.interface';

// Nothing but an array  with array tipe
export const TourMomentsArray: TourMoment[] = ['Morning', 'Evening', 'Night'];
// Nothing but an array  with array tipe
export const TourCodesArray: TourCode[] = ['01', '02', '03'];

export const tourMomentCodeMapper: TtourMomentCodeMapper = {
	Morning: '01',
	Evening: '02',
	Night: '03',
};
