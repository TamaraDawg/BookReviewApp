const multer = require("multer");
const db = require("../models");
const sequelize = db.sequelize;

const imageFilter = (req, file, cb) => {
  // Check if the file is an image
  if (!file.mimetype.startsWith("image/")) {
    return cb(new Error("Please upload only image files."), false);
  }

  // Check file extension
  const fileExtension = file.originalname.split(".").pop().toLowerCase();
  const allowedExtensions = ["jpg", "jpeg", "png"];

  if (!allowedExtensions.includes(fileExtension)) {
    return cb(new Error("Please upload a JPG or PNG image."), false);
  }

  // Accept the file
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/../public/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});

const uploadFile = multer({ storage: storage, fileFilter: imageFilter });

module.exports = uploadFile;
