const router = require('express').Router();
const multer = require("multer");

const { checkFileType, upload, storageEngine} = require('../../utils/imgValidation.js');

const path = require("path");

router.get('/', (req, res) => {
  res.send('Hello upload!');
});



router.post("/", upload.single("image"), async (req, res) => {
  try {

    const file = req.file;
    console.log(file);

    if (!file) {
      res.status(400).send("Please upload a file");
    } 

    res.status(200).send("Single file uploaded successfully");

  } catch (err) {
    res.status(500).send("Please upload a valid image");
  }
});

module.exports = router;
