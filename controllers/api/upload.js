const router = require('express').Router();
const uploadFile = require('../../utils/upload');

const fs = require('fs');
const db = require('../../models');
const Image = db.images;

console.log('in upload route');

const uploadFiles = async (req, res) => {
  console.log('function hit');
  try {
    console.log(req.file);

    if (req.file === undefined) {
      return res.send('You must select a file.');
    }

    Image.create({
      type: req.file.mimetype,
      name: req.file.originalname,
      data: fs.readFileSync(
        __dirname + '/../../public/images/' + req.file.filename
      ),
    })
      .then(() => {
        return res.send('File has been uploaded.');
      })
      .catch((err) => {
        console.log('Error while creating image:', err);
        return res.status(500).send('Error while creating image.');
      });
  } catch (err) {
    console.log('Error during file upload:', err);
    return res.status(500).send('Error during file upload.');
  }
};
console.log('function end');

router.post('/upload', uploadFile.single('image'), uploadFiles);

module.exports = router;
