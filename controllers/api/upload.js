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
      res.status(400).send("Please upload a file");
    } 

    const userId = req.session.user_id; // gets the user id from the session

    const image = '../../public/uploads' + file.filename; // sets the image path to the file name

    await User.update( // updates the user table with the image path
      { image: image,},
      { where: { id: userId}}
    );

    res.status(200).send("Single file uploaded successfully");

  } catch (err) {
    res.status(500).send("Please upload a valid image");
  }
});




module.exports = router;
