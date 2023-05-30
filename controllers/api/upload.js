const router = require('express').Router();
const multer = require("multer");

const { checkFileType, upload, storageEngine} = require('../../utils/imgValidation.js'); // import the multer configuration from utils

const path = require("path");

router.get('/', (req, res) => {
  res.send('Hello upload!');
});



router.post("/", upload.single("image"), async (req, res) => {
  try {
    // upload image route
    const file = req.file;
    console.log(file);

    if (!file) { // makes sure there is a file
      res.status(400).render(
        'layouts/main', { msg: 'Please upload an image' }
      );
    } 

    res.status(200).render(
      'layouts/main', { msg: 'Image Uploaded Successfully' }
    );

  } catch (err) {
    res.status(500).render(
      'layouts/main', { msg: err }
    );
  }
});

module.exports = router;
