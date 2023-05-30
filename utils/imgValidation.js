const path = require("path");
const multer = require("multer");

const checkFileType = function (file, cb) {
  //Allowed file extensions
  const fileTypes = /jpeg|jpg|png/;

  //check extension names
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase()); // checks the extension name of the file and returns true if it matches the fileTypes variable

  const mimeType = fileTypes.test(file.mimetype); 

  if (mimeType && extName) { // if the file is an image then return true else return error... is what I think this is doing
    return cb(null, true);
  } else {
    cb("Error: You can Only Upload Images!!");
  }
};

const storageEngine = multer.diskStorage({ // location and name of the file
  destination: path.resolve(__dirname, '../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`); // file name will be the date and time the file was uploaded
  },
});

const upload = multer({ 
  storage: storageEngine,
  limits: { fileSize: 10000000 }, // file size limit
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
});



module.exports = { checkFileType, upload, storageEngine};