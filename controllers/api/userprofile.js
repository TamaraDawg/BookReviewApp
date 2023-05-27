const router = require('express').Router();
const multer = require('multer');
const path = require('path');
console.log('profiles hit');
const storageEngine = multer.diskStorage({
  destination: path.join(__dirname, '../../public/images'),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 5000000 },
  fileFilter: (req, file, cb) => {
    const allowedFileTypes = /jpeg|jpg|png|gif/;
    const extName = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extName && mimeType) {
      cb(null, true);
    } else {
      cb('File must be an image');
    }
  },
});

router.post('/upload', upload.single('avatar'), async (req, res) => {
  try {
    const data = {
        avatar: req.file.filename,
        user_id: req.session.user_id
    }

    if (!req.file) {
      return res.status(500).json({ message: 'No file uploaded' });
    }


    res.status(200).json({ message: 'File uploaded successfully' });
  } catch (err) {
    res.status(500).json(err);
    console.log('upload err: ', err);
  }
});

module.exports = router;
