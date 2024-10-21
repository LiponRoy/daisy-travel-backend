export interface IsubTraveler{
	name:String,
	email:String,
	pdf1:String,
	pdf1_cloudinary_id:String,
	pdf2:String,
	pdf2_cloudinary_id:String,
}
export interface Itraveler{
	name:String,
	email:String,
	pdf1:String,
	pdf1_cloudinary_id:String,
	pdf2:String,
	pdf2_cloudinary_id:String,
	Travelers:IsubTraveler[],
}

