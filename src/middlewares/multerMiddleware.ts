
import multer from "multer";
import path from "path";
// Multer config
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req:any, file:any, cb:any) => {
    let ext = path.extname(file.originalname);
      if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;

// import multer from "multer";
// import path from "path";

// // Multer config
// const storage = multer.diskStorage({
//   destination: (req:any, file:any, cb:any) => {
//     cb(null, 'uploads/'); // Specify the destination directory for uploaded files
//   },
//   filename: (req:any, file:any, cb:any) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Use the current timestamp as the filename
//   }
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req:any, file:any, cb:any) => {
//     let ext = path.extname(file.originalname);
//     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
//       cb(new Error("File type is not supported"), false);
//       return;
//     }
//     cb(null, true);
//   },
// });

// export default upload;


