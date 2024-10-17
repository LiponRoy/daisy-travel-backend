export interface IsubTraveler{
	name:String,
	email:String,
}
export interface Itraveler{
	mainTravelerName:String,
	mainTravelerEmail:String,
	Travelers:IsubTraveler[],
}