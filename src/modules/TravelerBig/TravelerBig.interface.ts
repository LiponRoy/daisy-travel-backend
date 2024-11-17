export interface IsubTraveler {
  firstName: String;
  lastName: String;
  phoneNumber: String;
  email: String;
  localAddress: String;
  SpecialNotes: String;
  // pdf1:String,
  // pdf1_cloudinary_id:String,
  // pdf2:String,
  // pdf2_cloudinary_id:String,
  passport_img?: String;
  passport_img_cloudinary_id?: String;
  photo_img?: String;
  photo_img_cloudinary_id?: String;
  bankStatement_pdf?: String;
  bankStatement_pdf_cloudinary_id?: String;
}
export interface Itraveler {
  firstName: String;
  lastName: String;
  phoneNumber: String;
  email: String;
  localAddress: String;
  SpecialNotes: String;
  passport_img?: String;
  passport_img_cloudinary_id?: String;
  photo_img?: String;
  photo_img_cloudinary_id?: String;
  bankStatement_pdf?: String;
  bankStatement_pdf_cloudinary_id?: String;
  Travelers: IsubTraveler[];
}
